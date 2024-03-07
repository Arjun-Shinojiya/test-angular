/**
 *          FILENAME: login.component.ts
 *             ROUTE: totalscope_webclient/src/app/modules/auth/login/
 *            AUTHOR: ICI/SZ
 *              WHAT: HANDLES USER AUTHENTICATION AND FORM VALIDATION FOR USER LOGIN.
 *               HOW: ALLOWS USERS TO ENTER THEIR EMAIL AND PASSWORD, PROVIDES VALIDATION, AND MAKES POST REQUEST TO A LOGIN API ENDPOINT.
 * 					  ADDITIONALLY, IT SETS A TOKEN AND NAVIGATES TO A SUCCESS PAGE OR DISPLAYS AN ERROR MESSAGE.
 *   IMPORTING FILES: api.service.ts | token.service.ts | login.component.html | login.component.scss
 * SUBSCRIBING FILES: auth.service.ts | helper.service.ts
 *  LAST COMMIT DATE: AUGUST 18, 2023
 */

/**
 * COMPONENT AND VIEWCHILD | CREATES COMPONENTS AND ACCESSES CHILD COMPONENTS.
 * FORMGROUP, FORMCONTROL, AND VALIDATORS | CREATES A FORM WITH VALIDATION.
 * ROUTE | NAVIGATES BETWEEN DIFFERENT ROUTES IN THE APPLICATION.
 */
import {Component, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from '@angular/router';

/**
 * TEXBOXCOMPONENT | CAPTURES TEXT INPUT FROM A USER.
 * SVGICON | RENDERS AN SVG ICON. IT TAKES A SINGLE ARGUMENT, EYEICON, USED IN PASSWORD TEXTBOX.
 */
import {TextBoxComponent} from "@progress/kendo-angular-inputs";
import {eyeIcon, SVGIcon} from "@progress/kendo-svg-icons";

/**
 * APISERVICE | MAKE CALLS TO AN API.
 * TOKENSERVICE | MANAGE TOKENS FOR AUTHENTICATION PURPOSES.
 */
import {ApiService} from "../../../../core/api.service";
import {TokenService} from 'src/app/services/token/token.service';

/**
 * DEFINES THE HTML TEMPLATE AND STYLESHEET ASSOCIATED WITH THE COMPONENT.
 * SELECTOR | DEFINES THE HTML TAG THAT IS ASSOCIATED WITH THIS COMPONENT.
 * TEMPURL | DEFINES THE HTML TEMPLATE ASSOCIATED WITH THIS COMPONENT.
 * STYLEURLS | DEFINES THE STYLESHEET ASSOCIATED WITH THIS COMPONENT.
 */
@Component
({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

/**
 * THE LOGINCOMPONENT CLASS CONTAINS A CONSTRUCTOR THAT SETS UP THE DEPENDENCIES,
 * INCLUDES A TEXTBOXCOMPONENT REFERENCE, AND MANAGES A LOGIN FORM WITH TOGGLEVISIBILITY()
 * TO SWITCH PASSWORD VISIBILITY AND SUBMIT() FOR FORM SUBMISSION.
 * IF THE FORM IS VALID, IT SENDS A POST REQUEST WITH USER CREDENTIALS, HANDLES SUCCESS BY SETTING A TOKEN AND REDIRECTION,
 * AND DISPLAYS AN ERROR FOR FAILED REQUESTS VIA SHOWCREDENTIALERROR.
 */
export class LoginComponent
{
	constructor
	(
		private router: Router, // ROUTES REQUESTS AND RESPONSES BETWEEN DIFFERENT COMPONENTS WITHIN AN APPLICATION.
		private apiService: ApiService, // MAKES API CALLS TO EXTERNAL SERVICES.
		private tokenService: TokenService // MANAGES AUTHENTICATION TOKENS.
	)
	{
	}

	/**
	 * UTILIZES THE @VIEWCHILD DECORATOR TO ACCESS THE TEXTBOXCOMPONENT ELEMENT IN THE TEMPLATE,
	 * ENABLING INTERACTION WITH ITS PROPERTIES AND METHODS FROM THE SURROUNDING CLASS.
	 */
	@ViewChild ("textbox") public textbox: any = TextBoxComponent;

	/**
	 * SHOWCREDENTIALERROR IS A BOOLEAN SET TO FALSE, INDICATING WHETHER TO DISPLAY A CREDENTIAL ERROR MESSAGE DURING USER INPUT.
	 * EYEICON FOR SHOW PASSWORD
	 */
	public showCredentialError = false;
	public eyeIcon: SVGIcon = eyeIcon;

	/**
	 * SET AN INPUT FIELD'S TYPE TO "PASSWORD" BY DIRECTLY ACCESSING THE TEXTBOX'S NATIVE ELEMENT.
	 */
	public ngAfterViewInit(): void
	{
		this.textbox.input.nativeElement.type = "password";
	}

	/**
	 * TOGGLES AN INPUT ELEMENT'S VISIBILITY BY SWITCHING BETWEEN 'PASSWORD' AND 'TEXT' TYPES BASED ON ITS CURRENT TYPE.
	 */
	public toggleVisibility(): void
	{
		const inputEl = this.textbox.input.nativeElement;

		/**
		 * CHECKS THE TYPE OF AN INPUT ELEMENT (INPUTEL).
		 * IF THE TYPE IS PASSWORD, THEN IT CHANGES THE TYPE TO TEXT. IF THE TYPE IS NOT PASSWORD, THEN IT CHANGES TYPE TO PASSWORD.
		 */
		if (inputEl.type === "password")
		{
			inputEl.type = "text";
		}
		else
		{
			inputEl.type = "password";
		}
	}

	/**
	 * CREATES A FORMGROUP CALLED LOGINFORM, WHICH CONTAINS TWO FORMCONTROLS: EMAIL AND PASSWORD.
	 * EMAIL FORMCONTROL | REQUIRES AN EMAIL ADDRESS AND IS SET TO UPDATE ITS VALIDATION STATE WHEN USER LEAVES THE CONTROL.
	 * PASSWORD FORMCONTROL | REQUIRES A VALUE AND IS SET TO UPDATE ITS VALIDATION STATE WHEN USER LEAVES IT.
	 */
	public loginForm: any = new FormGroup
	({
		email: new FormControl ("",
		{
			validators:
			[
				Validators.required,
				Validators.email
			],
			updateOn: 'blur'
		}),
		password: new FormControl ("",
		{
			validators: [Validators.required],
			updateOn: 'blur'
		}),
	});

	/**
	 * CHECKS IF THE LOGIN FORM IS VALID. IF IT IS NOT VALID, IT WILL MARK ALL THE FIELDS IN THE FORM AS TOUCHED.
	 * ENSURES THAT ALL THE FIELDS HAVE BEEN FILLED OUT BEFORE THE FORM IS SUBMITTED.
	 */
	submit()
	{
		if (!this.loginForm.valid)
		{
			this.loginForm.markAllAsTouched();
			return;
		}

		/**
		 * CREATES AN OBJECT CALLED DATA AND ASSIGNS IT TWO PROPERTIES: EMAIL AND PASSWORD.
		 * THE VALUES OF EMAIL AND PASSWORD COME FROM THE LOGINFORM.VALUE OBJECT.
		 * THIS DATA WILL BE SENT TO THE SERVER.
		 */
		let data =
		{
			email: this.loginForm.value.email,
			password: this.loginForm.value.password
		}

		/**
		 * SENDS A POST REQUEST TO /AUTH/LOGIN WITH PROVIDED DATA AND SPECIFIES A CALLBACK FUNCTION (NEXT)
		 * TO HANDLE THE RESPONSE, WHICH IS AVAILABLE IN THE RESPONSE ARGUMENT.
		 * ON ERROR, THE RESPONSE IS LOGGED TO THE CONSOLE.
		 */
		this.apiService.post ('/auth/login', data).subscribe
		({
			next: (response) =>
			{
				console.log ('response', response);

				/**
				 * AUTHENTICATES A USER THROUGH A LOGIN FUNCTION.
				 * CHECKS IF THE RESPONSE STATUS IS SUCCESS TO SET A TOKEN AND NAVIGATE TO THE LOGIN/SUCCESS PAGE.
				 * IF NOT, IT SETS SHOWCREDENTIALERROR TO TRUE AND LOGS ANY ERRORS.
				 */
				if (response.status == "success")
				{
					this.showCredentialError = false;
					this.tokenService.setToken (response.data.token);
					let userDataString: any = JSON.stringify(response.data.user);
					localStorage.setItem("userData", userDataString);
					this.router.navigate (['dashboard']);
				}
				else
				{
					this.showCredentialError = true;
				}
			},
				error: (err) =>
			{
				console.log ('err', err)
			}
		}
		)
	}
}
