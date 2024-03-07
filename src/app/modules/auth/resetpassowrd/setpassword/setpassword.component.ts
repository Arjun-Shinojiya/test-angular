/**
 *          FILENAME: set-password.component.ts
 *             ROUTE: totalscope_webclient/src/app/modules/auth/reset-password/
 *            AUTHOR: ICI/SZ
 *              WHAT: MANAGES USER PASSWORD RESET FUNCTIONALITY.
 *               HOW: HANDLES FORM VALIDATION, USER INPUT, AND API COMMUNICATION 
 *                    WHILE PROVIDING A USER-FRIENDLY INTERFACE FOR RESETTING PASSWORDS.
 *   IMPORTING FILES: api.service.ts | set-password.component.html | set-password.component.scss
 * SUBSCRIBING FILES: auth-routing.module.ts | auth.module.ts
 *  LAST COMMIT DATE: OCTOBER 02, 2023
 */

/**
 * COMPONENT | CREATES COMPONENTS.
 * VIEWCHILD | ALLOWS A PARENT COMPONENT TO ACCESS ITS CHILDREN.
 * FORMGROUP AND FORMCONTROL | CREATE A GROUP OF RELATED FORM ELEMENTS.
 * VALIDATORS | PROVIDES A SET OF FUNCTIONS THAT CAN BE USED TO VALIDATE USER INPUT.
 * ACTIVATEDROUTE AND ROUTER | MANAGES NAVIGATION BETWEEN DIFFERENT VIEWS OF AN APPLICATION.
 */
import {Component, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';

/**
 * TEXTBOXCOMPONENT | ALLOWS USERS TO ENTER TEXT.
 * EYEICON | REPRESENTS A VISUAL ELEMENT IN THE APPLICATION.
 * SVGICON | RENDERS THE EYEICON FOR SHOW PASSWORD FUNCTIONALITY
 */
import {TextBoxComponent} from "@progress/kendo-angular-inputs";
import {eyeIcon, SVGIcon} from "@progress/kendo-svg-icons";

/**
 * APISERVICE | MAKES API CALLS TO EXTERNAL SERVICES.
 */
import {ApiService} from 'src/core/api.service';

/**
 * @COMPONENT | DEFINES THE SELECTOR, TEMPLATE, AND STYLE OF THE COMPONENT.
 * SELECTOR | DEFINES THE HTML TAG THAT WILL BE USED TO REPRESENT THE COMPONENT IN THE TEMPLATE.
 * TEMPLATEURL | DEFINES THE HTML TEMPLATE THAT WILL BE USED TO RENDER THE COMPONENT.
 * STYLEURLS | DEFINES THE STYLESHEETS THAT WILL BE USED TO STYLE THE COMPONENT.
 */
@Component
({
  selector: 'app-set-password',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.scss']
})

/**
 * THE SETPASSWORDCOMPONENT MANAGES USER PASSWORD RESETS. 
 * IT INITIALIZES WITH CONSTRUCTOR DEPENDENCIES, VIEW CHILDREN, AND VARIABLES. 
 * IN NGAFTERVIEWINIT(), IT SUBSCRIBES TO ROUTE PARAMETERS AND SETS UNIQUECODE, UPDATING INPUT TYPES. 
 * THE SUBMIT() FUNCTION VALIDATES THE FORM AND SENDS A POST REQUEST TO RESET THE PASSWORD. UPON SUCCESS, IT NAVIGATES TO A SUCCESS ROUTE. 
 * THE ISFORMVALID() METHOD CHECKS FORM VALIDITY AND PASSWORD MATCHING, RETURNING FALSE IF CONDITIONS AREN'T MET.
 */
export class SetPasswordComponent 
{
  /**
   * DEFINES A CONSTRUCTOR FOR A CLASS, RESPONSIBLE FOR INITIALIZING THE CLASS WITH THREE KEY PARAMETERS: 
   * ROUTER (AN INSTANCE OF THE ROUTER CLASS FOR NAVIGATION BETWEEN COMPONENTS),
   * _ACTIVATEDROUTE (AN INSTANCE OF THE ACTIVATEDROUTE CLASS TO OBTAIN CURRENT ROUTE INFORMATION), 
   * AND APISERVICE (AN INSTANCE OF THE APISERVICE CLASS USED FOR MAKING API CALLS).
   */
  constructor
  (
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private apiService: ApiService,
  ){}

  /**
   * INITIALIZES VARIABLES FOR A COMPONENT, INCLUDING TWO TEXTBOXCOMPONENTS (NEWPASSWORDINPUT AND CONFIRMPASSWORDINPUT) 
   * VIA THE @VIEWCHILD DECORATOR, AN SVGICON (EYEICON), AND A STRING VARIABLE (UNIQUECODE). 
   * IT ALSO DEFINES THE NGAFTERVIEWINIT FUNCTION, WHICH EXECUTES AFTER COMPONENT INITIALIZATION AND VIEW LOADING.
   */
  @ViewChild ("newPasswordInput") public newPasswordInput: any = TextBoxComponent;
  @ViewChild ("confirmPasswordInput") public confirmPasswordInput: any = TextBoxComponent;
  public eyeIcon: SVGIcon = eyeIcon;
  public uniqueCode: string = ''
  public ngAfterViewInit(): void 
  {

    /**
     * SUBSCRIBES TO CHANGES IN THE _ACTIVATEDROUTE'S PARAMS. WHEN THEY CHANGE, IT UPDATES UNIQUECODE WITH UNIQUEID FROM PARAMS.
     */
    this._activatedRoute.params.subscribe (param => 
    {
      this.uniqueCode = param ['uniqueId'];
    });

    /**
     * ASSIGNS THE "PASSWORD" TYPE TO TWO INPUT ELEMENTS, MAKING THEM DISPLAY USER-TYPED CHARACTERS AS HIDDEN.
     */
    this.newPasswordInput.input.nativeElement.type = "password";
    this.confirmPasswordInput.input.nativeElement.type = "password";
  }

  /**
   * INITIALIZES SHOWMATCHPASSWORDERROR AS FALSE AND DEFINES A TOGGLEVISIBILITY FUNCTION TAKING A FIELDNAME PARAMETER. 
   * WITHIN THE FUNCTION, IT CREATES THE INPUTEL VARIABLE BASED ON THE FIELDNAME.
   */
  public showMatchPasswordError: boolean = false;

  public toggleVisibility (fieldName: string): void 
  {
    let inputEl = fieldName == 'newPasswordInput' ? this.newPasswordInput.input.nativeElement : this.confirmPasswordInput.input.nativeElement
    /**
     * TOGGLES THE INPUT ELEMENT TYPE BETWEEN PASSWORD AND TEXT BASED ON ITS CURRENT TYPE.
     */
    if (inputEl.type === "password") 
    {
      inputEl.type = "text";
    } else 
    {
      inputEl.type = "password";
    }
  }

  /**
   * VALIDATES THE FORM WIDGET WHEN IT IS TABBED OR CLICKED OFF.
   */
  public forgotPasswordForm: any = new FormGroup
  ({
    newPassword: new FormControl ("", {validators: [Validators.required, Validators.minLength(8), Validators.pattern(/[a-zA-Z]/)], updateOn: 'blur'}),
    confirmPassword: new FormControl("", {validators: [Validators.required, Validators.minLength(8), Validators.pattern(/[a-zA-Z]/)], updateOn: 'blur'}),
  });

  /**
   * CHECKS THE TYPE OF AN INPUT ELEMENT, AND THEN CHANGES IT TO EITHER A TEXT OR PASSWORD TYPE DEPENDING ON WHAT THE ORIGINAL TYPE WAS.
   * IF THE INPUT ELEMENT'S TYPE IS ALREADY PASSWORD, THEN THE CODE WILL CHANGE IT TO TEXT. 
   * IF THE INPUT ELEMENT'S TYPE IS ANYTHING OTHER THAN PASSWORD, THEN THE CODE WILL CHANGE IT TO PASSWORD.
   */
  public submit(): void 
  {
    const isValid = this.isFormValid();
    
    /**
     * SENDS A POST REQUEST TO '/USERS/RESET-PASSWORD' IF 'ISVALID' IS TRUE, 
     * USING VALUES FROM 'FORGOTPASSWORDFORM' (NEWPASSWORD, CONFIRMPASSWORD, AND UNIQUECODE). 
     * UPON SUCCESS, THE 'SUBSCRIBE' BLOCK IS EXECUTED.
     */
    if (isValid) 
    {
      this.apiService.post ('/users/reset-password',
        {
          newPassword: this.forgotPasswordForm.value.newPassword,
          confirmPassword: this.forgotPasswordForm.value.confirmPassword,
          uniqueCode: this.uniqueCode
        }).subscribe((response) => 
        {

          /**
           * CHECKS THE RESPONSE STATUS OF A REQUEST. 
           * IF IT IS SUCCESS, IT SETS SHOWMATCHPASSWORDERROR TO FALSE AND NAVIGATES TO /RESET-PASSWORD/SUCCESS. 
           * IF THE RESPONSE STATUS IS NOT EQUAL TO 'SUCCESS', THEN NO ACTION IS TAKEN.
           */
          if (response.status === 'success') 
          {
            this.showMatchPasswordError = false;
            this.router.navigate (['/reset-password/success']);
          }
          else {
          }
        });
    }
  }

  /**
   * SETS "ISVALID" TO "TRUE" TO CHECK FORM VALIDITY.
   */
  public isFormValid() 
  {
    let isValid = true
    /**
     * CHECKS IF THE FORM IS VALID, AND IF IT IS NOT VALID, IT MARKS ALL THE FIELDS IN THE FORM AS TOUCHED. 
     * IT ALSO SETS THE VALUE OF THE VARIABLE ISVALID TO FALSE.
     */
    if (!this.forgotPasswordForm.valid) 
    {
      this.forgotPasswordForm.markAllAsTouched();
      isValid = false
    }

    /**
     * VALIDATES IF NEWPASSWORD MATCHES CONFIRMPASSWORD IN THE FORGOTPASSWORDFORM, 
     * SETTING ISVALID TO FALSE IF THEY DON'T MATCH AND RETURNING ISVALID.
     */
    if (this.forgotPasswordForm.controls.newPassword.value !== this.forgotPasswordForm.controls.confirmPassword.value) 
    {
      this.showMatchPasswordError = true;
      isValid = false
    }
    return isValid
  }
}
