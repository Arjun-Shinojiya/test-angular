/**
 *          FILENAME: auth-routing.module.ts
 *             ROUTE: totalscope_webclient/src/app/modules/auth/
 *            AUTHOR: ICI/SZ
 *              WHAT: RESPONSIBLE FOR DEFINING HOW DIFFERENT PAGES/SCREENS ARE DISPLAYED
 *                    WHEN USERS INTERACT WITH THE AUTHENTICATION-RELATED FEATURES OF THE APPLICATION,
 *                    SUCH AS LOGIN, PASSWORD RESET, AND REGISTRATION.
 *               HOW: SET UP THE ROUTING CONFIGURATION FOR AN AUTHENTICATION-RELATED FEATURE IN THE APPLICATION.
 *   IMPORTING FILES: login.component.ts | forgot-password.component.ts | reset-password-email.component.ts 
 *                    | login-success.component.ts | reset-password-success.component.ts | set-password.component.ts
 * SUBSCRIBING FILES: auth.module.ts | login-success.component.ts
 *  LAST COMMIT DATE: AUGUST 12, 2023
 */

/**
 * NGMODULE | TAKES A SINGLE METADATA OBJECT, WHOSE PROPERTIES DESCRIBE THE MODULE.
 * ROUTERMODULE | CONFIGURES THE ROUTER SERVICE, PROVIDES NAVIGATION AND URL MANIPULATION.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

/**
 * IMPORTS MULTIPLE COMPONENTS FOR LOGIN AND PASSWORD RESET FUNCTIONALITY.
 */
import {LoginComponent} from "./login/login.component";
import {ForgotPasswordComponent} from './resetpassowrd/forgotpassword/forgotpassword.component';
import {ResetPasswordEmailComponent} from './resetpassowrd/resetemailsent/resetemailsent.component';
import {LoginSuccessComponent} from './loginsuccess/loginsuccess.component';
import {ResetPasswordSuccessComponent} from './resetpassowrd/resetpasswordsuccess/resetpasswordsuccess.component';
import {SetPasswordComponent} from './resetpassowrd/setpassword/setpassword.component';

/**
 * DEFINES THE APPLICATION'S NAVIGATION ROUTES.
 */
const routes: Routes = 
[
  {
    /**
     * SETS UP A ROUTE FOR A LOGIN PATH AND ASSOCIATES IT WITH THE LOGINCOMPONENT.
     */
    path: 'login',
    component: LoginComponent
  },
  {
    /**
     * SET UP A ROUTE FOR LOGIN/SUCCESS PATH USING THE LOGINSUCCESSCOMPONENT.
     */
    path: 'login/success',
    component: LoginSuccessComponent
  },
  {
    /**
     * DEFINES A ROUTE FOR RESETTING A FORGOTTEN PASSWORD IN THE APPLICATION.
     */
    path: 'reset-password',
    component: ForgotPasswordComponent
  },
  {
    /**
     * SETS UP A ROUTE FOR SHOWING A PAGE WHEN AN EMAIL FOR RESETTING A PASSWORD IS SENT.
     */
    path: 'reset-password/email-sent',
    component: ResetPasswordEmailComponent
  },
  {
    /**
     * DEFINES A ROUTE FOR RESETTING A PASSWORD WITH A UNIQUE IDENTIFIER.
     * WHEN THIS ROUTE IS ACCESSED, IT WILL DISPLAY THE SETPASSWORDCOMPONENT UI.
     * THE :UNIQUEID PARAMETER IS USED TO IDENTIFY THE USER.
     */
    path: 'reset-password/set-password/:uniqueId',
    component: SetPasswordComponent
  },
  {
    /**
     * ROUTE FOR DISPLAYING THE SUCCESS MESSAGE AFTER RESETTING A PASSWORD.
     */
    path: 'reset-password/success',
    component: ResetPasswordSuccessComponent
  },

  /**
   * DEFINES A ROUTE FOR THE REGISTER PAGE. 
   * WHEN A USER VISITS THE /REGISTER WEB ADDRESS, IT LOADS THE REGISTERMODULE.
   */
  {path: 'register', loadChildren: () => import ('./register/register.module').then(m => m.RegisterModule)},
];

/**
 * CONFIGURES ROUTING FOR A SPECIFIC MODULE.
 */
@NgModule
({
  imports: [RouterModule.forChild (routes)],
  exports: [RouterModule]
})

/**
 * SETS UP RULES FOR NAVIGATING TO DIFFERENT PARTS OF THE WEB APPLICATION WHEN DEALING WITH USER AUTHENTICATION.
 */
export class AuthRoutingModule{}
