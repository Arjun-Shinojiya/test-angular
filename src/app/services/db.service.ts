// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.
import {Injectable} from '@angular/core';
// IMPORTING THE ANGULAR HTTP FOR HTTP REQUESTS.
import {HttpClient} from "@angular/common/http";
// IMPORTING THE ANGULAR SUBJECT TO USE AS AN OBSERVABLE.
import {Subject} from "rxjs";
// IMPORTING THE LK ENVIRONMENT FILE TO GET THE STATIC VARIABLES LIKE SERVER URL.
import {environment} from "src/environments/environment";
import {ApiService} from "../../core/api.service"

// @Injectable DECLARES THIS AS A SERVICE SO THAT WE CAN INJECT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
@Injectable
({
	providedIn: 'root'
})

// DECLARING THE DbService CLASS WITH EXPORT SO THAT WE CAN IMPORT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
export class DbService
{
	// URL OF THE NODE SERVER WHERE WE WILL SEND REQUESTS TO COMMUNICATE WITH DATABASE.
	public apiURL = environment.apiURL;

	// ALL INITIAL STATIC DATA WILL BE LOADED INTO THIS ARRAY AT THE START OF APP INITIALIZATION
	public appStaticData: any;

	// STORE DATA FROM STATIC TABLES. WE ARE STORING ALL THIS DATA INTO THESE VARIABLES SO WE DON'T
	// HAVE TO GET THIS DATA FROM DATABASE AGAIN AND AGAIN.
	public sitevariables:any[] = []; // DATA FROM SITEVARIABLE TABLE.
	public sitemessages:any[] = []; // DATA FROM MESSAGE TABLE.
	public translations:any[] = []; // DATA FROM TRANSLATIONS TABLE.

	// OBSERVABLE THAT WILL BE TRIGGERED WHEN WE RECEIVE INITIAL DATA FROM THE SERVER.
	// THIS INITIAL DATA THAT CONTAINS SITEVARIABLES, MESSAGES AND JUMPCODES IS REQUIRED TO RUN THE APP,
	// SO IT WILL BE THE FIRST CALL TO MAKE TO THE DATABASE AS SOON AS THE APP LOADS.
	public appStaticDataObs = new Subject <any>();

	public data: any = {
		"instructions": {
			"INSTR-BOTH-LOGIN-FIRST-BUTTON-CONTINUE": {
				"instructionId": "INSTR-BOTH-LOGIN-FIRST-BUTTON-CONTINUE",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "BUTTON",
				"description": "On the login screen, this button is located below the 'Forgot Password' link text, and users will click on it after entering their login credentials.",
				"english": "Continue",
				"spanish": "Continuar"
			},
			"INSTR-BOTH-LOGIN-FIRST-INLINETEXT-EMAILADDRESS": {
				"instructionId": "INSTR-BOTH-LOGIN-FIRST-INLINETEXT-EMAILADDRESS",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "INLINETEXT",
				"description": "Located at the center of the login screen is an inline text within the textbox, instructing users to enter their email address.",
				"english": "Email Address",
				"spanish": "Dirección de correo electrónico"
			},
			"INSTR-BOTH-LOGIN-FIRST-INLINETEXT-ENTERYOURINFO": {
				"instructionId": "INSTR-BOTH-LOGIN-FIRST-INLINETEXT-ENTERYOURINFO",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "INLINETEXT",
				"description": "Enter Email and Password.",
				"english": "Enter your email and password to sign in.",
				"spanish": "Ingresa tu correo electrónico y contraseña para iniciar sesión."
			},
			"INSTR-BOTH-LOGIN-FIRST-INLINETEXT-PASSWORD": {
				"instructionId": "INSTR-BOTH-LOGIN-FIRST-INLINETEXT-PASSWORD",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "INLINETEXT",
				"description": "Located at the center of the login screen is an inline text within the textbox, instructing users to enter their password.",
				"english": "Password",
				"spanish": "Contraseña"
			},
			"INSTR-BOTH-LOGIN-FIRST-LABEL-TOTALSCOPE": {
				"instructionId": "INSTR-BOTH-LOGIN-FIRST-LABEL-TOTALSCOPE",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the login screen where the users log in.",
				"english": "TotalScope",
				"spanish": "TotalScope"
			},
			"INSTR-BOTH-LOGIN-FIRST-LINKTEXT-FORGOTPASSWORD": {
				"instructionId": "INSTR-BOTH-LOGIN-FIRST-LINKTEXT-FORGOTPASSWORD",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "LINKTEXT",
				"description": "This is positioned to the right, below the textbox, and above the 'Continue' button. It serves as a link text in case you've forgotten your password.",
				"english": "Forgot Password?",
				"spanish": "¿Olvidaste tu contraseña?"
			},
			"INSTR-BOTH-LOGIN-FIRST-SWITCHLEFT-ENGLISH": {
				"instructionId": "INSTR-BOTH-LOGIN-FIRST-SWITCHLEFT-ENGLISH",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "SWITCHLEFT",
				"description": "This is located at the base of the word 'TotalScope', serving as a switch widget that allows users to select their preferred language within the app.",
				"english": "English",
				"spanish": "Inglés"
			},
			"INSTR-BOTH-LOGIN-FIRST-SWITCHRIGHT-SPANISH": {
				"instructionId": "INSTR-BOTH-LOGIN-FIRST-SWITCHRIGHT-SPANISH",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "SWITCHRIGHT",
				"description": "This is located at the base of the word 'TotalScope', serving as a switch widget that allows users to select their preferred language within the app.",
				"english": "Spanish",
				"spanish": "Español"
			},
			"INSTR-BOTH-LOGIN-FIRST-TEXT-ACCESSTOYOURACCOUNT": {
				"instructionId": "INSTR-BOTH-LOGIN-FIRST-TEXT-ACCESSTOYOURACCOUNT",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "TEXT",
				"description": "This is situated below the 'Sign in' label and above the textboxes on the login screen.",
				"english": "Access your account",
				"spanish": "Accede a tu cuenta."
			},
			"INSTR-BOTH-LOGIN-FORGOTPASSWORD-BUTTON-RESETLINK": {
				"instructionId": "INSTR-BOTH-LOGIN-FORGOTPASSWORD-BUTTON-RESETLINK",
				"module": "LOGIN",
				"area": "FORGOTPASSWORD",
				"widget": "BUTTON",
				"description": "This button is located at the bottom of the 'Forgot Password' screen, which users will click after entering their email address.",
				"english": "Send Reset Link",
				"spanish": "Enviar enlace de reinicio"
			},
			"INSTR-BOTH-LOGIN-FORGOTPASSWORD-INLINETEXT-EMAILADDRESS": {
				"instructionId": "INSTR-BOTH-LOGIN-FORGOTPASSWORD-INLINETEXT-EMAILADDRESS",
				"module": "LOGIN",
				"area": "FORGOTPASSWORD",
				"widget": "INLINETEXT",
				"description": "Located below the password reset instruction is an inline text within the textbox, instructing users to enter their email address.",
				"english": "Email Address",
				"spanish": "Dirección de correo electrónico"
			},
			"INSTR-BOTH-LOGIN-FORGOTPASSWORD-LABEL-RESETYOURPASSWORD": {
				"instructionId": "INSTR-BOTH-LOGIN-FORGOTPASSWORD-LABEL-RESETYOURPASSWORD",
				"module": "LOGIN",
				"area": "FORGOTPASSWORD",
				"widget": "LABEL",
				"description": "Located below the language switch widget, this functions as a label for resetting their password.",
				"english": "Reset your password",
				"spanish": "Restablecer tu contraseña"
			},
			"INSTR-BOTH-LOGIN-FORGOTPASSWORD-SWITCHLEFT-ENGLISH": {
				"instructionId": "INSTR-BOTH-LOGIN-FORGOTPASSWORD-SWITCHLEFT-ENGLISH",
				"module": "LOGIN",
				"area": "FORGOTPASSWORD",
				"widget": "SWITCHLEFT",
				"description": "This is located at the base of the word 'TotalScope', serving as a switch widget that allows users to select their preferred language within the app.",
				"english": "English",
				"spanish": "Inglés"
			},
			"INSTR-BOTH-LOGIN-FORGOTPASSWORD-SWITCHRIGHT-SPANISH": {
				"instructionId": "INSTR-BOTH-LOGIN-FORGOTPASSWORD-SWITCHRIGHT-SPANISH",
				"module": "LOGIN",
				"area": "FORGOTPASSWORD",
				"widget": "SWITCHRIGHT",
				"description": "This is located at the base of the word 'TotalScope', serving as a switch widget that allows users to select their preferred language within the app.",
				"english": "Spanish",
				"spanish": "Español"
			},
			"INSTR-BOTH-LOGIN-FORGOTPASSWORD-TEXT-BACKTOLOGIN": {
				"instructionId": "INSTR-BOTH-LOGIN-FORGOTPASSWORD-TEXT-BACKTOLOGIN",
				"module": "LOGIN",
				"area": "FORGOTPASSWORD",
				"widget": "TEXT",
				"description": "This text is located at the bottommost part of the screen, just above the 'Send Reset Link' button.",
				"english": "Back to login",
				"spanish": "Volver a iniciar sesión"
			},
			"INSTR-BOTH-LOGIN-FORGOTPASSWORD-TEXT-PASSWORDRESETINSTRUCTION": {
				"instructionId": "INSTR-BOTH-LOGIN-FORGOTPASSWORD-TEXT-PASSWORDRESETINSTRUCTION",
				"module": "LOGIN",
				"area": "FORGOTPASSWORD",
				"widget": "TEXT",
				"description": "This is situated below the 'Reset Your Password' label on the 'Forgot Password' screen, providing additional information to users about the steps to take when resetting their password.",
				"english": "Please provide your email address and <br>we will send you a password reset link.\n",
				"spanish": "Proporcione su dirección de correo electrónico y <br>le enviaremos un enlace para restablecer su contraseña."
			},
			"INSTR-BOTH-LOGIN-NEWPASSWORD-BUTTON-UPDATEYOURPASSWORD": {
				"instructionId": "INSTR-BOTH-LOGIN-NEWPASSWORD-BUTTON-UPDATEYOURPASSWORD",
				"module": "LOGIN",
				"area": "NEWPASSWORD",
				"widget": "BUTTON",
				"description": "On the 'New Password' screen, this button is situated beneath the text boxes, and users will click on it once they have entered their new password.",
				"english": "Update your password",
				"spanish": "Actualiza tu contraseña"
			},
			"INSTR-BOTH-LOGIN-NEWPASSWORD-INLINETEXT-CONFIRMPASSWORD": {
				"instructionId": "INSTR-BOTH-LOGIN-NEWPASSWORD-INLINETEXT-CONFIRMPASSWORD",
				"module": "LOGIN",
				"area": "NEWPASSWORD",
				"widget": "INLINETEXT",
				"description": "Located at the center of the login screen is an inline text within the textbox, instructing users to confirm their password.",
				"english": "Confirm password",
				"spanish": "Confirmar contraseña"
			},
			"INSTR-BOTH-LOGIN-NEWPASSWORD-INLINETEXT-NEWPASSWORD": {
				"instructionId": "INSTR-BOTH-LOGIN-NEWPASSWORD-INLINETEXT-NEWPASSWORD",
				"module": "LOGIN",
				"area": "NEWPASSWORD",
				"widget": "INLINETEXT",
				"description": "Located at the center of the login screen is an inline text within the textbox, instructing users to enter their new password.",
				"english": "Enter new password",
				"spanish": "Ingrese nueva contraseña"
			},
			"INSTR-BOTH-LOGIN-NEWPASSWORD-LABEL-SETYOURPASSWORD": {
				"instructionId": "INSTR-BOTH-LOGIN-NEWPASSWORD-LABEL-SETYOURPASSWORD",
				"module": "LOGIN",
				"area": "NEWPASSWORD",
				"widget": "LABEL",
				"description": "This label is positioned below the 'TotalScope' label and above the textbox on the 'New Password' screen.",
				"english": "Set your password",
				"spanish": "Establezca su contraseña"
			},
			"INSTR-BOTH-LOGIN-PASSWORDRESET-BUTTON-RESETPASSWORD": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDRESET-BUTTON-RESETPASSWORD",
				"module": "LOGIN",
				"area": "PASSWORDRESET",
				"widget": "BUTTON",
				"description": "This button is located in the center of the 'Password reset' screen, below the password reset information.",
				"english": "Click here to reset your password.",
				"spanish": "Haz clic aquí para restablecer tu contraseña."
			},
			"INSTR-BOTH-LOGIN-PASSWORDRESET-LABEL-PASSWORDRESET": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDRESET-LABEL-PASSWORDRESET",
				"module": "LOGIN",
				"area": "PASSWORDRESET",
				"widget": "LABEL",
				"description": "This label is situated below the 'TotalScope' label on the Password Reset screen.",
				"english": "Password Reset",
				"spanish": "Restablecimiento de contraseña"
			},
			"INSTR-BOTH-LOGIN-PASSWORDRESET-LABEL-TOTALSCOPE": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDRESET-LABEL-TOTALSCOPE",
				"module": "LOGIN",
				"area": "PASSWORDRESET",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Password reset' screen.",
				"english": "TotalScope",
				"spanish": "TotalScope"
			},
			"INSTR-BOTH-LOGIN-PASSWORDRESET-LINKTEXT-MANAGEEMAILPREFERENCES": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDRESET-LINKTEXT-MANAGEEMAILPREFERENCES",
				"module": "LOGIN",
				"area": "PASSWORDRESET",
				"widget": "LINKTEXT",
				"description": "The link text is positioned at the bottom part of the screen, to the right of the 'unsubscribe' text.",
				"english": "Manage Email Preferences",
				"spanish": "Administrar preferencias de correo electrónico"
			},
			"INSTR-BOTH-LOGIN-PASSWORDRESET-LINKTEXT-RESETPASSWORDLINK": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDRESET-LINKTEXT-RESETPASSWORDLINK",
				"module": "LOGIN",
				"area": "PASSWORDRESET",
				"widget": "LINKTEXT",
				"description": "This link text is located below the password reset information on the 'Password reset' screen. Users will click on this link if the button is not working.",
				"english": "https://totalscope.com/reset-password",
				"spanish": "https://totalscope.com/reset-password"
			},
			"INSTR-BOTH-LOGIN-PASSWORDRESET-LINKTEXT-UNSUBSCRIBE": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDRESET-LINKTEXT-UNSUBSCRIBE",
				"module": "LOGIN",
				"area": "PASSWORDRESET",
				"widget": "LINKTEXT",
				"description": "This link text is located at the bottom part of the screen below the 'Visit Totalscope.com' text.",
				"english": "Unsubscribe",
				"spanish": "Cancelar suscripción"
			},
			"INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-ALLRIGHTSRESERVED": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-ALLRIGHTSRESERVED",
				"module": "LOGIN",
				"area": "PASSWORDRESET",
				"widget": "TEXT",
				"description": "This text is located at the bottommost part of the 'Password reset' screen, just above the 'Unsubscribe' and 'Manage Email Preferences' texts.",
				"english": "All Rights Reserved.",
				"spanish": "Todos los derechos reservados."
			},
			"INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-DISCLAIMER": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-DISCLAIMER",
				"module": "LOGIN",
				"area": "PASSWORDRESET",
				"widget": "TEXT",
				"description": "This disclaimer text is located at the bottom of the 'Password Reset' screen, informing users that they will receive an email because they signed up for TotalScope.",
				"english": "You are receiving this email because you signed up to TotalScope.",
				"spanish": "Estás recibiendo este correo electrónico porque te registraste en TotalScope."
			},
			"INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-PASSWORDRESETINFORMATIONBOTTOM": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-PASSWORDRESETINFORMATIONBOTTOM",
				"module": "LOGIN",
				"area": "PASSWORDRESET",
				"widget": "TEXT",
				"description": "This text is located below the 'Click here to reset your password' button and above the reset password link, providing information if the password reset request is not working.",
				"english": "If the button above isn't working, paste the link below into your browser.",
				"spanish": "Si el botón de arriba no funciona, pegue el enlace de abajo en su navegador."
			},
			"INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-PASSWORDRESETINFORMATIONTOP": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-PASSWORDRESETINFORMATIONTOP",
				"module": "LOGIN",
				"area": "PASSWORDRESET",
				"widget": "TEXT",
				"description": "This text is situated below the 'Password Reset' label and above the 'Click here to reset your password' button, providing information about the password change request.",
				"english": "There was recently a request to change the <br>password on your account. If you requested this <br>password change, please clink the link below <br>to set a new password within 24 hours.\n",
				"spanish": "Hubo recientemente una solicitud para cambiar la <br>contraseña de tu cuenta. Si solicitaste este <br>cambio de contraseña, por favor haz clic en el enlace de abajo <br>para establecer una nueva contraseña dentro de las próximas 24 horas.\n"
			},
			"INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-REGARDS": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-REGARDS",
				"module": "LOGIN",
				"area": "PASSWORDRESET",
				"widget": "TEXT",
				"description": "This signature text is situated below the link on the 'Password reset' screen.",
				"english": "Regards, ",
				"spanish": "Saludos"
			},
			"INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-TOTALSCOPE": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-TOTALSCOPE",
				"module": "LOGIN",
				"area": "PASSWORDRESET",
				"widget": "TEXT",
				"description": "This signature text is situated below the link on the 'Password reset' screen.",
				"english": "TotalScope",
				"spanish": "TotalScope"
			},
			"INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-VISIT": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDRESET-TEXT-VISIT",
				"module": "LOGIN",
				"area": "PASSWORDRESET",
				"widget": "TEXT",
				"description": "This text is located at the bottom part of the screen below the TotalScope address.",
				"english": "Visit",
				"spanish": "Visitar"
			},
			"INSTR-BOTH-LOGIN-PASSWORDSET-BUTTON-CONTINUE": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDSET-BUTTON-CONTINUE",
				"module": "LOGIN",
				"area": "PASSWORDSET",
				"widget": "BUTTON",
				"description": "This is located at the bottommost part of the screen, where the user can click to go back to their account.",
				"english": "Continue",
				"spanish": "Continuar"
			},
			"INSTR-BOTH-LOGIN-PASSWORDSET-LABEL-PASSWORDSET": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDSET-LABEL-PASSWORDSET",
				"module": "LOGIN",
				"area": "PASSWORDSET",
				"widget": "LABEL",
				"description": "Situated beneath the checkmark icon on the 'Password set' screen, this functions as a label that indicates the password has been set.",
				"english": "You've set <br>a new password\n",
				"spanish": "Has establecido <br>una nueva contraseña\n"
			},
			"INSTR-BOTH-LOGIN-PASSWORDSET-TEXT-BACKTOACCOUNT": {
				"instructionId": "INSTR-BOTH-LOGIN-PASSWORDSET-TEXT-BACKTOACCOUNT",
				"module": "LOGIN",
				"area": "PASSWORDSET",
				"widget": "TEXT",
				"description": "This is located below the 'Password Set' label, providing users with additional information on how to return to their accounts.",
				"english": "Now let's get you back to your account.",
				"spanish": "Ahora volvamos a tu cuenta."
			},
			"INSTR-BOTH-LOGIN-RESETEMAILSENT-LABEL-EMAILSENT": {
				"instructionId": "INSTR-BOTH-LOGIN-RESETEMAILSENT-LABEL-EMAILSENT",
				"module": "LOGIN",
				"area": "RESETEMAILSENT",
				"widget": "LABEL",
				"description": "Situated beneath the checkmark icon on the 'Reset email sent' screen, this functions as a label indicating that the password reset email has already been sent.",
				"english": "Password reset email sent",
				"spanish": "Correo electrónico de restablecimiento de contraseña enviado "
			},
			"INSTR-BOTH-LOGIN-RESETEMAILSENT-TEXT-BACKTOLOGIN": {
				"instructionId": "INSTR-BOTH-LOGIN-RESETEMAILSENT-TEXT-BACKTOLOGIN",
				"module": "LOGIN",
				"area": "RESETEMAILSENT",
				"widget": "TEXT",
				"description": "This text is located at the bottommost part of the screen.",
				"english": "Back to login",
				"spanish": "Volver al inicio de sesión"
			},
			"INSTR-BOTH-LOGIN-RESETEMAILSENT-TEXT-RESETTINGINSTRUCTIONS": {
				"instructionId": "INSTR-BOTH-LOGIN-RESETEMAILSENT-TEXT-RESETTINGINSTRUCTIONS",
				"module": "LOGIN",
				"area": "RESETEMAILSENT",
				"widget": "TEXT",
				"description": "This is located below the 'Password reset email sent' label on the 'Reset email sent' screen, providing users with additional information to check their email.",
				"english": "Instructions for resetting your <br>password have been sent to <br><b>[email].</b> <br>If you don't receive it right away, <br>please check your spam folder.\n",
				"spanish": "Las instrucciones para restablecer tu <br>contraseña han sido enviadas a <br><b>[email].</b> <br>Si no lo recibes pronto, <br>revisa tu carpeta de spam.\n"
			},
			"INSTR-MOBILE-LOGIN-FORGOTPASSWORD-LABEL-FORGOTPASSWORD": {
				"instructionId": "INSTR-MOBILE-LOGIN-FORGOTPASSWORD-LABEL-FORGOTPASSWORD",
				"module": "LOGIN",
				"area": "FORGOTPASSWORD",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Forgot Password' screen.",
				"english": "Forgot Password?",
				"spanish": "¿Olvidaste tu contraseña?"
			},
			"INSTR-MOBILE-LOGIN-HOME-BUTTON-ADDNEWPROPERTYSCOPE": {
				"instructionId": "INSTR-MOBILE-LOGIN-HOME-BUTTON-ADDNEWPROPERTYSCOPE",
				"module": "LOGIN",
				"area": "HOME",
				"widget": "BUTTON",
				"description": "This is located below the Totalscope label of the 'Home' screen",
				"english": "Add New Property",
				"spanish": "Agregar nueva propiedad"
			},
			"INSTR-MOBILE-LOGIN-HOME-LABEL-CLOSED": {
				"instructionId": "INSTR-MOBILE-LOGIN-HOME-LABEL-CLOSED",
				"module": "LOGIN",
				"area": "HOME",
				"widget": "LABEL",
				"description": "This is located at the center part below the 'Your Statistics' label.",
				"english": "Closed",
				"spanish": "Cerrado"
			},
			"INSTR-MOBILE-LOGIN-HOME-LABEL-HOME": {
				"instructionId": "INSTR-MOBILE-LOGIN-HOME-LABEL-HOME",
				"module": "LOGIN",
				"area": "HOME",
				"widget": "LABEL",
				"description": "This is located at the leftmost part at the bottom of the 'Home' screen.",
				"english": "Home",
				"spanish": "Casa"
			},
			"INSTR-MOBILE-LOGIN-HOME-LABEL-INBOX": {
				"instructionId": "INSTR-MOBILE-LOGIN-HOME-LABEL-INBOX",
				"module": "LOGIN",
				"area": "HOME",
				"widget": "LABEL",
				"description": "This is located at the bottom part of the 'Home' screen beside the 'Overview' label.",
				"english": "Inbox",
				"spanish": "Bandeja de entrada"
			},
			"INSTR-MOBILE-LOGIN-HOME-LABEL-INPROGRESS": {
				"instructionId": "INSTR-MOBILE-LOGIN-HOME-LABEL-INPROGRESS",
				"module": "LOGIN",
				"area": "HOME",
				"widget": "LABEL",
				"description": "This is located at the left part below the 'Your Statistics' label.",
				"english": "In Progress",
				"spanish": "En Progreso"
			},
			"INSTR-MOBILE-LOGIN-HOME-LABEL-OVERVIEW": {
				"instructionId": "INSTR-MOBILE-LOGIN-HOME-LABEL-OVERVIEW",
				"module": "LOGIN",
				"area": "HOME",
				"widget": "LABEL",
				"description": "This is located at the center part at the bottom of the 'Home' screen.",
				"english": "Overview",
				"spanish": "Visión general"
			},
			"INSTR-MOBILE-LOGIN-HOME-LABEL-PROPERTIES": {
				"instructionId": "INSTR-MOBILE-LOGIN-HOME-LABEL-PROPERTIES",
				"module": "LOGIN",
				"area": "HOME",
				"widget": "LABEL",
				"description": "This is located at the bottom part of the 'Home' screen beside the 'Home' label.",
				"english": "Properties",
				"spanish": "Propiedades"
			},
			"INSTR-MOBILE-LOGIN-HOME-LABEL-RECENTFILES": {
				"instructionId": "INSTR-MOBILE-LOGIN-HOME-LABEL-RECENTFILES",
				"module": "LOGIN",
				"area": "HOME",
				"widget": "LABEL",
				"description": "This is located left below the 'In Progress' label in the Home screen.",
				"english": "Recent Files",
				"spanish": "Archivos Recientes"
			},
			"INSTR-MOBILE-LOGIN-HOME-LABEL-REJECTED": {
				"instructionId": "INSTR-MOBILE-LOGIN-HOME-LABEL-REJECTED",
				"module": "LOGIN",
				"area": "HOME",
				"widget": "LABEL",
				"description": "This is located at the right part below the 'Your Statistics' label.",
				"english": "Rejected",
				"spanish": "Rechazado"
			},
			"INSTR-MOBILE-LOGIN-HOME-LABEL-SETTINGS": {
				"instructionId": "INSTR-MOBILE-LOGIN-HOME-LABEL-SETTINGS",
				"module": "LOGIN",
				"area": "HOME",
				"widget": "LABEL",
				"description": "This is located at the rightmost part at the bottom of the 'Home' screen.",
				"english": "Settings",
				"spanish": "Configuración"
			},
			"INSTR-MOBILE-LOGIN-HOME-LABEL-STATISTICS": {
				"instructionId": "INSTR-MOBILE-LOGIN-HOME-LABEL-STATISTICS",
				"module": "LOGIN",
				"area": "HOME",
				"widget": "LABEL",
				"description": "This label is located below the 'Add New Property Scope' label.",
				"english": "Your Statistics",
				"spanish": "Tus estadísticas"
			},
			"INSTR-MOBILE-LOGIN-HOME-LABEL-TOTALSCOPE": {
				"instructionId": "INSTR-MOBILE-LOGIN-HOME-LABEL-TOTALSCOPE",
				"module": "LOGIN",
				"area": "HOME",
				"widget": "LABEL",
				"description": "This is located at the top left part of the 'Home' screen.",
				"english": "TotalScope",
				"spanish": "TotalScope"
			},
			"INSTR-MOBILE-LOGIN-HOME-LABEL-VIEWALL": {
				"instructionId": "INSTR-MOBILE-LOGIN-HOME-LABEL-VIEWALL",
				"module": "LOGIN",
				"area": "HOME",
				"widget": "LABEL",
				"description": "This is located right below the 'In Progress' label in the Home screen.",
				"english": "View All",
				"spanish": "Ver Todo"
			},
			"INSTR-MOBILE-LOGIN-NEWPASSWORD-LABEL-NEWPASSWORD": {
				"instructionId": "INSTR-MOBILE-LOGIN-NEWPASSWORD-LABEL-NEWPASSWORD",
				"module": "LOGIN",
				"area": "NEWPASSWORD",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'New Password' screen.",
				"english": "New Password",
				"spanish": "Nueva Contraseña"
			},
			"INSTR-MOBILE-LOGIN-OVERVIEW-LABEL-ENGLISHVIDEO": {
				"instructionId": "INSTR-MOBILE-LOGIN-OVERVIEW-LABEL-ENGLISHVIDEO",
				"module": "LOGIN",
				"area": "OVERVIEW",
				"widget": "LABEL",
				"description": "This is located at the left part of the 'Overview' screen below the 'View' label, serving as a description for the video.",
				"english": "English Video",
				"spanish": "Video en Inglés"
			},
			"INSTR-MOBILE-LOGIN-OVERVIEW-LABEL-SPANISHVIDEO": {
				"instructionId": "INSTR-MOBILE-LOGIN-OVERVIEW-LABEL-SPANISHVIDEO",
				"module": "LOGIN",
				"area": "OVERVIEW",
				"widget": "LABEL",
				"description": "This is located at the left center part of the 'Overview' screen below the video, and it serves as a description for the video.",
				"english": "Spanish Video",
				"spanish": "Video en español"
			},
			"INSTR-MOBILE-LOGIN-OVERVIEW-LABEL-VIEW": {
				"instructionId": "INSTR-MOBILE-LOGIN-OVERVIEW-LABEL-VIEW",
				"module": "LOGIN",
				"area": "OVERVIEW",
				"widget": "LABEL",
				"description": "This label is located at the topmost part of the 'Overview' screen.",
				"english": "View",
				"spanish": "Ver"
			},
			"INSTR-MOBILE-LOGIN-PASSWORDSET-LABEL-PASSWORD": {
				"instructionId": "INSTR-MOBILE-LOGIN-PASSWORDSET-LABEL-PASSWORD",
				"module": "LOGIN",
				"area": "PASSWORDSET",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the Password Set' screen.",
				"english": "Password set",
				"spanish": "Contraseña establecida"
			},
			"INSTR-MOBILE-LOGIN-RESETEMAILSENT-LABEL-RESETEMAILSENT": {
				"instructionId": "INSTR-MOBILE-LOGIN-RESETEMAILSENT-LABEL-RESETEMAILSENT",
				"module": "LOGIN",
				"area": "RESETEMAILSENT",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Reset Email sent' screen.",
				"english": "Reset Email sent",
				"spanish": "Correo de restablecimiento enviado"
			},
			"INSTR-MOBILE-LOGIN-SIGNIN-LABEL-SIGNIN": {
				"instructionId": "INSTR-MOBILE-LOGIN-SIGNIN-LABEL-SIGNIN",
				"module": "LOGIN",
				"area": "SIGNIN",
				"widget": "LABEL",
				"description": "Located at the topmost part of the sign-in screen, serves as a label that gently reminds users to sign in to their account.",
				"english": "Sign In",
				"spanish": "Iniciar sesión"
			},
			"INSTR-MOBILE-LOGIN-WELCOME-BUTTON-LETSGETSTARTED": {
				"instructionId": "INSTR-MOBILE-LOGIN-WELCOME-BUTTON-LETSGETSTARTED",
				"module": "LOGIN",
				"area": "WELCOME",
				"widget": "BUTTON",
				"description": "This is located at the lowermost part of the welcome screen, telling the users to navigate the app.",
				"english": "Let's Get Started",
				"spanish": "Empecemos"
			},
			"INSTR-MOBILE-LOGIN-WELCOME-TEXT-WELCOMEMESSAGE": {
				"instructionId": "INSTR-MOBILE-LOGIN-WELCOME-TEXT-WELCOMEMESSAGE",
				"module": "LOGIN",
				"area": "WELCOME",
				"widget": "TEXT",
				"description": "This is located below the 'Totalscope' label on the welcome screen.",
				"english": "Welcome to TotalScope",
				"spanish": "Bienvenido a TotalScope"
			},
			"INSTR-MOBILE-OWNER-ADDNEWOWNER-BUTTON-CANCEL": {
				"instructionId": "INSTR-MOBILE-OWNER-ADDNEWOWNER-BUTTON-CANCEL",
				"module": "OWNER",
				"area": "ADDNEWOWNER",
				"widget": "BUTTON",
				"description": "This button is located to the left, above the bottom bars on the screen.",
				"english": "Cancel",
				"spanish": "Cancelar"
			},
			"INSTR-MOBILE-OWNER-ADDNEWOWNER-BUTTON-SAVE": {
				"instructionId": "INSTR-MOBILE-OWNER-ADDNEWOWNER-BUTTON-SAVE",
				"module": "OWNER",
				"area": "ADDNEWOWNER",
				"widget": "BUTTON",
				"description": "This button is located to the right, above the bottom bars on the screen.",
				"english": "Save",
				"spanish": "Guardar"
			},
			"INSTR-MOBILE-OWNER-ADDNEWOWNER-DROPDOWN-STATE": {
				"instructionId": "INSTR-MOBILE-OWNER-ADDNEWOWNER-DROPDOWN-STATE",
				"module": "OWNER",
				"area": "ADDNEWOWNER",
				"widget": "DROPDOWN",
				"description": "This dropdown is located at the right part of the screen beside the 'City' textbox.",
				"english": "State:",
				"spanish": "Estado:"
			},
			"INSTR-MOBILE-OWNER-ADDNEWOWNER-INLINETEXT-SEARCH": {
				"instructionId": "INSTR-MOBILE-OWNER-ADDNEWOWNER-INLINETEXT-SEARCH",
				"module": "OWNER",
				"area": "ADDNEWOWNER",
				"widget": "INLINETEXT",
				"description": "This is situated beneath the 'Owner' label of the 'Owner' screen. It serves as a search bar if a user will search for someone.",
				"english": "Search",
				"spanish": "Buscar"
			},
			"INSTR-MOBILE-OWNER-ADDNEWOWNER-LABEL-ADDNEWOWNER": {
				"instructionId": "INSTR-MOBILE-OWNER-ADDNEWOWNER-LABEL-ADDNEWOWNER",
				"module": "OWNER",
				"area": "ADDNEWOWNER",
				"widget": "LABEL",
				"description": "This is located at the top part of the screen, below the 'Owner' label.",
				"english": "Add New Owner",
				"spanish": "Agregar nuevo propietario"
			},
			"INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXT-CREATEPROPERTYOWNERPROFILE": {
				"instructionId": "INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXT-CREATEPROPERTYOWNERPROFILE",
				"module": "OWNER",
				"area": "ADDNEWOWNER",
				"widget": "TEXT",
				"description": "This text is located below the 'Add New Owner' label.",
				"english": "Create property owner profile",
				"spanish": "Crear perfil de propietario de propiedad"
			},
			"INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-ADDRESS": {
				"instructionId": "INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-ADDRESS",
				"module": "OWNER",
				"area": "ADDNEWOWNER",
				"widget": "TEXTBOX",
				"description": "This is located at the left part of the screen below the 'Phone Number' textbox.",
				"english": "Address:",
				"spanish": "Dirección:"
			},
			"INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-CITY": {
				"instructionId": "INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-CITY",
				"module": "OWNER",
				"area": "ADDNEWOWNER",
				"widget": "TEXTBOX",
				"description": "This is located at the left part of the screen below the Address' textbox.",
				"english": "City:",
				"spanish": "Ciudad:"
			},
			"INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-EMAILADDRESS": {
				"instructionId": "INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-EMAILADDRESS",
				"module": "OWNER",
				"area": "ADDNEWOWNER",
				"widget": "TEXTBOX",
				"description": "This is located at the right part of the screen below the 'Last Name' textbox.",
				"english": "Email Address:",
				"spanish": "Dirección de correo electrónico:"
			},
			"INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-FIRSTNAME": {
				"instructionId": "INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-FIRSTNAME",
				"module": "OWNER",
				"area": "ADDNEWOWNER",
				"widget": "TEXTBOX",
				"description": "This is located at the left part of the screen below the 'Add New Owner' label.",
				"english": "First Name:",
				"spanish": "Nombre:"
			},
			"INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-LASTNAME": {
				"instructionId": "INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-LASTNAME",
				"module": "OWNER",
				"area": "ADDNEWOWNER",
				"widget": "TEXTBOX",
				"description": "This is located at the right part of the screen below the 'Add New Owner' label.",
				"english": "Last Name:",
				"spanish": "Apellido:"
			},
			"INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-PHONENUMBER": {
				"instructionId": "INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-PHONENUMBER",
				"module": "OWNER",
				"area": "ADDNEWOWNER",
				"widget": "TEXTBOX",
				"description": "This is located at the left part of the screen below the 'First Name' textbox.",
				"english": "Phone Number:",
				"spanish": "Número de teléfono:"
			},
			"INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-ZIP": {
				"instructionId": "INSTR-MOBILE-OWNER-ADDNEWOWNER-TEXTBOX-ZIP",
				"module": "OWNER",
				"area": "ADDNEWOWNER",
				"widget": "TEXTBOX",
				"description": "This is located at the left part of the screen below the Address' textbox.",
				"english": "Zip:",
				"spanish": "Cremallera:"
			},
			"INSTR-MOBILE-OWNER-OWNER-BUTTON-ADDNEWOWNER": {
				"instructionId": "INSTR-MOBILE-OWNER-OWNER-BUTTON-ADDNEWOWNER",
				"module": "OWNER",
				"area": "OWNER",
				"widget": "BUTTON",
				"description": "This is located in the center part of the 'Owner' screen. When an owner is added, the 'Add New Owner' button will float below the last owner.",
				"english": "Add New Owner",
				"spanish": "Agregar nuevo propietario"
			},
			"INSTR-MOBILE-OWNER-OWNER-LABEL-OWNER": {
				"instructionId": "INSTR-MOBILE-OWNER-OWNER-LABEL-OWNER",
				"module": "OWNER",
				"area": "OWNER",
				"widget": "LABEL",
				"description": "Located at the topmost part of the 'Owner' screen.",
				"english": "Owner",
				"spanish": "Dueño"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDNOTE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDNOTE1",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Satellite Dish on the 'Accessories' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDNOTE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDNOTE2",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Swamp Cooler on the 'Accessories' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDNOTE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDNOTE3",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Antennae on the 'Accessories' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDNOTE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDNOTE4",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Meter mast on the 'Accessories' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDNOTE5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDNOTE5",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Solar Panels on the 'Accessories' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDPHOTO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDPHOTO1",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located above the \"Swamp Cooler\" label on the 'Accessories' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDPHOTO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDPHOTO2",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located above the \"Antennae\" label on the 'Accessories' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDPHOTO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDPHOTO3",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located above the \"Meter mast\" label on the 'Accessories' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDPHOTO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDPHOTO4",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located above the \"Solar Panels\" label on the 'Accessories' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDPHOTO5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDPHOTO5",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located above the \"Back\" button on the 'Accessories' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVIDEO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVIDEO1",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Satellite Dish on the 'Accessories' screen.",
				"english": "Add Video",
				"spanish": "Agregar Video"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVIDEO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVIDEO2",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Swamp Cooler on the 'Accessories' screen.",
				"english": "Add Video",
				"spanish": "Agregar Video"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVIDEO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVIDEO3",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Antennae on the 'Accessories' screen.",
				"english": "Add Video",
				"spanish": "Agregar Video"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVIDEO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVIDEO4",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Meter mast on the 'Accessories' screen.",
				"english": "Add Video",
				"spanish": "Agregar Video"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVIDEO5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVIDEO5",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Solar Panels on the 'Accessories' screen.",
				"english": "Add Video",
				"spanish": "Agregar Video"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVOICE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVOICE1",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Satellite Dish on the 'Accessories' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVOICE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVOICE2",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Swamp Cooler on the 'Accessories' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVOICE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVOICE3",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Antennae on the 'Accessories' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVOICE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVOICE4",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Meter mast on the 'Accessories' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVOICE5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-ADDVOICE5",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Solar Panels on the 'Accessories' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-BACK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-BACK",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located below the \"Add Photo\" button of the Solar Panels on the 'Accessories' screen.",
				"english": "Back",
				"spanish": "Espalda"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-NEXT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-BUTTON-NEXT",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "BUTTON",
				"description": "This is located beside the \"Back\" button on the 'Accessories' screen.",
				"english": "Next",
				"spanish": "Siguiente"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-LABEL-ACCESSORIES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-LABEL-ACCESSORIES",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Accessories' screen.",
				"english": "Roof | Accessories",
				"spanish": "Techo | Accesorios"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-LABEL-ANTENNAE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-LABEL-ANTENNAE",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Swamp Cooler on the 'Accessories' screen.",
				"english": "Antennae?",
				"spanish": "¿Antenas?"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-LABEL-METERMAST": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-LABEL-METERMAST",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Antennae on the 'Accessories' screen.",
				"english": "Meter mast?",
				"spanish": "¿Medidor de mástil?"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-LABEL-SATELLITEDISH": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-LABEL-SATELLITEDISH",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "LABEL",
				"description": "This is located at the top most part of the 'Accessories' screen.",
				"english": "Satellite Dish?",
				"spanish": "¿Antena parabólica?"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-LABEL-SOLARPANELS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-LABEL-SOLARPANELS",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Meter mast on the 'Accessories' screen.",
				"english": "Solar Panels?",
				"spanish": "¿Paneles solares?"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-LABEL-SWAMPCOOLER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-LABEL-SWAMPCOOLER",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Satellite Dish on the 'Accessories' screen.",
				"english": "Swamp Cooler?",
				"spanish": "¿Enfriador de pantano?"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXT-QUANTITY1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXT-QUANTITY1",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located at the top most part of the 'Accessories' screen.",
				"english": "Please input quantity:",
				"spanish": "Por favor, ingrese la cantidad:"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXT-QUANTITY2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXT-QUANTITY2",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Swamp Cooler on the 'Accessories' screen.",
				"english": "Please input quantity:",
				"spanish": "Por favor, ingrese la cantidad:"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXT-QUANTITY3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXT-QUANTITY3",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Antennae on the 'Accessories' screen.",
				"english": "Please input quantity:",
				"spanish": "Por favor, ingrese la cantidad:"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXT-QUANTITY4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXT-QUANTITY4",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Meter mast on the 'Accessories' screen.",
				"english": "Please input quantity:",
				"spanish": "Por favor, ingrese la cantidad:"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXT-QUANTITY5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXT-QUANTITY5",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Solar Panels on the 'Accessories' screen.",
				"english": "Please input quantity:",
				"spanish": "Por favor, ingrese la cantidad:"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTLEFT-NO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTLEFT-NO1",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located below the \"Satellite Dish\" label of the 'Accessories' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTLEFT-NO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTLEFT-NO2",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located below the \"Swamp Cooler\" label on the 'Accessories' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTLEFT-NO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTLEFT-NO3",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located below the \"Antennae\" label on the 'Accessories' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTLEFT-NO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTLEFT-NO4",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located below the \"Meter mast\" label on the 'Accessories' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTLEFT-NO5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTLEFT-NO5",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located below the \"Solar Panels\" label on the 'Accessories' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTRIGHT-YES1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTRIGHT-YES1",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the Satellite Dish on the 'Accessories' screen..",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTRIGHT-YES2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTRIGHT-YES2",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the Swamp Cooler on the 'Accessories' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTRIGHT-YES3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTRIGHT-YES3",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the Antennae on the 'Accessories' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTRIGHT-YES4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTRIGHT-YES4",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the Meter mast on the 'Accessories' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTRIGHT-YES5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ACCESSORIES-TEXTRIGHT-YES5",
				"module": "PROPERTIES",
				"area": "ACCESSORIES",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the Solar Panels on the 'Accessories' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWFENCING-BUTTON-ADDNEWFENCING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWFENCING-BUTTON-ADDNEWFENCING",
				"module": "PROPERTIES",
				"area": "ADDNEWFENCING",
				"widget": "BUTTON",
				"description": "The button Add New Fencing.",
				"english": "Add New Fencing",
				"spanish": "Agregar Nueva Cerca"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWFENCING-LABEL-BACKYARD": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWFENCING-LABEL-BACKYARD",
				"module": "PROPERTIES",
				"area": "ADDNEWFENCING",
				"widget": "LABEL",
				"description": "The label Backyard.",
				"english": "Backyard",
				"spanish": "Patio Trasero"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWFENCING-LABEL-FENCING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWFENCING-LABEL-FENCING",
				"module": "PROPERTIES",
				"area": "ADDNEWFENCING",
				"widget": "LABEL",
				"description": "The label Fencing.",
				"english": "Fencing",
				"spanish": "Esgrima"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWGUTTER-BUTTON-ADDNEWGUTTER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWGUTTER-BUTTON-ADDNEWGUTTER",
				"module": "PROPERTIES",
				"area": "ADDNEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located at the middle part of the 'Add New Gutters' screen.",
				"english": "Add New Gutter",
				"spanish": "Agregar nuevo canalón"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWGUTTER-LABEL-FRONTELEVATION": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWGUTTER-LABEL-FRONTELEVATION",
				"module": "PROPERTIES",
				"area": "ADDNEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Gutters\" label of the 'Add New Gutters' screen.",
				"english": "Front Elevation",
				"spanish": "Elevación frontal"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWGUTTER-LABEL-GUTTERS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWGUTTER-LABEL-GUTTERS",
				"module": "PROPERTIES",
				"area": "ADDNEWGUTTER",
				"widget": "LABEL",
				"description": "This is located at the top most part of the 'Add New Gutters' screen.",
				"english": "Gutters",
				"spanish": "Canalones"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-BUTTON-CANCEL": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-BUTTON-CANCEL",
				"module": "PROPERTIES",
				"area": "ADDNEWSCOPE",
				"widget": "BUTTON",
				"description": "This is located on the left bottom part of the 'Add New Scope' screen.",
				"english": "Cancel",
				"spanish": "Cancelar"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-BUTTON-SAVE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-BUTTON-SAVE",
				"module": "PROPERTIES",
				"area": "ADDNEWSCOPE",
				"widget": "BUTTON",
				"description": "This is located on the right bottom part of the 'Add New Scope' screen.",
				"english": "Save",
				"spanish": "Guardar"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-LABEL-PROPERTIES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-LABEL-PROPERTIES",
				"module": "PROPERTIES",
				"area": "ADDNEWSCOPE",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Add New Scope' screen.",
				"english": "Properties",
				"spanish": "Propiedades"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-TEXT-FENCING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-TEXT-FENCING",
				"module": "PROPERTIES",
				"area": "ADDNEWSCOPE",
				"widget": "TEXT",
				"description": "This is located beside the 'Painting' text of the 'Add New Scope' screen.",
				"english": "Fencing",
				"spanish": "Esgrima"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-TEXT-INTERIOR": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-TEXT-INTERIOR",
				"module": "PROPERTIES",
				"area": "ADDNEWSCOPE",
				"widget": "TEXT",
				"description": "This is located beside the 'HVAC' text of the 'Add New Scope' screen.",
				"english": "Interior",
				"spanish": "Interior"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-TEXT-OTHER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-TEXT-OTHER",
				"module": "PROPERTIES",
				"area": "ADDNEWSCOPE",
				"widget": "TEXT",
				"description": "This is located below the 'HVAC' text on the 'Add New Scope' screen.",
				"english": "Other",
				"spanish": "Otro"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-TEXT-PAINTING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-TEXT-PAINTING",
				"module": "PROPERTIES",
				"area": "ADDNEWSCOPE",
				"widget": "TEXT",
				"description": "This is located below 123 Main Street on the 'Add New Scope' screen.",
				"english": "Painting",
				"spanish": "Pintura"
			},
			"INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-TEXTBELOW-PAINTING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ADDNEWSCOPE-TEXTBELOW-PAINTING",
				"module": "PROPERTIES",
				"area": "ADDNEWSCOPE",
				"widget": "TEXTBELOW",
				"description": "This is located below the 'Painting' text on the 'Add New Scope' screen.",
				"english": "Painting",
				"spanish": "Pintura"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDNOTE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDNOTE1",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of the Chimney Flashing on the 'Chimneys' screen.",
				"english": "Add Note",
				"spanish": "Agregar Nota"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDNOTE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDNOTE2",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of the Is Cricket Existing on the 'Chimneys' screen.",
				"english": "Add Note",
				"spanish": "Agregar Nota"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDPHOTO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDPHOTO1",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "BUTTON",
				"description": "This is located below the \"Length in inches\" text on the 'Chimneys' screen.",
				"english": "Add Photo",
				"spanish": "Agregar Foto"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDPHOTO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDPHOTO2",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text on the 'Chimneys' screen.",
				"english": "Add Photo",
				"spanish": "Agregar Foto"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDVIDEO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDVIDEO1",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Chimney Flashing on the 'Chimneys' screen.",
				"english": "Add Video",
				"spanish": "Agregar Video"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDVIDEO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDVIDEO2",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Is Cricket Existing on the 'Chimneys' screen.",
				"english": "Add Video",
				"spanish": "Agregar Video"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDVOICE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDVOICE1",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Chimney Flashing on the 'Chimneys' screen.",
				"english": "Add Voice",
				"spanish": "Agregar Voz"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDVOICE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-ADDVOICE2",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Is Cricket Existing on the 'Chimneys' screen.",
				"english": "Add Voice",
				"spanish": "Agregar Voz"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-BACK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-BACK",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "BUTTON",
				"description": "This is located below the \"Add Photo\" button of the Is Cricket Existing on the 'Chimneys' screen.",
				"english": "Back",
				"spanish": "Espalda"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-NEXT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-BUTTON-NEXT",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Back\" button on the 'Chimneys' screen.",
				"english": "Next",
				"spanish": "Siguiente"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-LABEL-CHIMNEYFLASHING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-LABEL-CHIMNEYFLASHING",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "LABEL",
				"description": "This is located below the stepper widgets of the 'Chimneys' screen.",
				"english": "Chimney Flashing:",
				"spanish": "Revestimiento de Chimenea."
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-LABEL-CRICKET": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-LABEL-CRICKET",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Chimney Flashing on the 'Chimneys' screen.",
				"english": "Is Cricket Existing?",
				"spanish": "¿Existe El Cricket?"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-LABEL-TOPCHIMNEY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-LABEL-TOPCHIMNEY",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Chimneys' screen.",
				"english": "Roof | Chimneys",
				"spanish": "Tejado | Chimeneas"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-TEXT-LENGTH": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-TEXT-LENGTH",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "TEXT",
				"description": "This is located beside the \"Width in inches\" text on the 'Chimneys' screen.",
				"english": "Length in inches:",
				"spanish": "Longitud en pulgadas:"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-TEXT-NO": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-TEXT-NO",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "TEXT",
				"description": "This is located below the \"Is Cricket Existing\" label on the 'Chimneys' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-TEXT-WIDTH": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-TEXT-WIDTH",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "TEXT",
				"description": "This is located below the \"Chimeny Flashing\" label on the 'Chimneys' screen.",
				"english": "Width in inches:",
				"spanish": "Ancho en pulgadas:"
			},
			"INSTR-MOBILE-PROPERTIES-CHIMNEYS-TEXT-YES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CHIMNEYS-TEXT-YES",
				"module": "PROPERTIES",
				"area": "CHIMNEYS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text on the 'Chimneys' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-BUTTON-ADDNEWOWNER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-BUTTON-ADDNEWOWNER",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "BUTTON",
				"description": "This is located below the 'Or' text of the 'Create New Property' screen.",
				"english": "Add New Owner",
				"spanish": "Agregar Nuevo Propietario"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-BUTTON-BACK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-BUTTON-BACK",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "BUTTON",
				"description": "This is located at the left below the 'Add New Owner' button of the 'Create New Property' screen.",
				"english": "Back",
				"spanish": "Espalda"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-BUTTON-CANCEL": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-BUTTON-CANCEL",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "BUTTON",
				"description": "This is located at the left below the 'Add New Owner' button of the 'Create New Property' screen.",
				"english": "Cancel",
				"spanish": "Cancelar"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-BUTTON-NEXT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-BUTTON-NEXT",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "BUTTON",
				"description": "This is located at the right below the 'Add New Owner' button of the 'Create New Property' screen.",
				"english": "Next",
				"spanish": "Siguiente"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-INLINETEXT-ENTERPROPERTYTYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-INLINETEXT-ENTERPROPERTYTYPE",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "INLINETEXT",
				"description": "This is located below the 'Other Type' label of the 'Create New Property' screen.",
				"english": "Please enter your property type . . .",
				"spanish": "Por favor, ingrese el tipo de propiedad . . ."
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-INLINETEXT-PLEASEENTERSCOPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-INLINETEXT-PLEASEENTERSCOPE",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "INLINETEXT",
				"description": "This is located below the 'Other Scope' label of the 'Create New Property' screen.",
				"english": "Please enter scope . . .",
				"spanish": "Por favor, ingresa el alcance . . ."
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-CREATENEWPROPERTY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-CREATENEWPROPERTY",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located at the center top part of the 'Create New Property' screen.",
				"english": "Create New Property",
				"spanish": "Crear Nueva Propiedad"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-ESTIMATETYPEREQUESTED": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-ESTIMATETYPEREQUESTED",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located at the left part below the 'Single Family' text of the 'Create New Property' screen.",
				"english": "Estimate Type Requested:",
				"spanish": "Tipo de Estimación Solicitada:"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-OTHERTYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-OTHERTYPE",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located at the left part below the 'Garage' text of the 'Create New Property' screen.",
				"english": "Other Type:",
				"spanish": "Otro Tipo:"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-PROPERTYNAME": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-PROPERTYNAME",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located at the top left part of the 'Create New Property' screen.",
				"english": "Property Name:",
				"spanish": "Nombre de la Propiedad:"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-PROPERTYTYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-PROPERTYTYPE",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located at the left part below the input field of the 'Create New Property' screen.",
				"english": "Property Type:",
				"spanish": "Tipo de Propiedad:"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-SCOPES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-SCOPES",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located at the top left part of the 'Create New Property' screen.",
				"english": "Scopes:",
				"spanish": "Alcances:"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-SELECTEXISTINGOWNER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-SELECTEXISTINGOWNER",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located at the left part of the 'Create New Property' screen.",
				"english": "Select Existing Owner",
				"spanish": "Seleccionar Propietario Existente"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-STRUCTURETYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-STRUCTURETYPE",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located at the top left part of the 'Create New Property' screen.",
				"english": "Structure Type:",
				"spanish": "Tipo de Estructura"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-TAKEPICTURE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-LABEL-TAKEPICTURE",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located below the 'Insurance Claim' and 'Retail Estimate' texts of the 'Create New Property' screen.",
				"english": "Take a picture of structure",
				"spanish": "Toma una foto de la estructura"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-ADDLINKS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-ADDLINKS",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located below the inline text of the 'Create New Property' screen.",
				"english": "Add Links:",
				"spanish": "Agregar Enlaces:"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-ADDUPTO10IMAGES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-ADDUPTO10IMAGES",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located below the 'Take Picture Instruction' label of the 'Create New Property' screen.",
				"english": "Add up to 10 images",
				"spanish": "Agrega hasta 10 imágenes"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-BARN": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-BARN",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located at the left part of the 'Dwelling' text in the 'Create New Property' screen.",
				"english": "Barn",
				"spanish": "Granero"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-COMMERCIAL": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-COMMERCIAL",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located beside the 'Single Family' text of the 'Create New Property' screen.",
				"english": "Commercial",
				"spanish": "Comercial"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-COMPANYCAMPORTFOLIOLINK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-COMPANYCAMPORTFOLIOLINK",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located below the 'Add Links' label of the 'Create New Property' screen.",
				"english": "CompanyCam Portfolio Link:",
				"spanish": "Enlace al Portafolio de CompanyCam:"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-DOORS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-DOORS",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located below the 'Scopes' label of the 'Create New Property' screen.",
				"english": "Doors",
				"spanish": "Puertas"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-DWELLING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-DWELLING",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located at the left part below the 'Property Type' label of the 'Create New Property' screen.",
				"english": "Dwelling",
				"spanish": "Vivienda"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-FENCING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-FENCING",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located beside the 'Windows' text of the 'Create New Property' screen.",
				"english": "Fencing",
				"spanish": "Esgrima"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-GARAGE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-GARAGE",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located at the left part below the 'Dwelling' text of the 'Create New Property' screen.",
				"english": "Garage",
				"spanish": "Garaje"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-GUTTERS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-GUTTERS",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located below the 'Doors' text of the 'Create New Property' screen.",
				"english": "Gutters",
				"spanish": "Canalones"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-HVACOTHER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-HVACOTHER",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located beside the 'HVAC' text of the 'Create New Property' screen.",
				"english": "Other",
				"spanish": "Otro"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-INSURANCECLAIM": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-INSURANCECLAIM",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located below the 'Estimate Type Requested' label of the 'Create New Property' screen.",
				"english": "Insurance Claim",
				"spanish": "Reclamo de Seguro"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-INTERIOR": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-INTERIOR",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located beside the 'Painting' text of the 'Create New Property' screen.",
				"english": "Interior",
				"spanish": "Interior"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-OR": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-OR",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located at the center part of the 'Create New Property' screen.",
				"english": "Or",
				"spanish": "O"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-OTHER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-OTHER",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located at the left part of the 'Garage' text in the 'Create New Property' screen.",
				"english": "Other",
				"spanish": "Otro"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-OTHERSCOPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-OTHERSCOPE",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located below the 'HVAC' text of the 'Create New Property' screen.",
				"english": "Other Scope:",
				"spanish": "Otro Alcance:"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-PAINTING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-PAINTING",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located below the 'Windows' text of the 'Create New Property' screen.",
				"english": "Painting",
				"spanish": "Pintura"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-RETAILESTIMATE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-RETAILESTIMATE",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located beside the 'Insurance Claim' text of the 'Create New Property' screen.",
				"english": "Retail Estimate",
				"spanish": "Estimación Minorista"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-ROOFS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-ROOFS",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located beside the 'Doors' text of the 'Create New Property' screen.",
				"english": "Roofs",
				"spanish": "Techos"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-SIDING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-SIDING",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located beside the 'Gutters' text of the 'Create New Property' screen.",
				"english": "Siding",
				"spanish": "Revestimiento"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-SINGLEFAMILY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-SINGLEFAMILY",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located below the 'Structure type' label of the 'Create New Property' screen.",
				"english": "Single Family",
				"spanish": "Familia Unipersonal"
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-TAKEPICTUREINSTRUCTION": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-TAKEPICTUREINSTRUCTION",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located below the 'Take Picture' label of the 'Create New Property' screen.",
				"english": "Take the picture of front of home",
				"spanish": "Toma la foto del frente de la casa."
			},
			"INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-WINDOWS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-CREATENEWPROPERTY-TEXT-WINDOWS",
				"module": "PROPERTIES",
				"area": "CREATENEWPROPERTY",
				"widget": "TEXT",
				"description": "This is located below the 'Gutters' text of the 'Create New Property' screen.",
				"english": "Windows",
				"spanish": "Ventanas"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDNOTE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDNOTE1",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "BUTTON",
				"description": "This is located at the bottom of Add Photos dialogue on the Roof | Decking screen.",
				"english": "Add Note",
				"spanish": "Agregar Nota"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDNOTE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDNOTE2",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "BUTTON",
				"description": "This is located beside the 'Add Video' button on the 'Decking' screen.",
				"english": "Add Note",
				"spanish": "Agregar Nota"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDPHOTO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDPHOTO1",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "BUTTON",
				"description": "This is located below the 'Plywood' text on the Roof | Decking screen.",
				"english": "Add Photo",
				"spanish": "Agregar Foto"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDPHOTO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDPHOTO2",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text of the 'Decking' screen",
				"english": "Add Photo",
				"spanish": "Agregar Foto"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDVIDEO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDVIDEO1",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "BUTTON",
				"description": "This is located beside the 'Add Photo button' on the Roof | Decking screen.",
				"english": "Add Video",
				"spanish": "Agregar Video"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDVIDEO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDVIDEO2",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "BUTTON",
				"description": "This is located beside the 'Add Photo' button on the 'Decking' screen.",
				"english": "Add Video",
				"spanish": "Agregar Video"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDVOICE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDVOICE1",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "BUTTON",
				"description": "This is located at the bottom of Add Notes dialogue on the 'Decking' screen",
				"english": "Add Voice",
				"spanish": "Agregar Voz"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDVOICE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-ADDVOICE2",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "BUTTON",
				"description": "This is located beside the 'Add Note' button on the 'Decking' screen.",
				"english": "Add Voice",
				"spanish": "Agregar Voz"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-NEXT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-BUTTON-NEXT",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "BUTTON",
				"description": "This is located at the bottom part of the 'Decking' screen",
				"english": "Next",
				"spanish": "Siguiente"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-INLINETEXT-ADDANOTE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-INLINETEXT-ADDANOTE",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "INLINETEXT",
				"description": "This is located at the bottom part of the 'Decking' screen",
				"english": "Add a note",
				"spanish": "Agregar una nota"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-INLINETEXT-NOTCLOSING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-INLINETEXT-NOTCLOSING",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "INLINETEXT",
				"description": "This is located below the \"Notes\" label on the 'Decking' screen",
				"english": "Window not closing properly. Need a replace.",
				"spanish": "La ventana no se cierra correctamente. Necesito un reemplazo."
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-LABEL-DECKING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-LABEL-DECKING",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Decking' screen.",
				"english": "Roof | Decking",
				"spanish": "Tejado | Cubierta"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-LABEL-EXISTINGMATERIALTYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-LABEL-EXISTINGMATERIALTYPE",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "LABEL",
				"description": "This is located at the top part of the Roof | Decking screen.",
				"english": "Existing Material Type:",
				"spanish": "Tipo de Material Existente:"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-LABEL-NOTES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-LABEL-NOTES",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "LABEL",
				"description": "This is located below the 'Voice Notes' label on the 'Decking' screen.",
				"english": "Notes",
				"spanish": "Notas"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-LABEL-PHOTOS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-LABEL-PHOTOS",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button on the 'Decking' screen",
				"english": "Photos",
				"spanish": "Fotos"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-LABEL-REDECK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-LABEL-REDECK",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "LABEL",
				"description": "This is located at the bottommost part of the 'Decking' screen",
				"english": "Is Re-deck Required?",
				"spanish": ""
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-LABEL-VIDEOS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-LABEL-VIDEOS",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "LABEL",
				"description": "This is located below the 'Photos' label on the 'Decking' screen.",
				"english": "Videos",
				"spanish": "Videos"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-LABEL-VOICENOTES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-LABEL-VOICENOTES",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "LABEL",
				"description": "This is located below the \"Window is not closing\" inline text on the 'Decking' screen",
				"english": "Voice Notes",
				"spanish": "Notas de voz"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-TEXT-NO": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-TEXT-NO",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "TEXT",
				"description": "This is located beside the \"Yes\" text of the 'Decking' screen",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-TEXT-PLANK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-TEXT-PLANK",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "TEXT",
				"description": "This is located at the bottom of the \"Existing Type Material\" label.",
				"english": "Plank",
				"spanish": "Tabla"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-TEXT-PLYWOOD/OSB": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-TEXT-PLYWOOD/OSB",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "TEXT",
				"description": "This is located at the bottom of the \"Plank\" text in the Roof | Decking screen.",
				"english": "Plywood/OSB",
				"spanish": "Madera Contrachapada/OSB"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-TEXT-SPACED": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-TEXT-SPACED",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "TEXT",
				"description": "This is located at the right side of the \"Plank\" text in the Roof | Decking screen.",
				"english": "Spaced",
				"spanish": "Espaciado"
			},
			"INSTR-MOBILE-PROPERTIES-DECKING-TEXT-YES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-DECKING-TEXT-YES",
				"module": "PROPERTIES",
				"area": "DECKING",
				"widget": "TEXT",
				"description": "This is located below the Re-deck label of the 'Decking' screen",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-EDITPROPERTY-BUTTON-SAVE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-EDITPROPERTY-BUTTON-SAVE",
				"module": "PROPERTIES",
				"area": "EDITPROPERTY",
				"widget": "BUTTON",
				"description": "This is located beside 123 Main Street on the 'Edit Property' screen.",
				"english": "Save",
				"spanish": "Guardar"
			},
			"INSTR-MOBILE-PROPERTIES-EDITPROPERTY-LABEL-ACCULYNXPORTFOLIOLINK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-EDITPROPERTY-LABEL-ACCULYNXPORTFOLIOLINK",
				"module": "PROPERTIES",
				"area": "EDITPROPERTY",
				"widget": "LABEL",
				"description": "This is located at the bottom part of the 'Edit Property' screen.",
				"english": "Acculynx Portfolio Link:",
				"spanish": "Enlace de Portafolio de Acculynx:"
			},
			"INSTR-MOBILE-PROPERTIES-EDITPROPERTY-LABEL-OWNER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-EDITPROPERTY-LABEL-OWNER",
				"module": "PROPERTIES",
				"area": "EDITPROPERTY",
				"widget": "LABEL",
				"description": "This is located below the Property Name input field on the 'Edit Property' screen.",
				"english": "Owner:",
				"spanish": "Dueño:"
			},
			"INSTR-MOBILE-PROPERTIES-EDITPROPERTY-LABEL-PROPERTIES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-EDITPROPERTY-LABEL-PROPERTIES",
				"module": "PROPERTIES",
				"area": "EDITPROPERTY",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Edit Property' screen.",
				"english": "Properties",
				"spanish": "Propiedades"
			},
			"INSTR-MOBILE-PROPERTIES-EDITPROPERTY-LABEL-PROPERTYNAME": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-EDITPROPERTY-LABEL-PROPERTYNAME",
				"module": "PROPERTIES",
				"area": "EDITPROPERTY",
				"widget": "LABEL",
				"description": "This is located at the left part of the 'Edit Property' screen.",
				"english": "Property Name:",
				"spanish": "Nombre de la Propiedad:"
			},
			"INSTR-MOBILE-PROPERTIES-EXISTING-INLINETEXT-SEARCH": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-EXISTING-INLINETEXT-SEARCH",
				"module": "PROPERTIES",
				"area": "EXISTING",
				"widget": "INLINETEXT",
				"description": "This is located at the top part of the 'Existing' screen below the 'Properties' label.",
				"english": "Search . . .",
				"spanish": "Buscar . . ."
			},
			"INSTR-MOBILE-PROPERTIES-FENCING-BUTTON-ADDAFENCING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-FENCING-BUTTON-ADDAFENCING",
				"module": "PROPERTIES",
				"area": "FENCING",
				"widget": "BUTTON",
				"description": "This is located at the middle part of the 'Fencing' screen.",
				"english": "Add a Fencing",
				"spanish": ""
			},
			"INSTR-MOBILE-PROPERTIES-FENCING-LABEL-FENCING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-FENCING-LABEL-FENCING",
				"module": "PROPERTIES",
				"area": "FENCING",
				"widget": "LABEL",
				"description": "This is located at the top most part of the 'Fencing' screen.",
				"english": "Fencing",
				"spanish": ""
			},
			"INSTR-MOBILE-PROPERTIES-FIRSTTIME-BUTTON-CREATENEWPROPERTY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-FIRSTTIME-BUTTON-CREATENEWPROPERTY",
				"module": "PROPERTIES",
				"area": "FIRSTTIME",
				"widget": "BUTTON",
				"description": "This is located at the center part of the 'First Time' screen.",
				"english": "Create New Property",
				"spanish": "Crear nueva propiedad"
			},
			"INSTR-MOBILE-PROPERTIES-FIRSTTIME-LABEL-PROPERTIES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-FIRSTTIME-LABEL-PROPERTIES",
				"module": "PROPERTIES",
				"area": "FIRSTTIME",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'First Time' screen.",
				"english": "Properties",
				"spanish": "Propiedades"
			},
			"INSTR-MOBILE-PROPERTIES-FULLSCOPE-BUTTON-ADDANOTHERSCOPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-FULLSCOPE-BUTTON-ADDANOTHERSCOPE",
				"module": "PROPERTIES",
				"area": "FULLSCOPE",
				"widget": "BUTTON",
				"description": "This is located below the 'Accessories' text on the 'Full Scope' screen.",
				"english": "Add Another Scope",
				"spanish": "Agregar Otro Alcance"
			},
			"INSTR-MOBILE-PROPERTIES-FULLSCOPE-LABEL-PROPERTIES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-FULLSCOPE-LABEL-PROPERTIES",
				"module": "PROPERTIES",
				"area": "FULLSCOPE",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Full Scope' screen.",
				"english": "Properties",
				"spanish": "Propiedades"
			},
			"INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-ACCESSORIES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-ACCESSORIES",
				"module": "PROPERTIES",
				"area": "FULLSCOPE",
				"widget": "TEXT",
				"description": "This is located below the 'Siding' text on the 'Full Scope' screen.",
				"english": "Accessories",
				"spanish": "Accesorios"
			},
			"INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-DOORS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-DOORS",
				"module": "PROPERTIES",
				"area": "FULLSCOPE",
				"widget": "TEXT",
				"description": "This is located below the 'Fencing' text on the 'Full Scope' screen.",
				"english": "Doors",
				"spanish": "Puertas"
			},
			"INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-FENCING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-FENCING",
				"module": "PROPERTIES",
				"area": "FULLSCOPE",
				"widget": "TEXT",
				"description": "This is located below the 'Windows' text on the 'Full Scope' screen.",
				"english": "Fencing",
				"spanish": "Esgrima"
			},
			"INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-GUTTERS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-GUTTERS",
				"module": "PROPERTIES",
				"area": "FULLSCOPE",
				"widget": "TEXT",
				"description": "This is located below the 'Roof' text on the 'Full Scope' screen.",
				"english": "Gutters",
				"spanish": "Canalones"
			},
			"INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-ROOF": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-ROOF",
				"module": "PROPERTIES",
				"area": "FULLSCOPE",
				"widget": "TEXT",
				"description": "This is located below 123 Main Street on the 'Full Scope' screen.",
				"english": "Roof",
				"spanish": "Tejado"
			},
			"INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-SIDING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-SIDING",
				"module": "PROPERTIES",
				"area": "FULLSCOPE",
				"widget": "TEXT",
				"description": "This is located below the 'Doors' text on the 'Full Scope' screen.",
				"english": "Siding",
				"spanish": "Revestimiento"
			},
			"INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-WINDOWS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-FULLSCOPE-TEXT-WINDOWS",
				"module": "PROPERTIES",
				"area": "FULLSCOPE",
				"widget": "TEXT",
				"description": "This is located below the 'Gutters' text on the 'Full Scope' screen.",
				"english": "Windows",
				"spanish": "Ventanas"
			},
			"INSTR-MOBILE-PROPERTIES-GUTTERS-BUTTON-ADDAGUTTER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-GUTTERS-BUTTON-ADDAGUTTER",
				"module": "PROPERTIES",
				"area": "GUTTERS",
				"widget": "BUTTON",
				"description": "This is located at the middle part of the 'Gutters' screen.",
				"english": "Add a Gutter",
				"spanish": "Agregar un canalón"
			},
			"INSTR-MOBILE-PROPERTIES-GUTTERS-LABEL-GUTTERS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-GUTTERS-LABEL-GUTTERS",
				"module": "PROPERTIES",
				"area": "GUTTERS",
				"widget": "LABEL",
				"description": "This is located at the top most part of the 'Gutters' screen.",
				"english": "Gutters",
				"spanish": "Canalones"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE1",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of the High Roof on the 'High Pitch Access' screen",
				"english": "Add Note",
				"spanish": "Agregar Nota"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE2",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of the 1st Story Gable Cornice Returns on the 'High Pitch Access' screen",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE3",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of the 2nd Story Gable Cornice Returns on the 'High Pitch Access' screen",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE4",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the 1st Story Gable Strips on the 'High Pitch Access' screen",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE5",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the 2nd Story Gable Strips on the 'High Pitch Access' screen",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE7",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Easy Dumpster Access on the 'High Pitch Access' screen",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDNOTE8",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Can Suppliers Roof Load on the 'High Pitch Access' screen",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO1",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text of the High Roof on the 'High Pitch Access' screen",
				"english": "Add Photo",
				"spanish": "Agregar Foto"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO2",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located above the \"2nd Story Gable Cornice Returns\" label on the 'High Pitch Access' screen",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO3",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located above the \"1st Story Gable Strips\" label on the 'High Pitch Access' screen",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO4",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located above the \"2nd Story Gable Strips\" label on the 'High Pitch Access' screen",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO5",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located above the \"Easy Dumpster Access\" label on the 'High Pitch Access' screen",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO7",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text of the Easy Dumpster Access on the 'High Pitch Access' screen",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDPHOTO8",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text of the Can Suppliers Roof Load on the 'High Pitch Access' screen",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO1",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the High Roof on the 'High Pitch Access' screen",
				"english": "Add Video",
				"spanish": "Agregar Video"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO2",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the 1st Story Gable Cornice Returns on the 'High Pitch Access' screen",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO3",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the 2nd Story Gable Cornice Returns on the 'High Pitch Access' screen",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO4",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the 1st Story Gable Strips on the 'High Pitch Access' screen",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO5",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the 2nd Story Gable Strips on the 'High Pitch Access' screen",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO7",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Easy Dumpster Access on the 'High Pitch Access' screen",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVIDEO8",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Can Suppliers Roof Load on the 'High Pitch Access' screen",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE1",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the High Roof on the 'High Pitch Access' screen",
				"english": "Add Voice",
				"spanish": "Agregar Voz"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE2",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the 1st Story Gable Cornice Returns on the 'High Pitch Access' screen",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE3",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the 2nd Story Gable Cornice Returns on the 'High Pitch Access' screen",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE4",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the 1st Story Gable Strips on the 'High Pitch Access' screen",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE5",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the 2nd Story Gable Strips on the 'High Pitch Access' screen",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE7",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Easy Dumpster Access on the 'High Pitch Access' screen",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-ADDVOICE8",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Can Suppliers Roof Load on the 'High Pitch Access' screen",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-BACK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-BACK",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located below the \"Add Photo\" button of the Can Suppliers Roof Load on the 'High Pitch Access' screen",
				"english": "Back",
				"spanish": "Espalda"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-NEXT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-BUTTON-NEXT",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Back\" button on the 'High Pitch Access' screen",
				"english": "Next",
				"spanish": "Siguiente"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-DUMPSTER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-DUMPSTER",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the 2nd Story Gable Strips on the 'High Pitch Access' screen",
				"english": "Easy Dumpster Access?",
				"spanish": "¿Acceso fácil a la basura?"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-FIRSTSTORYGABLECORNICE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-FIRSTSTORYGABLECORNICE",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the High Roof on the 'High Pitch Access' screen",
				"english": "1st Story Gable Cornice Returns?",
				"spanish": "¿1ra Historia Regresa de Cornisa de Frontón?"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-FIRSTSTORYGABLESTRIPS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-FIRSTSTORYGABLESTRIPS",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the 2nd Story Gable Cornice Returns on the 'High Pitch Access' screen",
				"english": "1st Story Gable Strips?",
				"spanish": "¿Tiras de frontón de la primera historia?"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-HIGHPITCHACCESS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-HIGHPITCHACCESS",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'High Pitch Access' screen.",
				"english": "Roof | High Pitch Access",
				"spanish": "Tejado | Acceso De Alta Pendiente"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-HIGHROOF": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-HIGHROOF",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "LABEL",
				"description": "This is located below the stepper widgets of the 'High Pitch Access' screen",
				"english": "Is Any Part High Roof SQs?",
				"spanish": "¿Hay Alguna Parte De Techo Alto SQs?"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-ROOFLOAD": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-ROOFLOAD",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Easy Dumpster Access on the 'High Pitch Access' screen",
				"english": "Can Suppliers Roof Load?",
				"spanish": "¿Pueden los proveedores cargar el techo?"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-SECONDSTORYGABLECORNICE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-SECONDSTORYGABLECORNICE",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the 1st Story Gable Cornice Returns on the 'High Pitch Access' screen",
				"english": "2nd Story Gable Cornice Returns?",
				"spanish": "¿Retornos de cornisa de frontón de segundo piso?"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-SECONDSTORYGABLESTRIPS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-LABEL-SECONDSTORYGABLESTRIPS",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the 1st Story Gable Strips on the 'High Pitch Access' screen",
				"english": "2nd Story Gable Strips?",
				"spanish": "¿Tiras de frontón de la segunda planta?"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO1",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located below the \"Is Any Part High Roof SQs\" label of the 'High Pitch Access' screen",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO2",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located below the \"1st Story Gable Cornice Returns\" label on the 'High Pitch Access' screen",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO3",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located below the \"2nd Story Gable Cornice Returns\" label on the 'High Pitch Access' screen",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO4",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located below the \"1st Story Gable Strips\" label on the 'High Pitch Access' screen",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO5",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located below the \"2nd Story Gable Strips\" label on the 'High Pitch Access' screen",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO6",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located below the \"Easy Dumpster Access\" label on the 'High Pitch Access' screen",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-NO7",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located below the \"Can Suppliers Roof Load\" label on the 'High Pitch Access' screen",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-QUANTITY1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-QUANTITY1",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the 1st Story Gable Cornice Returns on the 'High Pitch Access' screen",
				"english": "Please input quantity:",
				"spanish": "Por favor, ingrese la cantidad:"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-QUANTITY2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-QUANTITY2",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the 2nd Story Gable Cornice Returns on the 'High Pitch Access' screen",
				"english": "Please input quantity:",
				"spanish": "Por favor, ingrese la cantidad:"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-QUANTITY3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-QUANTITY3",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the 1st Story Gable Strips on the 'High Pitch Access' screen",
				"english": "Please input quantity:",
				"spanish": "Por favor, ingrese la cantidad:"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-QUANTITY4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-QUANTITY4",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the 2nd Story Gable Strips on the 'High Pitch Access' screen",
				"english": "Please input quantity:",
				"spanish": "Por favor, ingrese la cantidad:"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES1",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text on the 'High Pitch Access' screen",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES2",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the 1st Story Gable Cornice Returns on the 'High Pitch Access' screen",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES3",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the 2nd Story Gable Cornice Returns on the 'High Pitch Access' screen",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES4",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the 1st Story Gable Strips on the 'High Pitch Access' screen",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES5",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the 2nd Story Gable Strips on the 'High Pitch Access' screen",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES6",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the Easy Dumpster Access on the 'High Pitch Access' screen",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-HIGHPITCHACCESS-TEXT-YES7",
				"module": "PROPERTIES",
				"area": "HIGHPITCHACCESS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the Can Suppliers Roof Load on the 'High Pitch Access' screen",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE1",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Elevation Eaves on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE10": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE10",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Extensions LF on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE11": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE11",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Are gutters and downspouts painted on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE12": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE12",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Gutter Guards LF on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE13": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE13",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Gutter Guards Quality on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE14": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE14",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Gutter Guard Action on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE2",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Gutter Size on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE3",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Gutter Material Type on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE4",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Downspouts LF on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE5",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add photo\" button of the Downspout Size on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE6",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the A-Turns Quantity on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE7",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Miters Quantity on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE8",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" label of the Miters Quantity on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE9": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDNOTE9",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Tip-Ups Quantity on the 'New Gutters' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO1",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located above the \"Gutter Size\" label of on the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO10": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO10",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located above the \"Are gutters and downspouts painted\" label of the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO11": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO11",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text of the Are gutters and downspouts painted on the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO12": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO12",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located above the \"Gutter Guards Quality\" label of the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO13": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO13",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located below the \"Premium Grade\" text of the Gutter Guards Quality on the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO14": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO14",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located below the \"Replace\" text of the Gutter Guard Action on the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO2",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located below the \"Oversized\" text of the Gutter Size on the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO3",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located below the \"Plastic\" text of the Gutter Material Type on the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO4",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located above the \"Downspout Size\" label of the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO5",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located above the \"A-Turns Quantity\" label of the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO6",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located above the \"B-Turns Quantity\" label of the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO7",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located above the \"Miters Quantity\" label of the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO8",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located above the \"Tip-Ups Quantity\" label of the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO9": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDPHOTO9",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located above the \"Extensions LF\" label of the 'New Gutters' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO1",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Elevation Eaves on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO10": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO10",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Extensions LF on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO11": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO11",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Are gutters and downspouts painted on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO12": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO12",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Gutter Guards LF on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO13": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO13",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Gutter Guards Quality on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO14": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO14",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Gutter Guard Action on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO2",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Gutter Size on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO3",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Gutter Material Type on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO4",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Downspouts LF on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO5",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Downspout Size on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO6",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the A-Turns Quantity on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO7",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Miters Quantity on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO8",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" label of the Miters Quantity on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO9": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVIDEO9",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Tip-Ups Quantity on the 'New Gutters' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE1",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Elevation Eaves on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE10": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE10",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Extensions LF on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE11": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE11",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Are gutters and downspouts painted on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE12": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE12",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Gutter Guards LF on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE13": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE13",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Gutter Guards Quality on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE14": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE14",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Gutter Guard Action on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE2",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Gutter Size on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE3",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Gutter Material Type on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE4",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Downspouts LF on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE5",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Downspout Size on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE6",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the A-Turns Quantity on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE7",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Miters Quantity on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE8",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" label of the Miters Quantity on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE9": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-ADDVOICE9",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Tip-Ups Quantity on the 'New Gutters' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-SAVE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-BUTTON-SAVE",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "BUTTON",
				"description": "This is located beside the \"Front Elevation\" label on the 'New Gutters' screen.",
				"english": "Save",
				"spanish": "Guardar"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-INLINETEXT-GUTTERNAME": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-INLINETEXT-GUTTERNAME",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "INLINETEXT",
				"description": "This is located below the \"Gutters\" label on the 'Gutters' screen.",
				"english": "Gutter Name",
				"spanish": "Nombre de la canaleta"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-INLINETEXT-HOWMANY5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-INLINETEXT-HOWMANY5",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "INLINETEXT",
				"description": "This is located below the \"Numbers\" text of the Miters Quantity on the 'New Gutters' screen.",
				"english": "How many",
				"spanish": "¿Cuántos?"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-INLINETEXT-HOWMANY6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-INLINETEXT-HOWMANY6",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "INLINETEXT",
				"description": "This is located below the \"Numbers\" label of the Tip-Ups Quantity on the 'New Gutters' screen.",
				"english": "Please input how many Tip-Ups:",
				"spanish": "Por favor, ingrese cuántos Tip-Ups:"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-INLINETEXT-HOWMANY7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-INLINETEXT-HOWMANY7",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "INLINETEXT",
				"description": "This is located below the \"Numbers\" text of the Extensions LF on the 'New Gutters' screen.",
				"english": "Please input how many feet of extensions:",
				"spanish": "Por favor, ingrese cuántos pies de extensiones:"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-INLINETEXT-HOWMANY8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-INLINETEXT-HOWMANY8",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "INLINETEXT",
				"description": "This is located below the \"Numbers\" text of the Gutter Guards LF on the 'New Gutters' screen.",
				"english": "Please input how many feet of gutter guards:",
				"spanish": "Por favor, ingrese cuántos pies de protectores de canalón."
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-A-TURNSQUANTITY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-A-TURNSQUANTITY",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Downspout Size on the 'New Gutters' screen.",
				"english": "A- Turns Quantity",
				"spanish": "Cantidad de vueltas"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-AREGUTTERSPAINTED": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-AREGUTTERSPAINTED",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Extensions LF on the 'New Gutters' screen.",
				"english": "Are gutters and downspouts painted?",
				"spanish": "¿Están pintados los canalones y bajantes?"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-B-TURNSQUANTITY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-B-TURNSQUANTITY",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the A-Turns Quantity on the 'New Gutters' screen.",
				"english": "B- Turns Quantity",
				"spanish": "Cantidad de vueltas"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-DOWNSPOUTSIZE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-DOWNSPOUTSIZE",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Add photo\" button of the Downspouts LF on the 'New Gutters' screen.",
				"english": "Downspout Size",
				"spanish": "Tamaño del bajante"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-DOWNSPOUTSLF": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-DOWNSPOUTSLF",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Add Note\" button of the Gutter Material Type on the 'New Gutters' screen.",
				"english": "Downspouts LF",
				"spanish": "Bajantes LF"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-EAVES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-EAVES",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Front Elevation\" label on the 'New Gutters' screen.",
				"english": "Elevation Eaves LF",
				"spanish": "Elevación alero LF"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-EXTENSIONSLF": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-EXTENSIONSLF",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Tip-Ups Quantity on the 'New Gutters' screen.",
				"english": "Extensions LF",
				"spanish": "Extensiones LF"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-FRONTELEVATION": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-FRONTELEVATION",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Gutters\" label on the 'New Gutters' screen.",
				"english": "Front Elevation",
				"spanish": "Elevación frontal"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-GUTTERGUARDACTION": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-GUTTERGUARDACTION",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Gutter Guards Quality on the 'New Gutters' screen.",
				"english": "Gutter Guard Action",
				"spanish": "Acción de protección de canalones"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-GUTTERGUARDSLF": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-GUTTERGUARDSLF",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Are gutters and downspouts painted on the 'New Gutters' screen.",
				"english": "Gutter Guards LF",
				"spanish": "Protectores de canalón LF"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-GUTTERGUARDSQUALITY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-GUTTERGUARDSQUALITY",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located above the \"Standard\" text of the Gutter Guards Quality on the 'New Gutters' screen.",
				"english": "Gutter Guards Quality",
				"spanish": "Calidad de protectores de canalones"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-GUTTERMATERIALTYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-GUTTERMATERIALTYPE",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Gutter Size on the 'New Gutters' screen.",
				"english": "Gutter Material Type",
				"spanish": "Tipo de material de canalón"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-GUTTERSIZE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-GUTTERSIZE",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Elevation Eaves on the 'New Gutters' screen.",
				"english": "Gutter Size",
				"spanish": "Tamaño de la canaleta"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-MITERSQUANTITY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-MITERSQUANTITY",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the B-Turns Quantity on the 'New Gutters' screen.",
				"english": "Miters Quantity",
				"spanish": "Cantidad de metros"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-TIP-UPSQUANTITY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-TIP-UPSQUANTITY",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Miters Quantity on the 'New Gutters' screen.",
				"english": "Tip-Ups Quantity",
				"spanish": "Cantidad de Tip-Ups"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-TOPGUTTERS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-LABEL-TOPGUTTERS",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "LABEL",
				"description": "This is located at the top most part of the 'Gutters' screen.",
				"english": "Gutters",
				"spanish": "Canalones"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT -HOWMANY4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT -HOWMANY4",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" text of the B-Turns Quantity on the 'New Gutters' screen.",
				"english": "Please input how many B-Turns:",
				"spanish": "Por favor, ingrese cuántos B-Turns:"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-ALUMINUM": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-ALUMINUM",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located below the \"Gutter Material Type\" label of the 'New Gutters' screen.",
				"english": "Aluminum",
				"spanish": "Aluminio"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-DETACHANDRESET": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-DETACHANDRESET",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located beside the \"Replace\" text of the Gutter Guard Action on the 'New Gutters' screen.",
				"english": "Detach and Reset",
				"spanish": "Desconectar y reiniciar"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-GALVANIZED": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-GALVANIZED",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located beside the \"Aluminum\" text of the Gutter Material Type on the 'New Gutters' screen.",
				"english": "Galvanized",
				"spanish": "Galvanizado"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-HIGHGRADE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-HIGHGRADE",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located beside the \"Standard\" text of the Gutter Guards Quality on the 'New Gutters' screen.",
				"english": "High Grade",
				"spanish": "Alta Calidad"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-HOWMANY1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-HOWMANY1",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" text on the 'New Gutters' screen.",
				"english": "Please input how many gutters:",
				"spanish": "Por favor, ingrese cuántos canalones:"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-HOWMANY2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-HOWMANY2",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" text of the Downspouts LF on the 'New Gutters' screen.",
				"english": "Please input how many gutters:",
				"spanish": "Por favor, ingrese cuántos canalones:"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-HOWMANY3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-HOWMANY3",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" text of the A-Turns Quantity on the 'New Gutters' screen.",
				"english": "Please input how many A-Turns:",
				"spanish": "Por favor, ingrese cuántas vueltas A:"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-NO": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-NO",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located below the \"Are gutters and downspouts painted\" label of the 'New Gutters' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-OVERSIZED": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-OVERSIZED",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located below the '5\"' text of the Gutter Size on the 'New Gutters' screen.",
				"english": "Oversized",
				"spanish": "Sobredimensionado"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-PLASTIC": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-PLASTIC",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located below the \"Aluminum\" text of the Gutter Material Type on the 'New Gutters' screen.",
				"english": "Plastic",
				"spanish": "Plástico"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-PREMIUMGRADE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-PREMIUMGRADE",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located below the \"Standard\" text of the Gutter Guards Quality on the 'New Gutters' screen.",
				"english": "Premium Grade",
				"spanish": "Grado Premium"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-REPLACE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-REPLACE",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located below the \"Gutter Guard Action\" label of the 'New Gutters' screen.",
				"english": "Replace",
				"spanish": "Reemplazar"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-STANDARD": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-STANDARD",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located below the \"Gutter Guards Quality\" label of the 'New Gutters' screen.",
				"english": "Standard",
				"spanish": "Estándar"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-YES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXT-YES",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the Are gutters and downspouts painted on the 'New Gutters' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXTRIGHT-HIGHGRADE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXTRIGHT-HIGHGRADE",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located beside the \"Standard\" text of the Gutter Guards Quality on the 'New Gutters' screen.",
				"english": "High Grade",
				"spanish": "Alta Calidad"
			},
			"INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXTRIGHT-YES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWGUTTER-TEXTRIGHT-YES",
				"module": "PROPERTIES",
				"area": "NEWGUTTER",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the Are gutters and downspouts painted on the 'New Gutters' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDNOTE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDNOTE1",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Windows Size on the 'New Window' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDNOTE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDNOTE2",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Window Frame Material on the 'New Window' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDNOTE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDNOTE3",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Window Type on the 'New Window' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDNOTE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDNOTE4",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Mullions on the 'New Window' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDPHOTO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDPHOTO1",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located below the \"Width in inches\" in line text of the Windows Size on the 'New Window' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDPHOTO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDPHOTO2",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located below the \"Aluminum\" text of the Window Frame Material on the 'New Window' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDPHOTO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDPHOTO3",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located below the \"Storm Window\" text of the Window Type on the 'New Window' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDPHOTO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDPHOTO4",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located above the \"Low e glass\" label of the 'New Window' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVIDEO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVIDEO1",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Windows Size on the 'New Window' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVIDEO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVIDEO2",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Window Frame Material on the 'New Window' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVIDEO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVIDEO3",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Window Type on the 'New Window' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVIDEO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVIDEO4",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Mullions on the 'New Window' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVOICE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVOICE1",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Windows Size on the 'New Window' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVOICE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVOICE2",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Window Frame Material on the 'New Window' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVOICE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVOICE3",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Window Type on the 'New Window' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVOICE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-ADDVOICE4",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Mullions on the 'New Window' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-SAVE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-BUTTON-SAVE",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "BUTTON",
				"description": "This is located beside the \"Front LR Bay\" label of the Windows on the 'New Window' screen.",
				"english": "Save",
				"spanish": "Guardar"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-INLINETEXT-WINDOWNAME": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-INLINETEXT-WINDOWNAME",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "INLINETEXT",
				"description": "This is located below the \"Windows\" label of the 'New Window' screen.",
				"english": "Window Name",
				"spanish": "Nombre de la ventana"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-FRONTLRBAY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-FRONTLRBAY",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "LABEL",
				"description": "This is located below the \"Windows\" label of the 'New Window' screen.",
				"english": "Front LR Bay",
				"spanish": "Bahía delantera izquierda"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-LOWEGLASS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-LOWEGLASS",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Mullions on the 'New Window' screen.",
				"english": "Low e glass?",
				"spanish": "¿Vidrio de baja emisividad?"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-MULLIONS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-MULLIONS",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Window Type on the 'New Window' screen.",
				"english": "Mullions:",
				"spanish": "Molduras verticales"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-WINDOWFRAMEMATERIAL": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-WINDOWFRAMEMATERIAL",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Windows Size on the 'New Window' screen.",
				"english": "Window Frame Material:",
				"spanish": "Material del marco de la ventana"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-WINDOWS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-WINDOWS",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "LABEL",
				"description": "This is located at the top most part of the 'New Window' screen.",
				"english": "Windows",
				"spanish": "Ventanas"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-WINDOWSIZE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-WINDOWSIZE",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "LABEL",
				"description": "This is located below the \"Front LR Bay\" label of the Windows on the 'New Window' screen.",
				"english": "Window Size:",
				"spanish": "Tamaño de la ventana:"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-WINDOWTYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-LABEL-WINDOWTYPE",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Window Frame Material on the 'New Window' screen.",
				"english": "Window Type:",
				"spanish": "Tipo de ventana:"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-ALUMINUM": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-ALUMINUM",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Wood\" text of the Window Frame Material on the 'New Window' screen.",
				"english": "Aluminum",
				"spanish": "Aluminio"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-AWNING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-AWNING",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located beside the \"Double Hung\" text of the Window Type on the 'New Window' screen.",
				"english": "Awning",
				"spanish": "Toldo"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-CASEMENT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-CASEMENT",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Window Type\" label of the 'New Window' screen.",
				"english": "Casement",
				"spanish": "Ventana batiente"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-DOUBLEHUNG": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-DOUBLEHUNG",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Casement\" text of the Window Type on the 'New Window' screen.",
				"english": "Double Hung",
				"spanish": "Doble colgado"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-DOYOUHAVE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-DOYOUHAVE",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Low e glass\" label of the 'New Window' screen.",
				"english": "Do you have any Low e glass?",
				"spanish": "¿Tienes algún vidrio de baja emisividad?"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-FIBERGLASS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-FIBERGLASS",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located beside the \"Aluminum\" text of the Window Frame Material on the 'New Window' screen.",
				"english": "Fiberglass",
				"spanish": "Fibra de vidrio"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-GARDEN": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-GARDEN",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located beside the \"Oval\" text of the Window Type on the 'New Window' screen.",
				"english": "Garden",
				"spanish": "Jardín"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-HALFROUND": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-HALFROUND",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located beside the \"Hopper/Transom\" text of the Window Type on the 'New Window' screen.",
				"english": "Half Round",
				"spanish": "Media vuelta"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-HEIGHT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-HEIGHT",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Windows Size\" label of the 'New Window' screen.",
				"english": "Height in inches:",
				"spanish": "Altura en pulgadas:"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-HOPPERTRANSOM": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-HOPPERTRANSOM",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Oval\" text of the Window Type on the 'New Window' screen.",
				"english": "Hopper/Transom",
				"spanish": "Hopper/Transom"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-HORIZONTALSLIDING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-HORIZONTALSLIDING",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located beside the \"Picture/ Fixed\" text of the Window Type on the 'New Window' screen.",
				"english": "Horizontal Sliding",
				"spanish": "Deslizamiento horizontal"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-HOWMANYMULLIONS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-HOWMANYMULLIONS",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Mullions\" label of the 'New Window' screen.",
				"english": "How many mullions",
				"spanish": "¿Cuántos montantes?"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-INPUTHOWMANY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-INPUTHOWMANY",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" text of the Mullions on the 'New Window' screen.",
				"english": "Please input how many mullions:",
				"spanish": "Por favor, ingrese cuántos montantes:"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-JALOUSIE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-JALOUSIE",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Hopper/Transom\" text of the Window Type on the 'New Window' screen.",
				"english": "Jalousie",
				"spanish": "Celos"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-NO": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-NO",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Do you have any Low e glass\" in line text of the Low e glass on the 'New Window' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-OVAL": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-OVAL",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Picture/ Fixed\" text of the Window Type on the 'New Window' screen.",
				"english": "Oval",
				"spanish": "Óvalo"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-PICTUREFIXED": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-PICTUREFIXED",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Double Hung\" text of the Window Type on the 'New Window' screen.",
				"english": "Picture/Fixed",
				"spanish": "Imagen/Fijo"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-ROUNDOCTAGON": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-ROUNDOCTAGON",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located beside the \"Jalousie\" text of the Window Type on the 'New Window' screen.",
				"english": "Round/Octagon",
				"spanish": "Redondo/Octágono"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-SINGLEHUNG": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-SINGLEHUNG",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located beside the \"Casement\" text of the Window Type on the 'New Window' screen.",
				"english": "Single Hung",
				"spanish": "Ventana de guillotina simple"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-STORMWINDOW": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-STORMWINDOW",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Jalousie\" text of the Window Type on the 'New Window' screen.",
				"english": "Storm Window",
				"spanish": "Ventana de tormenta"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-VINYL": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-VINYL",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located beside the \"Wood\" text of the Window Frame Material on the 'New Window' screen.",
				"english": "Vinyl",
				"spanish": "Vinilo"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-WIDTH": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-WIDTH",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Height in inches\" in line text of the Windows Size on the 'New Window' screen.",
				"english": "Width in inches:",
				"spanish": "Ancho en pulgadas:"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-WOOD": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-WOOD",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located below the \"Window Frame Material\" label of the 'New Window' screen.",
				"english": "Wood",
				"spanish": "Madera"
			},
			"INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-YES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-NEWWINDOW-TEXT-YES",
				"module": "PROPERTIES",
				"area": "NEWWINDOW",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the Low e glass on the 'New Window' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDNOTE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDNOTE1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of the 'Roofing Material Type' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDNOTE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDNOTE2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Number of Shingle Layers on the 'Roofing Material Type' screen..",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDNOTE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDNOTE3",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDNOTE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDNOTE4",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the \"Is Rolled Roofing or Modified Bitumen Existing\" on the 'Roofing Material Type' screen..",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDPHOTO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDPHOTO1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located below the \"Rubber\" text of the 'Roofing Material Type' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDPHOTO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDPHOTO2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located above the \"New Shingle Type:\" label of the 'Roofing Material Type' screen..",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDPHOTO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDPHOTO3",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located below the \"Stone Coated Steel\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDPHOTO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDPHOTO4",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text of the \"Is Rolled Roofing or Modified Bitumen Existing\" on the 'Roofing Material Type' screen..",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDVIDEO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDVIDEO1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the 'Roofing Material Type' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDVOICE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDVOICE1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the 'Roofing Material Type' screen..",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDVOICE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDVOICE2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Number of Shingle Layers on the 'Roofing Material Type' screen..",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDVOICE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDVOICE3",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDVOICE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-ADDVOICE4",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the \"Is Rolled Roofing or Modified Bitumen Existing\" on the 'Roofing Material Type' screen..",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-BACK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-BACK",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located below the \"Add Photo\" button of the \"Is Rolled Roofing or Modified Bitumen Existing\" on the 'Roofing Material Type' screen..",
				"english": "Back",
				"spanish": "Espalda"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-NEXT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-BUTTON-NEXT",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "BUTTON",
				"description": "This is located beside the \"Back\" button on the 'Roofing Material Type' screen..",
				"english": "Next",
				"spanish": "Siguiente"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-LABEL-NEWSHINGLETYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-LABEL-NEWSHINGLETYPE",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Number of Shingle Layers on the 'Roofing Material Type' screen..",
				"english": "New Shingle Type:",
				"spanish": "Nuevo tipo de teja:"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-LABEL-ROLLEDROOFING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-LABEL-ROLLEDROOFING",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Is Rolled Roofing or Modified Bitumen Existing?",
				"spanish": "¿Existe techo enrollado o betún modificado?"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-LABEL-ROOFINGMATERIALTYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-LABEL-ROOFINGMATERIALTYPE",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Roofing Material Type' screen.",
				"english": "Roof | Roofing Material Type",
				"spanish": "Tejado | Tipo de material para tejado"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-LABEL-SHINGLE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-LABEL-SHINGLE",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "LABEL",
				"description": "This is located below the stepper widgets of the 'Roofing Material Type' screen.",
				"english": "Existing Shingle Material Type:",
				"spanish": "Tipo de material de techo existente:"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-LABEL-SHINGLELAYERS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-LABEL-SHINGLELAYERS",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the 'Roofing Material Type' screen..",
				"english": "Number of Shingle Layers:",
				"spanish": "Número de capas de tejas:"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-3TAB1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-3TAB1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"T-Lock\" text of the 'Roofing Material Type' screen.",
				"english": "3-Tab",
				"spanish": "3-Tab"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-3TAB2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-3TAB2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"New Shingles Type\" label on the 'Roofing Material Type' screen..",
				"english": "3-Tab",
				"spanish": "3-Tab"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-FOAM1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-FOAM1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Rubber\" text of the 'Roofing Material Type' screen..",
				"english": "Foam",
				"spanish": "Espuma"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-FOAM2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-FOAM2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Stone Coated Steel\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Foam",
				"spanish": "Espuma"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-HALFINCHWOODSHAKE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-HALFINCHWOODSHAKE1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Stone Coated Steel\" text of the 'Roofing Material Type' screen..",
				"english": "1/2\" Wood Shake",
				"spanish": "Teja de madera de 1/2 pulgada"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-HALFINCHWOODSHAKE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-HALFINCHWOODSHAKE2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Slate\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "1/2\" Wood Shake",
				"spanish": "Teja de madera de 1/2 pulgada"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-HOWMANYSHINGLES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-HOWMANYSHINGLES",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" text of the 'Roofing Material Type' screen..",
				"english": "Please input how many Shingle Layers:",
				"spanish": "Por favor, ingrese cuántas capas de tejas:"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-LAMINATE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-LAMINATE1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"T-Lock\" text of the 'Roofing Material Type' screen.",
				"english": "Laminate",
				"spanish": "Laminado"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-LAMINATE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-LAMINATE2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"3-Tab\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Laminate",
				"spanish": "Laminado"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-LAMINATEDELUXEGRADE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-LAMINATEDELUXEGRADE1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Laminate\" text of the 'Roofing Material Type' screen.",
				"english": "Laminate (Deluxe Grade)",
				"spanish": "Laminado (Grado Deluxe)"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-LAMINATEDELUXEGRADE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-LAMINATEDELUXEGRADE2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"3-Tab\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Laminate (Deluxe Grade)",
				"spanish": "Laminado (Grado Deluxe)"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-LAMINATEIMPACTRESISTANT1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-LAMINATEIMPACTRESISTANT1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Laminate\" text of the 'Roofing Material Type' screen.",
				"english": "Laminate Impact Resistant",
				"spanish": "Laminado resistente al impacto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-LAMINATEIMPACTRESISTANT2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-LAMINATEIMPACTRESISTANT2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Laminate (Deluxe Grade)\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Laminate Impact Resistant",
				"spanish": "Laminado resistente al impacto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-MASONITE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-MASONITE",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Tile\" text of the 'Roofing Material Type' screen..",
				"english": "Masonite",
				"spanish": "Masonita"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-METAL1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-METAL1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"3/4\" Wood shake\" text of the 'Roofing Material Type' screen..",
				"english": "Metal",
				"spanish": "Metal"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-METAL2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-METAL2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"3/4\" Wood shake\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Metal",
				"spanish": "Metal"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-MODIFIEDBITUMEN1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-MODIFIEDBITUMEN1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Roll Roofing\" text of the 'Roofing Material Type' screen..",
				"english": "Modified Bitumen",
				"spanish": "Bitumen modificado"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-MODIFIEDBITUMEN2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-MODIFIEDBITUMEN2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Roll Roofing\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Modified Bitumen",
				"spanish": "Bitumen modificado"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-NO": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-NO",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Rolled Roofing\" label on the 'Roofing Material Type' screen..",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-QUARTERINCHWOODSHAKE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-QUARTERINCHWOODSHAKE1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Stone Coated Steel\" text of the 'Roofing Material Type' screen..",
				"english": "3/4\" Wood shake",
				"spanish": "Teja de madera de 3/4 pulgadas"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-QUARTERINCHWOODSHAKE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-QUARTERINCHWOODSHAKE2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Slate\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "3/4\" Wood shake",
				"spanish": "Teja de madera de 3/4 pulgadas"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-ROLLROOFING1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-ROLLROOFING1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"3/4\" Wood shake\" text of the 'Roofing Material Type' screen..",
				"english": "Roll Roofing",
				"spanish": "Techado de rollo"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-ROLLROOFING2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-ROLLROOFING2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"3/4\" Wood shake\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Roll Roofing",
				"spanish": "Techado de rollo"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-RUBBER1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-RUBBER1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Tile\" text of the 'Roofing Material Type' screen..",
				"english": "Rubber",
				"spanish": "Goma"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-RUBBER2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-RUBBER2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Tile\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Rubber",
				"spanish": "Goma"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SHAKELOOK1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SHAKELOOK1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Laminate (Deluxe Grade)\" text of the 'Roofing Material Type' screen.",
				"english": "Shake Look",
				"spanish": "Sacudir Mirar"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SHAKELOOK2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SHAKELOOK2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Laminate (Deluxe Grade)\" text on the 'Roofing Material Type' screen..",
				"english": "Shake Look",
				"spanish": "Sacudir Mirar"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SHAKELOOKPREMIUMGRADE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SHAKELOOKPREMIUMGRADE1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Laminate Impact Resistant\" text of the 'Roofing Material Type' screen.",
				"english": "Shake Look (Premium Grade)",
				"spanish": "Batido Mirada (Grado Premium)"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SHAKELOOKPREMIUMGRADE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SHAKELOOKPREMIUMGRADE2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Shake Look\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Shake Look (Premium Grade)",
				"spanish": "Batido Mirada (Grado Premium)"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SLATE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SLATE1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Slate Look (Premium Grade)\" text of the 'Roofing Material Type' screen.",
				"english": "Slate",
				"spanish": "Pizarra"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SLATE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SLATE2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Slate Look\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Slate",
				"spanish": "Pizarra"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SLATELOOK1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SLATELOOK1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Shake Look (Premium Grade)\" text of the 'Roofing Material Type' screen.",
				"english": "Slate Look",
				"spanish": "Aspecto de pizarra"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SLATELOOK2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SLATELOOK2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Shake Look\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Slate Look",
				"spanish": "Aspecto de pizarra"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SLATELOOKPREMIUMGRADE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SLATELOOKPREMIUMGRADE1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Shake Look (Premium Grade)\" text of the 'Roofing Material Type' screen.",
				"english": "Slate Look (Premium Grade)",
				"spanish": "Aspecto de pizarra (Grado premium)"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SLATELOOKPREMIUMGRADE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-SLATELOOKPREMIUMGRADE2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"Slate Look\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Slate look (Premium Grade)",
				"spanish": "Aspecto de pizarra (Grado Premium)"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-STONECOATEDSTEEL1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-STONECOATEDSTEEL1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Slate Look (Premium Grade)\" text of the 'Roofing Material Type' screen..",
				"english": "Stone Coated Steel",
				"spanish": "Acero recubierto de piedra"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-STONECOATEDSTEEL2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-STONECOATEDSTEEL2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Tile\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Stone Coated Steel",
				"spanish": "Acero recubierto de piedra"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-TILE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-TILE1",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Roll Roofing\" text of the 'Roofing Material Type' screen..",
				"english": "Tile",
				"spanish": "Azulejo"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-TILE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-TILE2",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Roll Roofing\" text of the New Shingles Type on the 'Roofing Material Type' screen..",
				"english": "Tile",
				"spanish": "Azulejo"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-TLOCK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-TLOCK",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located below the \"Shingles\" label of the 'Roofing Material Type' screen.",
				"english": "T-Lock",
				"spanish": "T-Lock"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-YES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFINGMATERIALTYPE-TEXT-YES",
				"module": "PROPERTIES",
				"area": "ROOFINGMATERIALTYPE",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text on the 'Roofing Material Type' screen..",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE1",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE10": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE10",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of How many Courses on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE11": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE11",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of Soffit Depth (inches) on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE12": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE12",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of Existing Valley Type on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE13": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE13",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of Valley Install Type on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE14": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE14",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of Headwall Action on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE15": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE15",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of Sidewall Flashing on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE16": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE16",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of Kickout Diverters on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE17": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE17",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of Rain Diverters on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE2",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE3",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE4",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE5",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of Existing Ridge Type on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE6",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of Starter Exisiting at the Rakes on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE7",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of Existing Underlayment on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE8",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of New Underlayment Type on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE9": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDNOTE9",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of Ice & Water Shield Existing at Eaves on the 'Roof Specs' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO1",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO10": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO10",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located above the \"Soffit Depth\" label on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO11": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO11",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located above the \"Existing Valley Type\" label on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO12": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO12",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located below the \"Ice & Water Shield\" text on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO13": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO13",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located below the \"Ice & Water Shield\" text on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO14": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO14",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located below the \"Install New\" text on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO15": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO15",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text of the Sidewall Flashing on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO16": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO16",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located above the \"Rain Diverters\" label of the Kickout Diverters on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO17": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO17",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located above the \"LF of Brick\" label on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO2",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO3",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO4",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO5",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located below the \"Shake\" text on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO6",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text of Starter Exisiting at the Rakes on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO7",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located below the \"Synthetic\" text of Existing Underlayment on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO8",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located below the \"Synthetic\" text of New Underlayment Type on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO9": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDPHOTO9",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located below the \"No\" text of Ice & Water Shield Existing at Eaves on the 'Roof Specs' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO1",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar Video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO10": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO10",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of How many Courses on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO11": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO11",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of Soffit Depth (inches) on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO13": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO13",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of Valley Install Type on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO14": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO14",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of Headwall Action on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO15": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO15",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of Sidewall Flashing on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO16": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO16",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of Kickout Diverters on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO17": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO17",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of Rain Diverters on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO2",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO3",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO4",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO5",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of Existing Ridge Type on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO6",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of Starter Exisiting at the Rakes on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO7",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of Existing Underlayment on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO8",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of New Underlayment Type on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO9": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVIDEO9",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of Ice & Water Shield Existing at Eaves on the 'Roof Specs' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE1",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE10": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE10",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of How many Courses on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE11": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE11",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of Soffit Depth (inches) on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE12": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE12",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of Existing Valley Type on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE13": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE13",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of Valley Install Type on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE14": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE14",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of Headwall Action on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE15": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE15",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of Sidewall Flashing on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE16": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE16",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of Kickout Diverters on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE17": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE17",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of Rain Diverters on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE2",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE3",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE4",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE5",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of Existing Ridge Type on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE6",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of Starter Exisiting at the Rakes on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE7",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of Existing Underlayment on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE8",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of New Underlayment Type on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE9": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-BUTTON-ADDVOICE9",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of Ice & Water Shield Existing at Eaves on the 'Roof Specs' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-COURSES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-COURSES",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of Ice & Water Shield Existing at Eaves on the 'Roof Specs' screen.",
				"english": "How many Courses?",
				"spanish": "¿Cuántos cursos?"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-EAVEFLASHINGEXISTING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-EAVEFLASHINGEXISTING",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the stepper widgets of the 'Roof Specs' screen.",
				"english": "Eave Flashing Existing?",
				"spanish": "¿Existe el revestimiento del alero?"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-EXISTINGRIDGETYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-EXISTINGRIDGETYPE",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of Rake Flashing on the 'Roof Specs' screen.",
				"english": "Existing Ridge Type",
				"spanish": "Tipo de Cresta Existente"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-EXISTINGUNDERLAYMENT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-EXISTINGUNDERLAYMENT",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of Starter Existing at the Rakes on the 'Roof Specs' screen.",
				"english": "Existing Underlayment",
				"spanish": "Subcapa existente"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-EXISTINGVALLEYTYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-EXISTINGVALLEYTYPE",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of Soffit Depth (inches) on the 'Roof Specs' screen.",
				"english": "Existing Valley Type",
				"spanish": "Tipo de Valle Existente"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-HEADWALLACTION": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-HEADWALLACTION",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of Valley Install Type on the 'Roof Specs' screen.",
				"english": "Headwall Action",
				"spanish": "Acción de la cabecera"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-ICEWATER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-ICEWATER",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of New Underlayment Type on the 'Roof Specs' screen.",
				"english": "Ice & Water Shield Existing at Eaves?",
				"spanish": "¿Hay una barrera de hielo y agua existente en los aleros?"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-KICKOUTDIVERTERS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-KICKOUTDIVERTERS",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of Sidewall Flashing on the 'Roof Specs' screen.",
				"english": "Kickout Diverters",
				"spanish": "Desviadores de expulsión"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-LFOFBRICK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-LFOFBRICK",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Rain Diverters on the 'Roof Specs' screen.",
				"english": "LF of Brick/Masonry sidewall or headwall",
				"spanish": "LF de pared lateral o de cabeza de ladrillo/mampostería"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-NEWUNDERLAYMENTTYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-NEWUNDERLAYMENTTYPE",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of Existing Underlayment on the 'Roof Specs' screen.",
				"english": "New Underlayment Type",
				"spanish": "Nuevo Tipo de Subpiso"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-RAINDIVERTERS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-RAINDIVERTERS",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Kickout Diverters on the 'Roof Specs' screen.",
				"english": "Rain Diverters",
				"spanish": "Desviadores de lluvia"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-RAKEFLASHING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-RAKEFLASHING",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Speciality Starter on the 'Roof Specs' screen.",
				"english": "Rake Flashing Existing?",
				"spanish": "¿Rastrillo parpadeante existente?"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-ROOFSPECS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-ROOFSPECS",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Roof Specs' screen.",
				"english": "Roof | Roof Specs",
				"spanish": ""
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-SIDEWALL": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-SIDEWALL",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of Headwall Action on the 'Roof Specs' screen.",
				"english": "Is Sidewall Flashing Existing?",
				"spanish": "¿Existe el revestimiento de la pared lateral?"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-SOFFITDEPTH": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-SOFFITDEPTH",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of How many Courses on the 'Roof Specs' screen.",
				"english": "Soffit Depth (inches)",
				"spanish": "Profundidad del alero (pulgadas)"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-SPECIALITY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-SPECIALITY",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button on the 'Roof Specs' screen.",
				"english": "Speciality Starter Existing?",
				"spanish": "¿Especialidad de inicio existente?"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-STARTER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-STARTER",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button on the 'Roof Specs' screen.",
				"english": "Starter Existing at the Eaves?",
				"spanish": "¿Hay un arrancador existente en el alero?"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-STARTEREXISTING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-STARTEREXISTING",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of Existing Ridge Type on the 'Roof Specs' screen.",
				"english": "Starter Existing at the Rakes?",
				"spanish": "¿Hay un arrancador existente en los rastrillos?"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-VALLEYINSTALLTYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-LABEL-VALLEYINSTALLTYPE",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of Existing Valley Type on the 'Roof Specs' screen.",
				"english": "Valley Install Type",
				"spanish": "Tipo de instalación del valle"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-ALUMINUM": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-ALUMINUM",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Low Profile\" text on the 'Roof Specs' screen.",
				"english": "Aluminum",
				"spanish": "Aluminio"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-DETACH": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-DETACH",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"Install New\" text on the 'Roof Specs' screen.",
				"english": "Detach & Reset",
				"spanish": "Desconectar y reiniciar"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-HIGHPROFILE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-HIGHPROFILE",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"Low Profile\" text on the 'Roof Specs' screen.",
				"english": "High Profile",
				"spanish": "Alto Perfil"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-HOWMANYKICKOUTDIVERTERS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-HOWMANYKICKOUTDIVERTERS",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" text of Kickout Diverters on the 'Roof Specs' screen.",
				"english": "Please input how many Kickout Diverters:",
				"spanish": "Por favor ingrese cuántos desviadores de expulsión:"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-HOWMANYRAINDIVERTERS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-HOWMANYRAINDIVERTERS",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" text of Rain Diverters on the 'Roof Specs' screen.",
				"english": "Please input how many Rain Diverters:",
				"spanish": "Por favor, ingrese cuántos desviadores de lluvia:"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-HOWMANYSIDEWALL": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-HOWMANYSIDEWALL",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" text of LF of Brick on the 'Roof Specs' screen.",
				"english": "Please input how many sidewall or headwall:",
				"spanish": "Por favor, ingrese cuántos muros laterales o muros de cabeza:"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-HOWMUCH": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-HOWMUCH",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" text of Soffit Depth (inches) on the 'Roof Specs' screen.",
				"english": "Please input how much depth:",
				"spanish": "Por favor, ingrese cuánta profundidad:"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-ICEWATERSHIELD1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-ICEWATERSHIELD1",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"No Valley Material Exists\" text on the 'Roof Specs' screen.",
				"english": "Ice & Water Shield",
				"spanish": "Escudo de hielo y agua"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-ICEWATERSHIELD2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-ICEWATERSHIELD2",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"No Valley Material Exists\" text on the 'Roof Specs' screen.",
				"english": "Ice & Water Shield",
				"spanish": "Escudo de hielo y agua"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-INSTALLNEW": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-INSTALLNEW",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Headwall Action\" label on the 'Roof Specs' screen.",
				"english": "Install New",
				"spanish": "Instalar Nuevo"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-LOWPROFILE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-LOWPROFILE",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Existing Ridge Type\" label on the 'Roof Specs' screen.",
				"english": "Low Profile",
				"spanish": "Perfil bajo"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-METAL1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-METAL1",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"No Valley Material Exists\" text on the 'Roof Specs' screen.",
				"english": "Metal",
				"spanish": "Metal"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-METAL2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-METAL2",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"No Valley Material Exists\" text on the 'Roof Specs' screen.",
				"english": "Metal",
				"spanish": "Metal"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NEWROLLEDROOFING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NEWROLLEDROOFING",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"30#\" text of New Underlayment Type on the 'Roof Specs' screen.",
				"english": "Rolled Roofing",
				"spanish": "Techado en rollo"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO1",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Eave Flashing Existing\" label on the 'Roof Specs' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO2",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Starter\" label on the 'Roof Specs' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO3",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Speciality\" label on the 'Roof Specs' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO4",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Rake Flashing\" label on the 'Roof Specs' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO5",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Starter Existing\" label on the 'Roof Specs' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO6",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Ice & Water\" label on the 'Roof Specs' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NO7",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Sidewall\" label on the 'Roof Specs' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NOVALLEYMATERIALEXISTS1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NOVALLEYMATERIALEXISTS1",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Existing Valley Type\" label on the 'Roof Specs' screen.",
				"english": "No Valley Material Exists",
				"spanish": "No existe material del valle."
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NOVALLEYMATERIALEXISTS2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-NOVALLEYMATERIALEXISTS2",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Valley Install Type\" label on the 'Roof Specs' screen.",
				"english": "No Valley Material Exists",
				"spanish": "No existe material del valle."
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-PLEASEINPUT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-PLEASEINPUT",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" text of How many Courses on the 'Roof Specs' screen.",
				"english": "Please input how many courses:",
				"spanish": "Por favor, ingrese cuántos cursos:"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-ROLLEDROOFING": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-ROLLEDROOFING",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"30#\" text on the 'Roof Specs' screen.",
				"english": "Rolled Roofing",
				"spanish": "Techado en rollo"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-ROLLROOFING1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-ROLLROOFING1",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"Ice & Water Shield\" text on the 'Roof Specs' screen.",
				"english": "Roll Roofing",
				"spanish": "Techado de rollo"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-ROLLROOFING2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-ROLLROOFING2",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"Ice & Water Shield\" text on the 'Roof Specs' screen.",
				"english": "Roll Roofing",
				"spanish": "Techado de rollo"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-SHAKE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-SHAKE",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"Aluminum\" text on the 'Roof Specs' screen.",
				"english": "Shake",
				"spanish": "Batido"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-SYNTHETIC": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-SYNTHETIC",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located below the \"15#\" text on the 'Roof Specs' screen.",
				"english": "Synthetic",
				"spanish": "Sintético"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-TILE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-TILE",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"Aluminum\" text on the 'Roof Specs' screen.",
				"english": "Tile",
				"spanish": "Azulejo"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES1",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text on the 'Roof Specs' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES2",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text on the 'Roof Specs' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES3",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text on the 'Roof Specs' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES4",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text on the 'Roof Specs' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES5",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of Starter Exisiting at the Rakes on the 'Roof Specs' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES6",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of Ice & Water Shield Existing at Eaves on the 'Roof Specs' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-ROOFSPECS-TEXT-YES7",
				"module": "PROPERTIES",
				"area": "ROOFSPECS",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the Sidewall Flashing on the 'Roof Specs' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-BUTTON-COMPLETEFILES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-BUTTON-COMPLETEFILES",
				"module": "PROPERTIES",
				"area": "SCOPESEXPAND",
				"widget": "BUTTON",
				"description": "This is located below the 'Gutters' text on the 'Scopes Expand' screen.",
				"english": "Complete Files",
				"spanish": "Archivos Completos"
			},
			"INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-TEXT-ACCESSORIES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-TEXT-ACCESSORIES",
				"module": "PROPERTIES",
				"area": "SCOPESEXPAND",
				"widget": "TEXT",
				"description": "This is located below the 'Chimneys' text on the 'Scopes Expand' screen.",
				"english": "Accessories",
				"spanish": "Accesorios"
			},
			"INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-TEXT-CHIMNEYS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-TEXT-CHIMNEYS",
				"module": "PROPERTIES",
				"area": "SCOPESEXPAND",
				"widget": "TEXT",
				"description": "This is located below the 'Ventilation' text on the 'Scopes Expand' screen.",
				"english": "Chimneys",
				"spanish": "Chimeneas"
			},
			"INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-TEXT-MATERIALTYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-TEXT-MATERIALTYPE",
				"module": "PROPERTIES",
				"area": "SCOPESEXPAND",
				"widget": "TEXT",
				"description": "This is located below the 'Roof Specs' text on the 'Scopes Expand' screen.",
				"english": "Material Type",
				"spanish": "Tipo de Material"
			},
			"INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-TEXT-ROOFSPECS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-TEXT-ROOFSPECS",
				"module": "PROPERTIES",
				"area": "SCOPESEXPAND",
				"widget": "TEXT",
				"description": "This is located below the 'Roof' text on the 'Scopes Expand' screen.",
				"english": "Roof Specs",
				"spanish": "Especificaciones del Techo"
			},
			"INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-TEXT-SKYLIGHTS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-TEXT-SKYLIGHTS",
				"module": "PROPERTIES",
				"area": "SCOPESEXPAND",
				"widget": "TEXT",
				"description": "This is located below the 'Accessories' text on the 'Scopes Expand' screen.",
				"english": "Skylights",
				"spanish": "Tragaluz"
			},
			"INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-TEXT-VENTILATION": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SCOPESEXPAND-TEXT-VENTILATION",
				"module": "PROPERTIES",
				"area": "SCOPESEXPAND",
				"widget": "TEXT",
				"description": "This is located below the 'Material Type' text on the 'Scopes Expand' screen.",
				"english": "Ventilation",
				"spanish": "Ventilación"
			},
			"INSTR-MOBILE-PROPERTIES-SEARCHBY-LABEL-BACK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SEARCHBY-LABEL-BACK",
				"module": "PROPERTIES",
				"area": "SEARCHBY",
				"widget": "LABEL",
				"description": "This is located at the left top part of the 'Search By' screen.",
				"english": "Back",
				"spanish": "Espalda"
			},
			"INSTR-MOBILE-PROPERTIES-SEARCHBY-LABEL-SEARCHBY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SEARCHBY-LABEL-SEARCHBY",
				"module": "PROPERTIES",
				"area": "SEARCHBY",
				"widget": "LABEL",
				"description": "This is located at the center top part of the 'Search By' screen.",
				"english": "Search By",
				"spanish": "Buscar por"
			},
			"INSTR-MOBILE-PROPERTIES-SEARCHBY-TEXT-OWNERNAME": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SEARCHBY-TEXT-OWNERNAME",
				"module": "PROPERTIES",
				"area": "SEARCHBY",
				"widget": "TEXT",
				"description": "This is located at the left part of the 'Search By' screen below the 'Property Address' text.",
				"english": "Owner Name",
				"spanish": "Nombre del propietario"
			},
			"INSTR-MOBILE-PROPERTIES-SEARCHBY-TEXT-PROPERTYADDRESS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SEARCHBY-TEXT-PROPERTYADDRESS",
				"module": "PROPERTIES",
				"area": "SEARCHBY",
				"widget": "TEXT",
				"description": "This is located at the left part of the 'Search By' screen below the 'Back' label.",
				"english": "Property Address",
				"spanish": "Dirección de la propiedad"
			},
			"INSTR-MOBILE-PROPERTIES-SEARCHFILTER-BUTTON-SHOWRESULTS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SEARCHFILTER-BUTTON-SHOWRESULTS",
				"module": "PROPERTIES",
				"area": "SEARCHFILTER",
				"widget": "BUTTON",
				"description": "This is located at the bottom part of the 'Search Filter' screen.",
				"english": "Show Results",
				"spanish": "Mostrar resultados"
			},
			"INSTR-MOBILE-PROPERTIES-SEARCHFILTER-LABEL-CLOSEDFILES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SEARCHFILTER-LABEL-CLOSEDFILES",
				"module": "PROPERTIES",
				"area": "SEARCHFILTER",
				"widget": "LABEL",
				"description": "This is located at the left part of the 'Search Filter' screen below the 'Sort by' label.",
				"english": "Closed Files",
				"spanish": "Archivos cerrados"
			},
			"INSTR-MOBILE-PROPERTIES-SEARCHFILTER-LABEL-FILTER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SEARCHFILTER-LABEL-FILTER",
				"module": "PROPERTIES",
				"area": "SEARCHFILTER",
				"widget": "LABEL",
				"description": "This is located at the center top part of the 'Search Filter' screen.",
				"english": "Filter",
				"spanish": "Filtro"
			},
			"INSTR-MOBILE-PROPERTIES-SEARCHFILTER-LABEL-RESET": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SEARCHFILTER-LABEL-RESET",
				"module": "PROPERTIES",
				"area": "SEARCHFILTER",
				"widget": "LABEL",
				"description": "This is located at the center top part of the 'Search Filter' screen beside the 'Filter' label.",
				"english": "Reset",
				"spanish": "Restablecer"
			},
			"INSTR-MOBILE-PROPERTIES-SEARCHFILTER-LABEL-SEARCHBY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SEARCHFILTER-LABEL-SEARCHBY",
				"module": "PROPERTIES",
				"area": "SEARCHFILTER",
				"widget": "LABEL",
				"description": "This is located at the left part of the 'Search Filter' screen.",
				"english": "Search by",
				"spanish": "Buscar por"
			},
			"INSTR-MOBILE-PROPERTIES-SEARCHFILTER-LABEL-SORTBY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SEARCHFILTER-LABEL-SORTBY",
				"module": "PROPERTIES",
				"area": "SEARCHFILTER",
				"widget": "LABEL",
				"description": "This is located at the left part of the 'Search Filter' screen below the 'Search by' label.",
				"english": "Sort by",
				"spanish": "Ordenar por"
			},
			"INSTR-MOBILE-PROPERTIES-SEARCHFILTER-TEXT-NEW": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SEARCHFILTER-TEXT-NEW",
				"module": "PROPERTIES",
				"area": "SEARCHFILTER",
				"widget": "TEXT",
				"description": "This is located at the right part of the 'Search Filter' screen below the 'Property Address' text.",
				"english": "New",
				"spanish": "Nuevo"
			},
			"INSTR-MOBILE-PROPERTIES-SEARCHFILTER-TEXT-PROPERTYADDRESS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SEARCHFILTER-TEXT-PROPERTYADDRESS",
				"module": "PROPERTIES",
				"area": "SEARCHFILTER",
				"widget": "TEXT",
				"description": "This is located at the right part of the 'Search Filter' screen below the 'Reset' label.",
				"english": "Property Address",
				"spanish": "Dirección de la propiedad"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDANOTHERSKYLIGHT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDANOTHERSKYLIGHT",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "BUTTON",
				"description": "This is located above the \"Are Solar Tubes Existing\" label on the 'Skylight' screen.",
				"english": "Add Another Skylight",
				"spanish": "Agregar otro tragaluz"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDNOTE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDNOTE1",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Skylight on the 'Skylight' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDNOTE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDNOTE2",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Are Solar Tubes Existing on the 'Skylight' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDPHOTO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDPHOTO1",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "BUTTON",
				"description": "This is located below the \"Reclad\" text of the Skylight on the 'Skylight' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDPHOTO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDPHOTO2",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "BUTTON",
				"description": "This is located below the \"Reclad\" text of the Are Solar Tubes Existing on the 'Skylight' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDVIDEO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDVIDEO1",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Skylight on the 'Skylight' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDVIDEO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDVIDEO2",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Are Solar Tubes Existing on the 'Skylight' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDVOICE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDVOICE1",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Skylight on the 'Skylight' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDVOICE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-ADDVOICE2",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Are Solar Tubes Existing on the 'Skylight' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-BACK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-BACK",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "BUTTON",
				"description": "This is located below the \"Add Photo\" button of the Are Solar Tubes Existing on the 'Skylight' screen.",
				"english": "Back",
				"spanish": "Espalda"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-NEXT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-BUTTON-NEXT",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "BUTTON",
				"description": "This is located beside the \"Back\" button on the 'Skylight' screen.",
				"english": "Next",
				"spanish": "Siguiente"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-LABEL-ACTION1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-LABEL-ACTION1",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "LABEL",
				"description": "This is located above the \"Reflash\" text of the Skylight on the 'Skylight' screen.",
				"english": "Action",
				"spanish": "Acción"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-LABEL-ACTION2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-LABEL-ACTION2",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "LABEL",
				"description": "This is located above the \"Reflash\" text of the Are Solar Tubes Existing on the 'Skylight' screen.",
				"english": "Action",
				"spanish": "Acción"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-LABEL-ROOFSKYLIGHT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-LABEL-ROOFSKYLIGHT",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Skylight' screen",
				"english": "Roof | Skylight",
				"spanish": "Techo | Tragaluz"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-LABEL-SKYLIGHT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-LABEL-SKYLIGHT",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "LABEL",
				"description": "This is located below the stepper widgets of the 'Skylight' screen.",
				"english": "Skylight:",
				"spanish": "Tragaluz"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-LABEL-SOLARTUBES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-LABEL-SOLARTUBES",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "LABEL",
				"description": "This is located below the \"Add Another Skylight\" button on the 'Skylight' screen.",
				"english": "Are Solar Tubes Existing?",
				"spanish": "¿Existen los tubos solares?"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-HOWMANYSKYLIGHTSEXIST": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-HOWMANYSKYLIGHTSEXIST",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "TEXT",
				"description": "This is located below the \"Length in inches\" text of the Skylight on the 'Skylight' screen.",
				"english": "How many skylights exist with these dimensions?",
				"spanish": "¿Cuántas claraboyas existen con estas dimensiones?"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-LENGTH": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-LENGTH",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "TEXT",
				"description": "This is located below the \"Width in inches\" text of the Skylight on the 'Skylight' screen.",
				"english": "Length in inches:",
				"spanish": "Longitud en pulgadas:"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-NO": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-NO",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "TEXT",
				"description": "This is located below the \"Are Solar Tubes Existing\" label on the 'Skylight' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-QUANTITY1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-QUANTITY1",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Skylight on the 'Skylight' screen.",
				"english": "Please input many exist:",
				"spanish": "Por favor, introduce muchos existen."
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-QUANTITY2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-QUANTITY2",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Are Solar Tubes Existing on the 'Skylight' screen.",
				"english": "Please input quantity:",
				"spanish": "Por favor, ingrese la cantidad:"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-RECLAD1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-RECLAD1",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "TEXT",
				"description": "This is located below the \"Reflash\" text of the Skylight on the 'Skylight' screen.",
				"english": "Reclad",
				"spanish": "Revestir"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-RECLAD2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-RECLAD2",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "TEXT",
				"description": "This is located below the \"Reflash\" text of the Are Solar Tubes Existing on the 'Skylight' screen.",
				"english": "Reclad",
				"spanish": "Revestir"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-REFLASH1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-REFLASH1",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "TEXT",
				"description": "This is located below the \"Action\" text of the Skylight on the 'Skylight' screen.",
				"english": "Reflash",
				"spanish": "Reflashear"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-REFLASH2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-REFLASH2",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "TEXT",
				"description": "This is located below the \"Action\" text of the Are Solar Tubes Existing on the 'Skylight' screen.",
				"english": "Reflash",
				"spanish": "Reflashear"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-REPLACE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-REPLACE1",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "TEXT",
				"description": "This is located beside the \"Reflash\" text of the Skylight on the 'Skylight' screen.",
				"english": "Replace",
				"spanish": "Reemplazar"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-REPLACE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-REPLACE2",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "TEXT",
				"description": "This is located beside the \"Reflash\" text of the Are Solar Tubes Existing on the 'Skylight' screen.",
				"english": "Replace",
				"spanish": "Reemplazar"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-WIDTH": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-WIDTH",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "TEXT",
				"description": "This is located below the \"Skylight\" label on the 'Skylight' screen.",
				"english": "Width in inches:",
				"spanish": "Ancho en pulgadas:"
			},
			"INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-YES": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SKYLIGHT-TEXT-YES",
				"module": "PROPERTIES",
				"area": "SKYLIGHT",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" text of the Are Solar Tubes Existing on the 'Skylight' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-SORTBY-LABEL-BACK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SORTBY-LABEL-BACK",
				"module": "PROPERTIES",
				"area": "SORTBY",
				"widget": "LABEL",
				"description": "This is located at the left top part of the 'Sort By' screen.",
				"english": "Back",
				"spanish": "Espalda"
			},
			"INSTR-MOBILE-PROPERTIES-SORTBY-LABEL-SORTBY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SORTBY-LABEL-SORTBY",
				"module": "PROPERTIES",
				"area": "SORTBY",
				"widget": "LABEL",
				"description": "This is located at the center top part of the 'Sort By' screen.",
				"english": "Sort By",
				"spanish": "Ordenar por"
			},
			"INSTR-MOBILE-PROPERTIES-SORTBY-TEXT-ALL": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SORTBY-TEXT-ALL",
				"module": "PROPERTIES",
				"area": "SORTBY",
				"widget": "TEXT",
				"description": "This is located at the left part of the 'Sort By' screen below the 'Back' label.",
				"english": "All",
				"spanish": "Todo"
			},
			"INSTR-MOBILE-PROPERTIES-SORTBY-TEXT-CLOSED": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SORTBY-TEXT-CLOSED",
				"module": "PROPERTIES",
				"area": "SORTBY",
				"widget": "TEXT",
				"description": "This is located at the left part of the 'Sort By' screen below the 'In Progress' text.",
				"english": "Closed",
				"spanish": "Cerrado"
			},
			"INSTR-MOBILE-PROPERTIES-SORTBY-TEXT-INPROGRESS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SORTBY-TEXT-INPROGRESS",
				"module": "PROPERTIES",
				"area": "SORTBY",
				"widget": "TEXT",
				"description": "This is located at the left part of the 'Sort By' screen below the 'New' text.",
				"english": "In Progress",
				"spanish": "En progreso"
			},
			"INSTR-MOBILE-PROPERTIES-SORTBY-TEXT-NEW": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SORTBY-TEXT-NEW",
				"module": "PROPERTIES",
				"area": "SORTBY",
				"widget": "TEXT",
				"description": "This is located at the left part of the 'Sort By' screen below the 'All' text.",
				"english": "New",
				"spanish": "Nuevo"
			},
			"INSTR-MOBILE-PROPERTIES-SORTBY-TEXT-REJECTED": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-SORTBY-TEXT-REJECTED",
				"module": "PROPERTIES",
				"area": "SORTBY",
				"widget": "TEXT",
				"description": "This is located at the left part of the 'Sort By' screen below the 'Closed' text.",
				"english": "Rejected",
				"spanish": "Rechazado"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE1",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" of the Turtle Vents on the 'Ventilation' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE10": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE10",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" of the Furnace Vent on the 'Ventilation' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE11": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE11",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" button of the Additional Vents Needed on the 'Ventilation' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE2",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" of the Turbine Vent on the 'Ventilation' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE3",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" of the Power Vent on the 'Ventilation' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE4",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" of the Ridge Vent LF on the 'Ventilation' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE5",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" of the Off Ridge Vents on the 'Ventilation' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE6",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" of the Pipe Jacks Less than 4\" in Diameter on the 'Ventilation' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE7",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" of the Pipe Jacks Greater than 4\" in Diameter on the 'Ventilation' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE8",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" of the Exhaust Caps up to 4\" on the 'Ventilation' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE9": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDNOTE9",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Video\" of the Exhaust Caps 6\" to 8\" on the 'Ventilation' screen.",
				"english": "Add Note",
				"spanish": "Agregar nota"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO1",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located above the \"Turbine Vent\" on the 'Ventilation' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO10": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO10",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located above the \"Additional Vents Needed\" on the 'Ventilation' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO11": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO11",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located above the \"Back\" button on the 'Ventilation' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO2",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located above the \"Power Vent\" on the 'Ventilation' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO3",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located above the \"Ridge Vent LF\" on the 'Ventilation' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO4",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located above the \"Off Ridge Vents\" on the 'Ventilation' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO5",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located above the \"Pipe Jacks\" on the 'Ventilation' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO6",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located above the \"Pipe Jacks Greater than 4\" in Diameter\" on the 'Ventilation' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO7",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located above the \"Exhaust Caps up to 4\" on the 'Ventilation' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO8",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located above the \"Exhaust Caps 6\" to 8\" on the 'Ventilation' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO9": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDPHOTO9",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located above the \"Furnace Vent\" on the 'Ventilation' screen.",
				"english": "Add Photo",
				"spanish": "Agregar foto"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO1",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" of the Turtle Vents on the 'Ventilation' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO10": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO10",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" of the Furnace Vent on the 'Ventilation' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO11": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO11",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" button of the Additional Vents Needed on the 'Ventilation' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO2",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" of the Turbine Vent on the 'Ventilation' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO3",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" of the Power Vent on the 'Ventilation' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO4",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" of the Ridge Vent LF on the 'Ventilation' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO5",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" of the Off Ridge Vents on the 'Ventilation' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO6",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" of the Pipe Jacks Less than 4\" in Diameter on the 'Ventilation' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO7",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" of the Pipe Jacks Greater than 4\" in Diameter on the 'Ventilation' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO9": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVIDEO9",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Photo\" of the Exhaust Caps 6\" to 8\" on the 'Ventilation' screen.",
				"english": "Add Video",
				"spanish": "Agregar video"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE1",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" of the Turtle Vents on the 'Ventilation' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE10": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE10",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Furnace Vent on the 'Ventilation' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE11": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE11",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" button of the Additional Vents Needed on the 'Ventilation' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE2",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" of the Turbine Vent on the 'Ventilation' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE3": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE3",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" of the Power Vent on the 'Ventilation' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE4",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" of the Off Ridge Vents on the 'Ventilation' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE5": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE5",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" of the Off Ridge Vents on the 'Ventilation' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE6": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE6",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" of the Pipe Jacks Less than 4\" in Diameter on the 'Ventilation' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE7": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE7",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" of the Pipe Jacks Greater than 4\" in Diameter on the 'Ventilation' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE8": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE8",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" of the Exhaust Caps up to 4\" on the 'Ventilation' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE9": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-ADDVOICE9",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Add Note\" of the Exhaust Caps 6\" to 8\" on the 'Ventilation' screen.",
				"english": "Add Voice",
				"spanish": "Agregar voz"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-BACK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-BACK",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located below the \"Add Photo\" button of the Additional Vents Needed on the 'Ventilation' screen.",
				"english": "Back",
				"spanish": "Espalda"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-NEXT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-BUTTON-NEXT",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "BUTTON",
				"description": "This is located beside the \"Back\" button on the 'Ventilation' screen.",
				"english": "Next",
				"spanish": "Siguiente"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-ADDITIONALVENTS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-ADDITIONALVENTS",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" button of the Furnace Vent on the 'Ventilation' screen.",
				"english": "Additional Vents Needed?",
				"spanish": "¿Se necesitan ventilaciones adicionales?"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-EXHAUSTCAPS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-EXHAUSTCAPS",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" of the Exhaust Caps up to 4\" on the 'Ventilation' screen.",
				"english": "Exhaust Caps 6\" to 8\":",
				"spanish": "Tapas de escape de 6\" a 8\""
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-EXHAUSTCAPSUPTO4": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-EXHAUSTCAPSUPTO4",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" of the Pipe Jacks Greater than 4\" in Diameter on the 'Ventilation' screen.",
				"english": "Exhaust Caps up to 4\":",
				"spanish": "Tapas de escape de hasta 4 pulgadas."
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-FURNACEVENT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-FURNACEVENT",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" of the Exhaust Caps 6\" to 8\" on the 'Ventilation' screen.",
				"english": "Furnace Vent:",
				"spanish": "Salida de la caldera:"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-OFFRIDGEVENTS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-OFFRIDGEVENTS",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" of the Ridge Vent LF on the 'Ventilation' screen.",
				"english": "Off Ridge Vents:",
				"spanish": "Ventiladores de Cresta Apagados"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-PIPEJACKS1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-PIPEJACKS1",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" of the Off Ridge Vents on the 'Ventilation' screen.",
				"english": "Pipe Jacks Less than 4\" in Diameter:",
				"spanish": "Tubos de menos de 4\" de diámetro."
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-PIPEJACKS2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-PIPEJACKS2",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" on the 'Ventilation' screen.",
				"english": "Pipe Jacks Greater than 4\" in Diameter:",
				"spanish": "Tomas de tubería con diámetro mayor a 4 pulgadas:"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-POWERVENT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-POWERVENT",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" of the Turbine Vent on the 'Ventilation' screen.",
				"english": "Power Vent:",
				"spanish": "Ventilador de energía"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-RIDGEVENTLF": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-RIDGEVENTLF",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" of the Power Vent on the 'Ventilation' screen.",
				"english": "Ridge Vent LF:",
				"spanish": "Ridge Vent LF:"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-TURBINEVENT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-TURBINEVENT",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "LABEL",
				"description": "This is located below the \"Add Photo\" of the Turtle Vents on the 'Ventilation' screen.",
				"english": "Turbine Vent:",
				"spanish": "Ventilador de turbina"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-TURTLEVENTS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-TURTLEVENTS",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "LABEL",
				"description": "This is located below the stepper widgets of the 'Ventilation' screen.",
				"english": "Turtle Vents:",
				"spanish": "Rejillas de tortuga"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-VENTILATION": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-LABEL-VENTILATION",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Ventilation' screen.",
				"english": "Roof | Ventilation",
				"spanish": "Techo | Ventilación"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYEXHAUSTCAPS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYEXHAUSTCAPS",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Exhaust Caps up to 4\" on the 'Ventilation' screen.",
				"english": "Please input how many exist:",
				"spanish": "Por favor, ingrese cuántos existen:"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYFURNACEVENT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYFURNACEVENT",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Furnace Vent on the 'Ventilation' screen.",
				"english": "Please input how many exist:",
				"spanish": "Por favor, ingrese cuántos existen:"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYPIPEJACKS1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYPIPEJACKS1",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Pipe Jacks Less than 4\" in Diameter on the 'Ventilation' screen.",
				"english": "Please input how many exist:",
				"spanish": "Por favor, ingrese cuántos existen:"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYPIPEJACKS2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYPIPEJACKS2",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Pipe Jacks Greater than 4\" in Diameter on the 'Ventilation' screen.",
				"english": "Please input how many exist:",
				"spanish": "Por favor, ingrese cuántos existen:"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYPOWERVENT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYPOWERVENT",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Power Vent on the 'Ventilation' screen.",
				"english": "Please input how many exist:",
				"spanish": "Por favor, ingrese cuántos existen:"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYRIDGEVENT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYRIDGEVENT",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Ridge Vent LF on the 'Ventilation' screen.",
				"english": "Please input how many exist:",
				"spanish": "Por favor, ingrese cuántos existen:"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYTURBINEVENT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYTURBINEVENT",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Turbine Vent on the 'Ventilation' screen.",
				"english": "Please input how many exist:",
				"spanish": "Por favor, ingrese cuántos existen:"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYTURTLEVENTS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-HOWMANYTURTLEVENTS",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" on the 'Ventilation' screen.",
				"english": "Please input how many exist:",
				"spanish": "Por favor, ingrese cuántos existen:"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-NO1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-NO1",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "TEXT",
				"description": "This is located below the \"Off Ridge Vent \" label on the 'Ventilation' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-NO2": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-NO2",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "TEXT",
				"description": "This is located below the \"Additional Vents Needed\" label on the 'Ventilation' screen.",
				"english": "No",
				"spanish": "No"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-NUMBERSHOWMANYEXHAUSTCAPS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-NUMBERSHOWMANYEXHAUSTCAPS",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "TEXT",
				"description": "This is located below the \"Numbers\" of the Exhaust Caps 6\" to 8\" on the 'Ventilation' screen.",
				"english": "Please input how many exist:",
				"spanish": "Por favor, ingrese cuántos existen:"
			},
			"INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-YES1": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VENTILATION-TEXT-YES1",
				"module": "PROPERTIES",
				"area": "VENTILATION",
				"widget": "TEXT",
				"description": "This is located beside the \"No\" button of the Off Ridge Vents on the 'Ventilation' screen.",
				"english": "Yes",
				"spanish": "Sí"
			},
			"INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-BUTTON-EDIT": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-BUTTON-EDIT",
				"module": "PROPERTIES",
				"area": "VIEWPROPERTY",
				"widget": "BUTTON",
				"description": "This is located at the right part of the 'View Property' screen.",
				"english": "Edit",
				"spanish": "Editar"
			},
			"INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-CITY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-CITY",
				"module": "PROPERTIES",
				"area": "VIEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located below the  Zip label of the 'View Property' screen.",
				"english": "City:",
				"spanish": "Ciudad:"
			},
			"INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-COMPANYCAMPORTFOLIOLINK": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-COMPANYCAMPORTFOLIOLINK",
				"module": "PROPERTIES",
				"area": "VIEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located below the 'Links' label of the 'View Property' screen.",
				"english": "CompanyCam Portfolio Link:",
				"spanish": "Enlace al Portafolio de CompanyCam:"
			},
			"INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-ESTIMATETYPEREQUESTED": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-ESTIMATETYPEREQUESTED",
				"module": "PROPERTIES",
				"area": "VIEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located below Property Type label on the 'View Property' screen.",
				"english": "Estimate Type Requested:",
				"spanish": "Tipo de Estimación Solicitada:"
			},
			"INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-LINKS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-LINKS",
				"module": "PROPERTIES",
				"area": "VIEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located below the Estimate Type Requested label on the 'View Property' screen.",
				"english": "Links:",
				"spanish": "Enlaces:"
			},
			"INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-OWNER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-OWNER",
				"module": "PROPERTIES",
				"area": "VIEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located above the Street Number label on the 'View Property' screen.",
				"english": "Owner:",
				"spanish": "Propietario:"
			},
			"INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-PROPERTYTYPE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-PROPERTYTYPE",
				"module": "PROPERTIES",
				"area": "VIEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located below State label on the 'View Property' screen.",
				"english": "Property Type:",
				"spanish": "Tipo de Propiedad:"
			},
			"INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-STATE": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-STATE",
				"module": "PROPERTIES",
				"area": "VIEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located below the City label on the 'View Property' screen.",
				"english": "State:",
				"spanish": "Estado:"
			},
			"INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-STREETNAME": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-STREETNAME",
				"module": "PROPERTIES",
				"area": "VIEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located below the Street Number label on the 'View Property' screen.",
				"english": "Street Name:",
				"spanish": "Nombre de la Calle:"
			},
			"INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-STREETNUMBER": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-STREETNUMBER",
				"module": "PROPERTIES",
				"area": "VIEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located below the Owner label on the 'View Property' screen.",
				"english": "Street Number:",
				"spanish": "Número de Calle:"
			},
			"INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-ZIP": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-LABEL-ZIP",
				"module": "PROPERTIES",
				"area": "VIEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located below the Street Name label on the 'View Property' screen.",
				"english": "Zip:",
				"spanish": "Cremallera:"
			},
			"INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-TEXT-COPY": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-VIEWPROPERTY-TEXT-COPY",
				"module": "PROPERTIES",
				"area": "VIEWPROPERTY",
				"widget": "LABEL",
				"description": "This is located inside the input field of the CompanyCam Portfolio Link in 'View Property' screen.",
				"english": "Copy",
				"spanish": "Copia"
			},
			"INSTR-MOBILE-PROPERTIES-WINDOWS-BUTTON-ADDAWINDOW": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-WINDOWS-BUTTON-ADDAWINDOW",
				"module": "PROPERTIES",
				"area": "WINDOWS",
				"widget": "BUTTON",
				"description": "This is located at the middle part of the 'Windows' screen.",
				"english": "Add a Window",
				"spanish": "Agregar una ventana"
			},
			"INSTR-MOBILE-PROPERTIES-WINDOWS-LABEL-WINDOWS": {
				"instructionId": "INSTR-MOBILE-PROPERTIES-WINDOWS-LABEL-WINDOWS",
				"module": "PROPERTIES",
				"area": "WINDOWS",
				"widget": "LABEL",
				"description": "This is located at the top most part of the 'Windows' screen.",
				"english": "Windows",
				"spanish": "Ventanas"
			},
			"INSTR-WEB-LOGIN-FIRST-BUTTON-REGISTER": {
				"instructionId": "INSTR-WEB-LOGIN-FIRST-BUTTON-REGISTER",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "BUTTON",
				"description": "The 'Register' button is located at the very bottom of the login screen, prompting users to sign up if they do not possess the required login credentials.",
				"english": "Register",
				"spanish": "Registrar"
			},
			"INSTR-WEB-LOGIN-FIRST-LABEL-SIGNIN": {
				"instructionId": "INSTR-WEB-LOGIN-FIRST-LABEL-SIGNIN",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "LABEL",
				"description": "Located below the language switch widget, this serves as a label that gently reminds users to sign in to their account.",
				"english": "Sign In",
				"spanish": "Iniciar sesión"
			},
			"INSTR-WEB-LOGIN-FIRST-TEXT-INVALIDEMAIL": {
				"instructionId": "INSTR-WEB-LOGIN-FIRST-TEXT-INVALIDEMAIL",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "TEXT",
				"description": "This is located below the textbox containing the email address and functions as a validation prompt, indicating that the entered email is not registered within the system.",
				"english": "Sorry, that email address is not in our system.",
				"spanish": "Lo siento, esa dirección de correo electrónico no está en nuestro sistema."
			},
			"INSTR-WEB-LOGIN-FIRST-TEXT-NEEDANACCOUNT": {
				"instructionId": "INSTR-WEB-LOGIN-FIRST-TEXT-NEEDANACCOUNT",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "TEXT",
				"description": "At the bottom part of the login screen, you will find this text positioned just above the 'Register' button.",
				"english": "Don't have an account?",
				"spanish": "¿No tienes una cuenta?"
			},
			"INSTR-WEB-LOGIN-FIRST-TEXT-OR": {
				"instructionId": "INSTR-WEB-LOGIN-FIRST-TEXT-OR",
				"module": "LOGIN",
				"area": "FIRST",
				"widget": "TEXT",
				"description": "This is positioned beneath the 'Continue' button and above the 'Don't have an account?' text on the login screen.",
				"english": "Or",
				"spanish": "O"
			},
			"INSTR-WEB-LOGIN-FORGOTPASSWORD-LABEL-TOTALSCOPE": {
				"instructionId": "INSTR-WEB-LOGIN-FORGOTPASSWORD-LABEL-TOTALSCOPE",
				"module": "LOGIN",
				"area": "FORGOTPASSWORD",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'Forgot Password' screen, where users can reset their password.",
				"english": "TotalScope",
				"spanish": "TotalScope"
			},
			"INSTR-WEB-LOGIN-LOGINSUCCESSFUL-LABEL-LOGINSUCCESSFUL": {
				"instructionId": "INSTR-WEB-LOGIN-LOGINSUCCESSFUL-LABEL-LOGINSUCCESSFUL",
				"module": "LOGIN",
				"area": "LOGINSUCCESSFUL",
				"widget": "LABEL",
				"description": "Located beneath the checkmark icon on the 'Login successful' screen, this functions as a label that indicates that the log-in is successful.",
				"english": "Log in successful",
				"spanish": "Inicio de sesión exitoso"
			},
			"INSTR-WEB-LOGIN-LOGINSUCCESSFUL-TEXT-LOGINSUCCESSFULMESSAGE": {
				"instructionId": "INSTR-WEB-LOGIN-LOGINSUCCESSFUL-TEXT-LOGINSUCCESSFULMESSAGE",
				"module": "LOGIN",
				"area": "LOGINSUCCESSFUL",
				"widget": "TEXT",
				"description": "This is located at the bottom part of the screen, informing users that they have successfully logged into the Totalsope.",
				"english": "You have successfully logged into TotalScope.",
				"spanish": "Has iniciado sesión correctamente en TotalScope."
			},
			"INSTR-WEB-LOGIN-NEWPASSWORD-LABEL-TOTALSCOPE": {
				"instructionId": "INSTR-WEB-LOGIN-NEWPASSWORD-LABEL-TOTALSCOPE",
				"module": "LOGIN",
				"area": "NEWPASSWORD",
				"widget": "LABEL",
				"description": "This is located at the topmost part of the 'New Password' screen, where users can set their password.",
				"english": "TotalScope",
				"spanish": "TotalScope"
			},
			"INSTR-WEB-LOGIN-NEWPASSWORD-TEXT-PASSWORDVALIDATION": {
				"instructionId": "INSTR-WEB-LOGIN-NEWPASSWORD-TEXT-PASSWORDVALIDATION",
				"module": "LOGIN",
				"area": "NEWPASSWORD",
				"widget": "TEXT",
				"description": "This is located below the textbox containing the password and functions as a validation prompt, indicating that the password you have entered does not meet the password standards.",
				"english": "Password must contain a <br>letter and a number and be a <br>minimum of 8 characters.\n",
				"spanish": "La contraseña debe contener una letra y un número y tener un mínimo de 8 caracteres."
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-BUTTON-ADDANOTHERUSER": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-BUTTON-ADDANOTHERUSER",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "BUTTON",
				"description": "This is located at the bottom part of the Registration | Roofing Contractor screen.",
				"english": "Add Another User",
				"spanish": "Agregar otro usuario"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-BUTTON-SAVE": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-BUTTON-SAVE",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "BUTTON",
				"description": "This is located below the \"Claim Handler\" checkbox on the Registration | Roofing Contractor screen.",
				"english": "Save",
				"spanish": "Guardar"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-CHECKBOX-CLAIMHANDLER": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-CHECKBOX-CLAIMHANDLER",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "CHECKBOX",
				"description": "This is located beside the \"Sales Rep\" checkbox on the Registration | Roofing Contractor screen.",
				"english": "Claim Handler",
				"spanish": "Gestor de reclamaciones"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-CHECKBOX-SALESMANAGER": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-CHECKBOX-SALESMANAGER",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "CHECKBOX",
				"description": "This is located beside the \"Oversight\" text on the Registration | Roofing Contractor screen.",
				"english": "Sales Manager",
				"spanish": "Gerente de ventas"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-CHECKBOX-SALESREP": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-CHECKBOX-SALESREP",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "CHECKBOX",
				"description": "This is located beside the \"Sales Manager\" checkbox on the Registration | Roofing Contractor screen.",
				"english": "Sales Rep",
				"spanish": "Representante de ventas"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-INLINETEXT-PERMISSION": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-INLINETEXT-PERMISSION",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "INLINETEXT",
				"description": "This is located below the \"First Name:\" textbox on the Registration | Roofing Contractor screen.",
				"english": "Below, check the level of permission you want for this user when logged-in to TotalScope. For more information, click the button on the right.",
				"spanish": "A continuación, marque el nivel de permiso que desea para este usuario cuando inicie sesión en TotalScope. Para obtener más información, haga clic en el botón de la derecha."
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-COMPANYROLE": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-COMPANYROLE",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "LABEL",
				"description": "This is located beside the \"Role\" label on the Registration | Roofing Contractor screen.",
				"english": "Please check all the roles this user plays at your company:",
				"spanish": "Por favor, verifica los roles que este usuario desempeña en tu empresa:"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-EMAIL": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-EMAIL",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "LABEL",
				"description": "This is located beside the \"Mobile:\" label on the Registration | Roofing Contractor screen.",
				"english": "Email:",
				"spanish": "Correo electrónico:"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-FIRSTNAME": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-FIRSTNAME",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "LABEL",
				"description": "This is located below the \"New User\" label on the Registration | Roofing Contractor screen.",
				"english": "First Name:",
				"spanish": "Nombre:"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-LASTNAME": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-LASTNAME",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "LABEL",
				"description": "This is located beside the \"First Name:\" label on the Registration | Roofing Contractor screen.",
				"english": "Last Name:",
				"spanish": "Apellido:"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-MOBILE": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-MOBILE",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "LABEL",
				"description": "This is located beside the \"Last Name:\" label on the Registration | Roofing Contractor screen.",
				"english": "Mobile:",
				"spanish": "Móvil"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-NEWUSER": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-NEWUSER",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "LABEL",
				"description": "This is located at the middle part of the Registration | Roofing Contractor screen.",
				"english": "New User",
				"spanish": "Nuevo Usuario"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-ROLE": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-LABEL-ROLE",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "LABEL",
				"description": "This is located below the \"Permission\" text on the Registration | Roofing Contractor screen.",
				"english": "Please select the role this user will play on the TotalScope website:",
				"spanish": "Por favor, seleccione el rol que este usuario desempeñará en el sitio web de TotalScope."
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-SWITCH-ACTIVE": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-SWITCH-ACTIVE",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "SWITCH",
				"description": "This is located at the beside the \"Spanish\" switch on the Registration | Roofing Contractor screen.",
				"english": "Active",
				"spanish": "Activo"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-SWITCHLEFT-ENGLISH": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-SWITCHLEFT-ENGLISH",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "SWITCHLEFT",
				"description": "This is located at the middle right part of the Registration | Roofing Contractor screen.",
				"english": "English",
				"spanish": "Inglés"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-SWITCHRIGHT-SPANISH": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-SWITCHRIGHT-SPANISH",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "SWITCHRIGHT",
				"description": "This is located at the beside the \"English\" switch on the Registration | Roofing Contractor screen.",
				"english": "Spanish",
				"spanish": "Español"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-TEXT-ADMIN": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-TEXT-ADMIN",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "TEXT",
				"description": "This is located beside the \"Super Admin\" text on the Registration | Roofing Contractor screen.",
				"english": "Admin",
				"spanish": "Administrador"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-TEXT-OVERSIGHT": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-TEXT-OVERSIGHT",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "TEXT",
				"description": "This is located beside the \"Admin\" text on the Registration | Roofing Contractor screen.",
				"english": "Oversight",
				"spanish": "Supervisión"
			},
			"INSTR-WEB-REGISTRATION-ADDNEWUSER-TEXT-SUPERADMIN": {
				"instructionId": "INSTR-WEB-REGISTRATION-ADDNEWUSER-TEXT-SUPERADMIN",
				"module": "REGISTRATION",
				"area": "ADDNEWUSER",
				"widget": "TEXT",
				"description": "This is located below the \"Role\" label on the Registration | Roofing Contractor screen.",
				"english": "Super Admin",
				"spanish": "Super Administrador"
			}
		},
		"messages": {
			"MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-ADDRESSREQUIRED": {
				"messageId": "MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-ADDRESSREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter a valid address.",
				"spanishMessage": "Ingresa dirección, por favor.\n",
				"module": "ADDNEWCLIENT",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Address Required",
				"notes": "User does not type an address in the address field. Use remedial help. Keep your response under 100 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-EMAILADDRESSINVALID": {
				"messageId": "MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-EMAILADDRESSINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid email (e.g., user@xxxx.com).",
				"spanishMessage": "Email válido: user@xxxx (incorrecto) o user@xxxx.com.",
				"module": "ADDNEWCLIENT",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Email Address Invalid",
				"notes": "User types in an invalid email format, for example, user@xxxx, where there is no domain extension. Provide not only an error message, but also remedial help that provides an example of bad form, and one with good form.  Bad form example must leave off the domain. Leave off the words \"Error message\". Put everything in a single paragraph. Start with the word \"Sorry,\". Keep your response under 100 characters."
			},
			"MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-EMAILADDRESSREQUIRED": {
				"messageId": "MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-EMAILADDRESSREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your email address.",
				"spanishMessage": "Ingresa dirección de email válida, por favor.\n",
				"module": "ADDNEWCLIENT",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Email Address Required",
				"notes": "User does not type an email address in the email address field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-FIRSTNAMEREQUIRED": {
				"messageId": "MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-FIRSTNAMEREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your first name.",
				"spanishMessage": "Lo siento, por favor ingrese su primer nombre.",
				"module": "ADDNEWCLIENT",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "First Name Required",
				"notes": "User does not type anything in the first name field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-LASTNAMEREQUIRED": {
				"messageId": "MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-LASTNAMEREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your last name.",
				"spanishMessage": "Lo siento, por favor ingrese el apellido.",
				"module": "ADDNEWCLIENT",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Last Name Required",
				"notes": "User does not type anything in the last name field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-PHONENUMBERINVALID": {
				"messageId": "MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-PHONENUMBERINVALID",
				"instructionId": null,
				"englishMessage": "Invalid phone format. Use 10 digits: 8282224444 (good).",
				"spanishMessage": "Teléfono inválido. Usa 10 dígitos: 8282224444 (bien).",
				"module": "ADDNEWCLIENT",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Phone Number Invalid",
				"notes": "User types in an invalid phone format, for example, 828222444, where the number of digits should 10 and it only 9. Provide not only an error message, but also remedial help that provides an example of bad form, and one with good form. Leave off the words \"Error message\". Put everything in a single paragraph. Start with the word \"Sorry,\". Keep your response under 100 characters."
			},
			"MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-PHONENUMBERREQUIRED": {
				"messageId": "MSG-ADDNEWCLIENT-FORM-INLINE-ERROR-PHONENUMBERREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your phone number.",
				"spanishMessage": "Lo siento, por favor ingrese su número de teléfono.",
				"module": "ADDNEWCLIENT",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Phone Number Required",
				"notes": "User does not type anything in the phone number field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-ADDNEWOWNER-FORM-POPUP-ERROR-ADDPHONENOTUNIQUE": {
				"messageId": "MSG-ADDNEWOWNER-FORM-POPUP-ERROR-ADDPHONENOTUNIQUE",
				"instructionId": null,
				"englishMessage": "This number has already been taken. Please try a new one.",
				"spanishMessage": "Número ocupado. Elija otro, por favor.",
				"module": "ADDNEWOWNER",
				"context": "FORM",
				"mode": "POPUP",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Add Phone Not Unique",
				"notes": "User types in a number that has been already taken by someone else."
			},
			"MSG-FORGOTPASSWORD-FORM-INLINE-INFORMATION-RESETLINKSENT": {
				"messageId": "MSG-FORGOTPASSWORD-FORM-INLINE-INFORMATION-RESETLINKSENT",
				"instructionId": null,
				"englishMessage": "The password reset link has been sent to your email.",
				"spanishMessage": "Enlace para restablecer enviado a tu correo.",
				"module": "FORGOTPASSWORD",
				"context": "FORM",
				"mode": "INLINE",
				"type": "INFORMATION",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Reset Link Sent",
				"notes": "Shows after the reset link has been sent to the user's email."
			},
			"MSG-LOGIN-FORM-INLINE-ERROR-EMAILADDRESSINVALID": {
				"messageId": "MSG-LOGIN-FORM-INLINE-ERROR-EMAILADDRESSINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid email (e.g., user@xxxx.com).",
				"spanishMessage": "Email válido: user@xxxx (incorrecto) o user@xxxx.com.",
				"module": "LOGIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Email Address Invalid",
				"notes": "User types in an invalid email format, for example, user@xxxx, where there is no domain extension. Provide not only an error message, but also remedial help that provides an example of bad form, and one with good form.  Bad form example must leave off the domain. Leave off the words \"Error message\". Put everything in a single paragraph. Start with the word \"Sorry,\". Keep your response under 100 characters."
			},
			"MSG-LOGIN-FORM-INLINE-ERROR-EMAILADDRESSMISSINGINDB": {
				"messageId": "MSG-LOGIN-FORM-INLINE-ERROR-EMAILADDRESSMISSINGINDB",
				"instructionId": null,
				"englishMessage": "The provided email is not present in our database.",
				"spanishMessage": "Lo siento, email no está en la base de datos.",
				"module": "LOGIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Missing Email in DB",
				"notes": "Email provided is not present in the table."
			},
			"MSG-LOGIN-FORM-INLINE-ERROR-EMAILADDRESSREQUIRED": {
				"messageId": "MSG-LOGIN-FORM-INLINE-ERROR-EMAILADDRESSREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter a valid address.",
				"spanishMessage": "Lo siento, por favor ingrese correo.",
				"module": "LOGIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Email Address Required",
				"notes": "User does not type an email address in the email address field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-LOGIN-FORM-INLINE-ERROR-INVALIDCREDENTIALS": {
				"messageId": "MSG-LOGIN-FORM-INLINE-ERROR-INVALIDCREDENTIALS",
				"instructionId": null,
				"englishMessage": "The provided email and password do not match.",
				"spanishMessage": "Lo siento, correo y contraseña no coinciden.",
				"module": "LOGIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Invalid Credentials",
				"notes": "Provided email and password does not match."
			},
			"MSG-LOGIN-FORM-INLINE-ERROR-NEWANDCONFIRMPASSWORDDOESNOTMATCH": {
				"messageId": "MSG-LOGIN-FORM-INLINE-ERROR-NEWANDCONFIRMPASSWORDDOESNOTMATCH",
				"instructionId": null,
				"englishMessage": "The new password and confirm password do not match.",
				"spanishMessage": "Mis disculpas, las contraseñas no coinciden.",
				"module": "LOGIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Passwords need to match",
				"notes": "Provided passwords do not match."
			},
			"MSG-LOGIN-FORM-INLINE-ERROR-PASSWORDINVALID": {
				"messageId": "MSG-LOGIN-FORM-INLINE-ERROR-PASSWORDINVALID",
				"instructionId": null,
				"englishMessage": "Password must be 8+ characters with at least 1 letter.",
				"spanishMessage": "Contraseña: 8+ caracteres con al menos 1 letra.",
				"module": "LOGIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Password Invalid",
				"notes": "User types in a password in the password field, which is not meeting the password standards. Example, password must be at least 6 characters, etc. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-LOGIN-FORM-INLINE-ERROR-PASSWORDREQUIRED": {
				"messageId": "MSG-LOGIN-FORM-INLINE-ERROR-PASSWORDREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your password.",
				"spanishMessage": "Lo siento, por favor ingresa una contraseña.",
				"module": "LOGIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Password Required",
				"notes": "User does not type a password in the password field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-PROPERTIES-FORM-INLINE-ERROR-COMPANYCAMPORTFOLIOLINKREQUIRED": {
				"messageId": "MSG-PROPERTIES-FORM-INLINE-ERROR-COMPANYCAMPORTFOLIOLINKREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter a valid CompanyCam Portfolio Link.",
				"spanishMessage": "Ingresa enlace válido de CompanyCam Portfolio, por favor.",
				"module": "PROPERTIES",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "ComapnyCam Portfolio Link Required",
				"notes": "User does not type anything in the ComapnyCam Portfolio Link field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-PROPERTIES-FORM-INLINE-ERROR-OTHERSCOPEREQUIRED": {
				"messageId": "MSG-PROPERTIES-FORM-INLINE-ERROR-OTHERSCOPEREQUIRED",
				"instructionId": null,
				"englishMessage": "Please provide more information.",
				"spanishMessage": "Lo siento, por favor proporcione más información.",
				"module": "PROPERTIES",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Other Scope Required",
				"notes": "User does not type anything in the other scope field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-PROPERTIES-FORM-INLINE-ERROR-PROPERTYNAMEREQUIRED": {
				"messageId": "MSG-PROPERTIES-FORM-INLINE-ERROR-PROPERTYNAMEREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your property name.",
				"spanishMessage": "Lo siento, por favor ingrese un nombre de propiedad.",
				"module": "PROPERTIES",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Property Name Required",
				"notes": "User does not type an property name in the property name field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-ADDRESS1INVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-ADDRESS1INVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid address 1.",
				"spanishMessage": "Ingrese una dirección válida 1.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Address 1 Invalid.",
				"notes": "User types in an invalid address1 format, for example, \"1/2 Market Street\" It contains special character beyond the allowed set. Provide not only an error message, but also remedial help that provides an example of bad form. Put everything in a single paragraph. Start with the word \"Sorry,\". Keep your response under 100 characters."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-ADDRESS1REQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-ADDRESS1REQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your valid address 1.",
				"spanishMessage": "Lo sentimos, por favor ingrese la dirección 1.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Address 1 Required",
				"notes": "User does not type an address1 in the address1 field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-BANKACCOUNTINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-BANKACCOUNTINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid bank name.",
				"spanishMessage": "Lo siento, por favor ingresa un nombre de banco válido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Bank Account Invalid",
				"notes": "User does not enter valid bankaccount in the bankaccount field. It should have only alphabets with space and can have 50 characters."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-BANKACCOUNTREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-BANKACCOUNTREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your bank account number. ",
				"spanishMessage": "Por favor, ingrese su banco preferido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Bank Account Required",
				"notes": "User does not type an bankaccount in the bankaccount field. Use remedial help. Keep your response under 50 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-CARDNUMBERINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-CARDNUMBERINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid card number.",
				"spanishMessage": "Lo sentimos, ingrese un número de tarjeta válido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Card Number Invalid",
				"notes": "User does not enter valid card number in the card number field. It should have only digits with space and exactly 16 digits."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-CARDNUMBERREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-CARDNUMBERREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your card number.",
				"spanishMessage": "Lo sentimos, por favor ingrese el número de tarjeta.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Card Number Required",
				"notes": "User does not type an card number in the card number field. Use remedial help. Keep your response under 16 digits. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-CITYINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-CITYINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid city.",
				"spanishMessage": "Lo sentimos, ingresa una ciudad válida.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "City Invalid",
				"notes": "User does not enter valid city in the city field. It should have only alphabets and less than 50 characters."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-CITYREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-CITYREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your city.",
				"spanishMessage": "Lo sentimos, por favor ingresa la ciudad.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "City Required",
				"notes": "User does not type an city in the city field. Use remedial help. Keep your response under 50 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-COMPANYNAMEINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-COMPANYNAMEINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid company name.",
				"spanishMessage": "Introduzca un nombre de empresa válido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Company Name Invalid.",
				"notes": "User type invalid company name in the company name field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-COMPANYNAMEREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-COMPANYNAMEREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your company name.",
				"spanishMessage": "Lo sentimos, introduzca el nombre de la empresa.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Company Name Required",
				"notes": "User does not type an company name in the company name field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-CVVINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-CVVINVALID",
				"instructionId": null,
				"englishMessage": "Invalid CVV. Please try again.",
				"spanishMessage": "Lo sentimos, ingrese un número de tarjeta válido.",
				"module": "REGSITRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "CVV Invalid",
				"notes": "User does not enter valid cvv in the cvv field. It should have only digits without space and exactly 3 digits."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-CVVREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-CVVREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your CVV.",
				"spanishMessage": "Lo sentimos, por favor ingrese cvv.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "CVV Required",
				"notes": "User does not type an cvv in the cvv field. Use remedial help. Keep your response under 3 digits. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that.\r\n"
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-EMAILINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-EMAILINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid email (e.g., user@xxxx.com).",
				"spanishMessage": "Ingresa un correo válido (usuario@xxxx.com).",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Email Required",
				"notes": "User types in an invalid email format, for example, user@xxxx, where there is no domain extension. Provide not only an error message, but also remedial help that provides an example of bad form, and one with good form. Bad form example must leave off the domain. Leave off the words \"Error message\". Put everything in a single paragraph. Start with the word \"Sorry,\". Keep your response under 100 characters."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-EMAILREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-EMAILREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your email address.",
				"spanishMessage": "Lo sentimos, por favor ingrese el correo electrónico.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Email Required",
				"notes": "User does not type an email in the email field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-EXPIRATIONINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-EXPIRATIONINVALID",
				"instructionId": null,
				"englishMessage": "Invalid card expiration date. Please try again.",
				"spanishMessage": "Lo sentimos, introduzca una caducidad válida.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Expiration Invalid",
				"notes": "User does not enter valid expiration in the expiration field. It should have to be in MM/YY format."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-EXPIRATIONREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-EXPIRATIONREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter the card expiration date.",
				"spanishMessage": "Lo sentimos, introduzca la caducidad.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Expiration Required",
				"notes": "User does not type an expiration in the expiration field. Use remedial help. Keep your response in MM/YY format. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-FISTNAMEINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-FISTNAMEINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid first name.",
				"spanishMessage": "Lo sentimos, por favor ingrese un nombre válido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "First Name Invalid",
				"notes": "User does not enter valid firstname in the firstname field. It should have only alphabets without space and less than 50 characters."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-FISTNAMEREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-FISTNAMEREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your first name.",
				"spanishMessage": "Lo sentimos, por favor ingresa el nombre.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "First Name Required",
				"notes": "User does not type an firstname in the firstname field. Use remedial help. Keep your response under 50 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-FULLNAMEINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-FULLNAMEINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid full name.",
				"spanishMessage": "Lo sentimos, introduzca un nombre completo válido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Fullname Invalid",
				"notes": "User does not enter valid fullname in the fullname field. It should have only alphabets with space and can have 50 characters."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-FULLNAMEREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-FULLNAMEREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your full name.",
				"spanishMessage": "Lo sentimos, por favor ingrese el nombre completo.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Fullname Required",
				"notes": "User does not type an fullname in the fullname field. Use remedial help. Keep your response under 50 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-LASTNAMEINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-LASTNAMEINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid last name.",
				"spanishMessage": "Lo sentimos, ingrese un apellido válido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Last Name Invalid",
				"notes": "User does not enter valid lastname in the lastname field. It should have only alphabets without space and less than 50 characters."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-LASTNAMEREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-LASTNAMEREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your last name.",
				"spanishMessage": "Lo sentimos, por favor ingrese el apellido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Last Name Required",
				"notes": "User does not type an lastname in the lastname field. Use remedial help. Keep your response under 50 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that.\r\n"
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-PHONENUMBERINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-PHONENUMBERINVALID",
				"instructionId": null,
				"englishMessage": "Invalid phone format. Use 10 digits: 8282224444 (good).",
				"spanishMessage": "Teléfono inválido. Use 10 dígitos: 8282224444 (correcto).",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Phone Number Invalid",
				"notes": "User types in an invalid phone format, for example, 828222444, where the number of digits should 10 and it only 9. Provide not only an error message, but also remedial help that provides an example of bad form, and one with good form. Leave off the words \"Error message\". Put everything in a single paragraph. Start with the word \"Sorry,\". Keep your response under 100 characters."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-PHONENUMBERREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-PHONENUMBERREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your phone number.",
				"spanishMessage": "Lo sentimos, por favor ingresa tu número de teléfono.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Phone Number Required",
				"notes": "User does not type anything in the phone number field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-PRODUCTCHOICEREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-PRODUCTCHOICEREQUIRED",
				"instructionId": null,
				"englishMessage": "Please select your product choice.",
				"spanishMessage": "Lo sentimos, seleccione trabajos de techado.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Product Choice Required.",
				"notes": "User does not select the product choice for Product Choice field."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-ROOFINGJOBREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-ROOFINGJOBREQUIRED",
				"instructionId": null,
				"englishMessage": "Please select your roofing job.",
				"spanishMessage": "Por favor, seleccione su trabajo de techado.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Roofing Jobs Required.",
				"notes": "User does not select the roofing jobs for nature of your roofing jobs field."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-ROOFQUANTITYINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-ROOFQUANTITYINVALID",
				"instructionId": null,
				"englishMessage": "Please enter valid monthly roof completions.",
				"spanishMessage": "Mis disculpas, ingresa completaciones mensuales válidas.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Roof Quantity Invalid",
				"notes": "User does not type valid roof quantity in the number of roofs completed per month field. Use remedial help. Keep your response in Number. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-ROOFQUANTITYREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-ROOFQUANTITYREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your monthly roof completions.",
				"spanishMessage": "Disculpas, ingresa las completaciones mensuales de techos.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Roof Quantity Required",
				"notes": "User does not type roof quantity in the number of roofs completed per month field. Use remedial help. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-ROUTINGNUMBERINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-ROUTINGNUMBERINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid routing number.",
				"spanishMessage": "Por favor, ingrese un número de ruta válido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Invalid Routing Number",
				"notes": "s"
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-ROUTINGNUMBERREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-ROUTINGNUMBERREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter a routing number.",
				"spanishMessage": "Ingrese un número de ruta.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Invalid Routing Number",
				"notes": "s"
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-STATEINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-STATEINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid state.",
				"spanishMessage": "Lo sentimos, ingrese un estado válido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "State Invalid",
				"notes": "User does not enter valid state in the state field. It should have 2 Upper case alphabets."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-STATEREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-STATEREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your state.",
				"spanishMessage": "Lo sentimos, por favor ingrese el estado.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "State Required",
				"notes": "User does not type an state in the state field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-STREETNAMEINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-STREETNAMEINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid street name.",
				"spanishMessage": "Introduzca un nombre de calle válido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Street Name Invalid.",
				"notes": "User types in an invalid street name format, for example, \"Market Street\" It contains capital and small letters. Provide not only an error message, but also remedial help that provides an example of bad form. Put everything in a single paragraph. Start with the word \"Sorry,\". Keep your response under 50 characters."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-STREETNAMEREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-STREETNAMEREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your street name.",
				"spanishMessage": " Lo sentimos, ingresa el nombre de la calle.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Street Name Required",
				"notes": "User does not type an street name in the street name field. Use remedial help. Keep your response under 50 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-STREETNUMBERINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-STREETNUMBERINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid street number.",
				"spanishMessage": "Introduzca un número de calle válido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Street Number Invalid.",
				"notes": "User types in an invalid street number format, for example, \"7B\" It contains only Capital letters and digits. Provide not only an error message, but also remedial help that provides an example of bad form. Put everything in a single paragraph. Start with the word \"Sorry,\". Keep your response under 3 characters."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-STREETNUMBERREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-STREETNUMBERREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your street number.",
				"spanishMessage": "Lo sentimos, ingrese el número de la calle.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Street Number Required",
				"notes": "User does not type an street number in the street number field. Use remedial help. Keep your response under 3 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-TOTALSCOPEROLEREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-TOTALSCOPEROLEREQUIRED",
				"instructionId": null,
				"englishMessage": "Please select a TotalScope/Company role(s).",
				"spanishMessage": "Elige un rol en TotalScope/Company.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "TotalScope Roles Required.",
				"notes": "User does not select the totalScope role for totalScope role field."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-WEBSITEINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-WEBSITEINVALID",
				"instructionId": null,
				"englishMessage": "Website not found. Please enter a valid website.",
				"spanishMessage": "Lo siento, formato de sitio web no válido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Website Invalid",
				"notes": "User types in an invalid website format, for example, htt://https://www.google.com, with or without a protocol, supporting subdomains, port numbers, and paths. Provide not only an error message, but also remedial help that provides an example of bad form, and one with good form. Put everything in a single paragraph. Start with the word \"Sorry,\"."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-ZIPINVALID": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-ZIPINVALID",
				"instructionId": null,
				"englishMessage": "Please enter a valid zip code.",
				"spanishMessage": "Lo sentimos, ingrese un código postal válido.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Zip Code Invalid",
				"notes": "User types in an invalid zip code, for example, 254d, where alphabets are used or length of zip code is not 5."
			},
			"MSG-REGISTRATION-FORM-INLINE-ERROR-ZIPREQUIRED": {
				"messageId": "MSG-REGISTRATION-FORM-INLINE-ERROR-ZIPREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your zip code.",
				"spanishMessage": "Lo sentimos, ingrese el código postal.",
				"module": "REGISTRATION",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Zip Code Required",
				"notes": "User does not type an zip in the zip field. Use remedial help. Keep your response under 75 characters. Put the word \"sorry\" at the beginning, use the word \"please\" somewhere after that. \n"
			},
			"MSG-SIGNIN-FORM-INLINE-ERROR-ACCOUNTUPDATEFAILED": {
				"messageId": "MSG-SIGNIN-FORM-INLINE-ERROR-ACCOUNTUPDATEFAILED",
				"instructionId": null,
				"englishMessage": "Couldn't save account info. Please try again later.",
				"spanishMessage": "No se pudo guardar la info. Intenta más tarde.",
				"module": "SIGNIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Account Update Failed",
				"notes": "When user is updating their profile/account information and it fails, then we display this error."
			},
			"MSG-SIGNIN-FORM-INLINE-ERROR-CONFIRMPASSWORDNOTMATCH": {
				"messageId": "MSG-SIGNIN-FORM-INLINE-ERROR-CONFIRMPASSWORDNOTMATCH",
				"instructionId": null,
				"englishMessage": "The password doesn't match. Please try again.",
				"spanishMessage": "Contraseña de confirmación no coincide. Lo siento.",
				"module": "SIGNIN\r\n",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Confirm Password Not Match",
				"notes": "Appears when new password doesn't match confirm password."
			},
			"MSG-SIGNIN-FORM-INLINE-ERROR-CONFIRMPASSWORDREQUIRED": {
				"messageId": "MSG-SIGNIN-FORM-INLINE-ERROR-CONFIRMPASSWORDREQUIRED",
				"instructionId": null,
				"englishMessage": "Please confirm your new password . . .",
				"spanishMessage": "Por favor, confirma tu nueva contraseña . . .",
				"module": "SIGNIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": "",
				"titleSpanish": "",
				"messageName": "Confirm Password Required",
				"notes": "Appears if Confirm password is blank during password update."
			},
			"MSG-SIGNIN-FORM-INLINE-ERROR-CURRENTPASSWORDINCORRECT": {
				"messageId": "MSG-SIGNIN-FORM-INLINE-ERROR-CURRENTPASSWORDINCORRECT",
				"instructionId": null,
				"englishMessage": "Wrong password. Please consider resetting it.",
				"spanishMessage": "Contraseña incorrecta. Considere restablecerla.",
				"module": "SIGNIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": "",
				"titleSpanish": "",
				"messageName": "Current Password Incorrect",
				"notes": "Appears if current password is incorrect during password update."
			},
			"MSG-SIGNIN-FORM-INLINE-ERROR-CURRENTPASSWORDREQUIRED": {
				"messageId": "MSG-SIGNIN-FORM-INLINE-ERROR-CURRENTPASSWORDREQUIRED",
				"instructionId": null,
				"englishMessage": "Please enter your current password.",
				"spanishMessage": "Por favor ingrese su contraseña actual.",
				"module": "SIGNIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Current Password Required",
				"notes": "Appears that the current password is blank during the password update."
			},
			"MSG-SIGNIN-FORM-INLINE-ERROR-EMAILNOTUNIQUE": {
				"messageId": "MSG-SIGNIN-FORM-INLINE-ERROR-EMAILNOTUNIQUE",
				"instructionId": null,
				"englishMessage": "Email already exists. Use a different address.",
				"spanishMessage": "Correo ya existe. Usa otra dirección.",
				"module": "SIGNIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "ERROR",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Email Not Unique",
				"notes": "Email already exists. Use a different address."
			},
			"MSG-SIGNIN-FORM-INLINE-INFORMATION-LOGINSUCCESSFUL": {
				"messageId": "MSG-SIGNIN-FORM-INLINE-INFORMATION-LOGINSUCCESSFUL",
				"instructionId": null,
				"englishMessage": "You have logged in successfully.",
				"spanishMessage": "Has iniciado sesión correctamente.",
				"module": "SIGNIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "INFORMATION",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Login Successful",
				"notes": "Shows after the user logs in successfully."
			},
			"MSG-SIGNIN-FORM-INLINE-INFORMATION-LOGINVALIDATING": {
				"messageId": "MSG-SIGNIN-FORM-INLINE-INFORMATION-LOGINVALIDATING",
				"instructionId": null,
				"englishMessage": "Logging you in. Please wait . . .",
				"spanishMessage": "Iniciando sesión. Por favor, espera . . .",
				"module": "SIGNIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "INFORMATION",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "Login Validating",
				"notes": "Validating the user's entered email and password on the login screen."
			},
			"MSG-SIGNIN-FORM-INLINE-INFORMATION-UPDATINGACCOUNTINFORMATIONPLEASEWAIT": {
				"messageId": "MSG-SIGNIN-FORM-INLINE-INFORMATION-UPDATINGACCOUNTINFORMATIONPLEASEWAIT",
				"instructionId": null,
				"englishMessage": "Updating account information . . . please wait . . .",
				"spanishMessage": "Actualizando cuenta . . . por favor, espere . . .",
				"module": "SIGNIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "INFORMATION",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "User Info Update Progress",
				"notes": "User Info Update Progress"
			},
			"MSG-SIGNIN-FORM-INLINE-INFORMATION-USERINFOUPDATESUCCESS": {
				"messageId": "MSG-SIGNIN-FORM-INLINE-INFORMATION-USERINFOUPDATESUCCESS",
				"instructionId": null,
				"englishMessage": "Account information has been updated successfully.",
				"spanishMessage": "Información actualizada con éxito.",
				"module": "SIGNIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "INFORMATION",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "User Info Update Success",
				"notes": "Shows after the account information has been updated successfully."
			},
			"MSG-SIGNIN-FORM-INLINE-INFORMATION-USERPASSWORDUPDATEPROGRESS": {
				"messageId": "MSG-SIGNIN-FORM-INLINE-INFORMATION-USERPASSWORDUPDATEPROGRESS",
				"instructionId": null,
				"englishMessage": "Updating password . . . please wait . . .\n",
				"spanishMessage": "Actualizando contraseña . . . por favor espere . . .",
				"module": "SIGNIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "INFORMATION",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "User Password Update Progress",
				"notes": "Shows during the password update progress."
			},
			"MSG-SIGNIN-FORM-INLINE-INFORMATION-USERPASSWORDUPDATESUCCESS": {
				"messageId": "MSG-SIGNIN-FORM-INLINE-INFORMATION-USERPASSWORDUPDATESUCCESS",
				"instructionId": null,
				"englishMessage": "Your password has been updated successfully.\n",
				"spanishMessage": "Tu contraseña ha sido actualizada exitosamente.",
				"module": "SIGNIN",
				"context": "FORM",
				"mode": "INLINE",
				"type": "INFORMATION",
				"titleEnglish": null,
				"titleSpanish": null,
				"messageName": "User Password Update Success",
				"notes": "Shows after password has been updated successfully."
			}
		}
	}
	// CLASS CONSTRUCTOR, THIS WILL BE FIRST FUNCTION TO BE EXECUTED WHEN THIS CLASS LOADS.
	// HERE WE WILL TELL ANGULAR TO INJECT A DEPENDENCY BY SPECIFYING A CONSTRUCTOR
	// PARAMETER WITH THE DEPENDENCY TYPE.
	constructor
	(
	    private http: HttpClient,
		private apiService: ApiService
	)
	{

	}

	// PERFORM A GET REQUEST
	public performGetRequest(url: string)
	{
		return this.http.get (this.apiURL+url);
	}

	// PERFORM POST REQUEST
	public performPostRequest(url: string, dataObj: any)
	{
		return this.http.post (this.apiURL+url, dataObj);
	}

	// GET ALL STATIC DATA FROM DATABASE. FOR EXAMPLE TRASNLASTIONS.
	// WE NEED THIS DATA TO START THE APP.
	public getAppInitialData()
	{
		if ( Object.keys (this["data"]).length > 0)
			{
				console.log ("translations", this["data"])
				this.translations = this["data"]; // . . .STORE IT INTO A CLASS VARIABLE.
				sessionStorage.setItem ('translations', JSON.stringify (this?.data));

				// TRIGGERING THE OBSERVABLE SO THE APP KNOWS THAT STATIC DATA IS AVAILABLE NOW.
				this.appStaticDataObs.next (this.translations);
			}
		// SENDING REQUEST TO SERVER TO GET STATIC DATA.
		// this.http.get (this.apiURL + '/translation/multi-translation').subscribe ( (response: any) =>
		// {
		// 	// IF WE SUCCESSFULLY GOT THE DATA FROM DATABASE . . .
		// 	if ( Object.keys (response["data"]).length > 0)
		// 	{
		// 		console.log ("translations", response["data"])
		// 		this.translations = response["data"]; // . . .STORE IT INTO A CLASS VARIABLE.
		// 		sessionStorage.setItem ('translations', JSON.stringify (response?.data));

		// 		// TRIGGERING THE OBSERVABLE SO THE APP KNOWS THAT STATIC DATA IS AVAILABLE NOW.
		// 		this.appStaticDataObs.next (this.translations);
		// 	}
		// });
	}
}

