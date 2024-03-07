/**
 *          FILENAME: dashboard.component.ts
 *             ROUTE: totalscope_webclient/src/app/modules/dashboard/
 *            AUTHOR: ICI/AD
 *              WHAT: HOLDS MAIN WAREFRAME OF DASHBOARD
 *               HOW: THIS WILL INJECT THE LEFT MENU, TOP BAR AND PAGE CONTAINER.
 *   IMPORTING FILES: dashboard.component.html | dashboard.component.scss
 * SUBSCRIBING FILES: dashboard.module.ts | dashboard.routing.ts
 *  LAST COMMIT DATE: DECEMBER 12, 2023
 */

/**
 * COMPONENT | PROVIDES THE LOGIC AND TEMPLATE FOR CREATING COMPONENTS.
 */
import {Component} from '@angular/core'

/**
 * APISERVICE | MAKE CALLS TO AN API.
 * TOKENSERVICE | MANAGE TOKENS FOR AUTHENTICATION PURPOSES.
 */
import {ApiService} from "./../../../core/api.service";
import {TokenService} from 'src/app/services/token/token.service';
import {HelperService} from 'src/app/services/helper.service';

/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component
  ({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
  })

/**
 * DEFINES THE HOMECOMPONENT CLASS, WITH AN NGONINIT() FUNCTION FOR CONSOLE LOGGING DURING INITIALIZATION
 * AND AN ITEMS ARRAY FOR DISPLAYING ASSET AND TEXT INFORMATION ON THE ASSOCIATED PAGE.
 */
export class DashboardComponent
{

  private userData: any;

  constructor
    (
      private apiService: ApiService, // MAKES API CALLS TO EXTERNAL SERVICES.
      private tokenService: TokenService, // MANAGES AUTHENTICATION TOKENS.
      private helperService: HelperService // HOLDS ALL THE GLOBAL VARIABLES AND FUNCTIONS.
    )
  {
  }

  ngOnInit()
  {
    console.log('This is dashboard component');
    let userDetailString: any = localStorage.getItem("userData");
    this.userData = JSON.parse(userDetailString);
    console.log(this.userData, "user data");

    this.getRolePermission();
  }

  getRolePermission()
  {
    let payload : any = {
      user_id : this.userData.userId
    } 
    this.apiService.post('/auth/getrolepermission', payload).subscribe({
      next: (response) =>
      {
        if (response.success)
        {
          this.helperService.permissions = response.data;
        }
        console.log('response', response);

      },
      error: (err) =>
      {
        console.log('err', err)
      }
    });
  }
}
