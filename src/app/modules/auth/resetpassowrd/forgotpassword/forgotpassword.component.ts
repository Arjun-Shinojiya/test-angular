/**
 *          FILENAME: forgot-password.component.ts
 *             ROUTE: totalscope_webclient/src/app/modules/auth/forgot-password/
 *            AUTHOR: ICI/SZ
 *              WHAT: PROVIDES FUNCTIONALITY FOR USERS WHO HAVE FORGOTTEN THEIR PASSWORDS AND WANT TO RESET THEM.
 *               HOW: MANAGES THE "FORGOT PASSWORD" FEATURE IN A WEB APPLICATION, OFFERING EMAIL VALIDATION 
 *                    AND PASSWORD RESET LINK GENERATION FUNCTIONALITY WHILE CONTROLLING THE STATE OF EMAIL VALIDATION AND THE FORM.
 *   IMPORTING FILES: api.service.ts | forgot-password.component.html | forgot-password.component.scss
 * SUBSCRIBING FILES: auth-routing.module.ts | auth.module.ts
 *  LAST COMMIT DATE: OCTOBER 02, 2023
 */

/**
 * COMPONENT | CREATES COMPONENTS THAT DEFINE SECTIONS OF THE PAGE.
 * FORMGROUP, FORMCONTROL, VALIDATORS | CREATES FORMS WITH VALIDATION.
 * ROUTER | NAVIGATES BETWEEN DIFFERENT ROUTES IN THE APPLICATION.
 */
import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

/**
 * APISERVICE | MAKES REQUESTS TO EXTERNAL APIS AND HANDLES THE RESPONSE DATA.
 */
import {ApiService} from 'src/core/api.service';
import {HelperService} from 'src/app/services/helper.service';

/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component
({
  selector: 'app-forgot-password',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})

/**
 * DEFINES THE FORGOTPASSWORDCOMPONENT CLASS WITH A CONSTRUCTOR THAT TAKES ROUTER AND APISERVICE AS PARAMETERS. 
 * IT INITIALIZES EMAILFOUNDERROR AND A FORMGROUP NAMED FORGOTPASSWORDFORM 
 * WITH AN EMAIL FORMCONTROL THAT HAS THE REQUIRED AND EMAIL VALIDATORS. 
 * THE FINDEMAIL() METHOD SETS EMAILFOUNDERROR BASED ON EMAIL VALIDITY, 
 * AND SUBMIT() CALLS APISERVICE.POST() WITH THE EMAIL AND LANGUAGE PROPERTIES. 
 * SUCCESS RESULTS IN A REDIRECT TO RESET-PASSWORD/EMAIL-SENT; OTHERWISE, ERRORS ARE LOGGED.
 */
export class ForgotPasswordComponent 
{
  /**
   * INITIALIZES THE CLASS WITH A ROUTER FOR NAVIGATION PATHS AND AN APISERVICE FOR SERVER API CALLS.
   */
  constructor
  (
    public router: Router,
    private apiService: ApiService,
    private helperService: HelperService
  ) {}

  /**
   * DEFINES A FORMGROUP NAMED FORGOTPASSWORDFORM AND A FORMCONTROL NAMED EMAIL. 
   * THE EMAIL CONTROL ACCEPTS STRINGS AND HAS TWO VALIDATORS: 
   * VALIDATORS.REQUIRED (REQUIRING A NON-EMPTY FIELD) AND VALIDATORS.EMAIL (ENSURING A VALID EMAIL FORMAT). 
   * THE BOOLEAN EMAILFOUNDERROR IS INITIALLY SET TO FALSE, INDICATING NO EMAIL FOUND YET.
   */
  public emailFoundError: boolean = false; // CREATES A GLOBAL VARIABLE
  public forgotPasswordForm: any = new FormGroup
  ({
    email: new FormControl ("", {validators: [Validators.required, Validators.email], updateOn: 'change'}),
  });

  /**
   * VALIDATES THE EMAIL INPUT IN THE FORGOTPASSWORDFORM AND HANDLES A PLACEHOLDER EMAIL ADDRESS.
   * IF THE EMAIL IS NOT ADMIN@ADMIN.COM OR AN EMPTY STRING, IT SETS EMAILFOUNDERROR TO TRUE; OTHERWISE, IT SETS IT TO FALSE.
   */
  findEmail() 
  {
    if (this.forgotPasswordForm.value.email != "admin@admin.com" && this.forgotPasswordForm.value.email != "" && this.forgotPasswordForm.controls.email.valid) 
    {
      this.emailFoundError = true;
    } else 
    {
      this.emailFoundError = false;
    }
  }

  /**
   * REQUESTS A RESET PASSWORD LINK FROM AN API WITH PARAMETERS: EMAIL FROM FORGOTPASSWORDFORM AND LANGUAGE FROM LOCALSTORAGE, 
   * THEN SUBSCRIBES TO THE API RESPONSE.
   */
  submit() 
  {
    this.apiService.post ('/users/generate-reset-password-link',
    {
      email: this.forgotPasswordForm.value.email,
      language: localStorage.getItem ('selectedLanguage') ? localStorage.getItem ('selectedLanguage') : 'english'
    }).subscribe ((response) => 
    {

      /**
       * VALIDATES API RESPONSE FOR PASSWORD RESET, NAVIGATES ON SUCCESS, SETS AN EMAIL ERROR ON FAILURE, AND LOGS INPUT-SPECIFIC VALUES.
       */
      if (response.status === 'success') 
      {
        this.helperService.userEmail = this.forgotPasswordForm.value.email
        this.router.navigate (['reset-password/email-sent']);
      }
      else 
      {
        this.emailFoundError = true
      }
    });
  }
}
