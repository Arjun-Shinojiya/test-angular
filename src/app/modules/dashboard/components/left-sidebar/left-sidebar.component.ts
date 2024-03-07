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
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { TokenService } from 'src/app/services/token/token.service';

/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component
({
  selector: 'app-left-sidebard',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
})

export class LeftSidebarComponent
{
  constructor(
    private router: Router,
    public helper: HelperService,
    private tokenService:TokenService
  ) {}

  ngOnInit()
  {
    console.log ('This is left-sidebar component');
  }

  isLinkActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  logout()
  {
    this.tokenService.removeToken()
    localStorage.removeItem('userData')
    this.router.navigate(['/login']);
  }
}
