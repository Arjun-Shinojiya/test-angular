/**
 *          FILENAME: auth.module.ts
 *             ROUTE: totalscope_webclient/src/app/modules/auth/
 *            AUTHOR: ICI/SZ
 *              WHAT: ORGANIZES AND ENCAPSULATES THE MODULE FOR EASIER MANAGEMENT.
 *               HOW: HANDLES AUTHENTICATION-RELATED FEATURES TO ENHANCE MAINTAINABILITY WITHIN THE APPLICATION.
 *   IMPORTING FILES: app.routing.module.ts | shared.module.ts | login.component.ts | forgot-password.component.ts
 *                    | login-success.component.ts | reset-password-email.component.ts 
 *                    | reset-password-success.component.ts | set-password.component.ts
 * SUBSCRIBING FILES: app.module.ts | app-routing.module.ts | login-success.component.ts
 *  LAST COMMIT DATE: AUGUST 12, 2023
 */

/**
 * NGMODULE | CREATES ANGULAR APPLICATIONS AND PROVIDES THE NECESSARY COMPONENTS TO DO SO.
 * COMMONMODULE | PROVIDES DIRECTIVES AND SERVICES THAT ARE COMMON TO ANGULAR APPLICATIONS.
 * FORMSMODULE | PROVIDES DIRECTIVES AND SERVICES FOR CREATING FORMS.
 * REACTIVEFORMSMODULE | CREATE REACTIVE FORMS.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * INPUTSMODULE | ACCESS KENDO INPUT FIELDS, DROPDOWNS, AND TEXT AREAS. 
 * BUTTONSMODULE | TOGGLE BUTTONS, SPLIT BUTTONS, AND BUTTON GROUPS.
 * ICONSMODULE | ICONS FOR NAVIGATION, ACTION AND STATUS.
 */
import {InputsModule} from '@progress/kendo-angular-inputs';
import {ButtonsModule} from "@progress/kendo-angular-buttons";
import {IconsModule} from "@progress/kendo-angular-icons";

/**
 * AUTHROUTINGMODULE | HANDLES AUTHENTICATION ROUTES.
 * SHAREDMODULE | SHARED COMPONENTS, DIRECTIVES, AND PIPES USED THROUGHOUT THE APPLICATION.
 * LOGINCOMPONENT | USED FOR LOGGING INTO THE APPLICATION.
 * FORGOTPASSWORDCOMPONENT | RESETS A USER'S PASSWORD.
 * LOGINSUCCESSCOMPONENT | DISPLAYS WHEN A USER SUCCESSFULLY LOGS IN.
 * RESETPASSWORDSUCCESSCOMPONENT | SENDS A RESET PASSWORD TO THE USER.
 * RESETPASSWORDSUCCESSCOMPONENT | DISPLAYS WHEN A USER SUCCESSFULLY RESETS THEIR PASSWORD.
 * SETPASSWORDCOMPONENT | SETS A NEW PASSWORD AFTER A USER HAS RESET THEIR PASSWORD.
 */
import {AuthRoutingModule} from './authrouting.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './resetpassowrd/forgotpassword/forgotpassword.component';
import {LoginSuccessComponent} from './loginsuccess/loginsuccess.component';
import {ResetPasswordEmailComponent} from './resetpassowrd/resetemailsent/resetemailsent.component';
import {ResetPasswordSuccessComponent} from './resetpassowrd/resetpasswordsuccess/resetpasswordsuccess.component';
import {SetPasswordComponent} from './resetpassowrd/setpassword/setpassword.component';



/**
 * DECLARES SEVERAL COMPONENTS AND IMPORTS VARIOUS MODULES RELATED TO ABOVE.
 */
@NgModule
({
  declarations: 
  [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordEmailComponent,
    LoginSuccessComponent,
    ResetPasswordSuccessComponent,
    SetPasswordComponent
  ],
  imports: 
  [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    InputsModule,
    ButtonsModule,
    IconsModule,
    SharedModule,
    FormsModule
  ]
})

/**
 * THE AUTHMODULE CLASS IS EMPTY AND EXPORTABLE FOR USE IN OTHER FILES AS A PLACEHOLDER.
 */
export class AuthModule{}
