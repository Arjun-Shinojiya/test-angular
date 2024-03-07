/**
 *          FILENAME: auth-layout.component.ts
 *             ROUTE: totalscope_webclient/src/app/layouts/auth-layout/
 *            AUTHOR: ICI/NK
 *              WHAT: USED IN AUTHENTICATION-RELATED PAGE LAYOUTS IN TOTALSCOPE.
 *               HOW: HELPS MAINTAIN MODULARITY AND SEPARATION OF CONCERNS IN THE APPLICATION'S CODEBASE 
 *                    BY ENCAPSULATING THE LAYOUT AND BEHAVIOR OF THE AUTHENTICATION PAGE.
 *   IMPORTING FILES: auth-layout.component.html | auth-layout.component.scss
 * SUBSCRIBING FILES: index.ts 
 *  LAST COMMIT DATE: AUGUST 01, 2023
 */

/**
 * COMPONENT | CREATES COMPONENTS.
 */
import {Component} from '@angular/core';

/**
 * @COMPONENT | DEFINES THE COMPONENT'S PROPERTIES.
 * SELECTOR | DISPLAYS THE COMPONENT IN THE TEMPLATE.
 * TEMPLATEURL | SPECIFIES THE LOCATION OF THE COMPONENT'S TEMPLATE.
 * STYLEURLS | SPECIFIFIES THE LOCATION OF THE COMPONENT'S STYLE.
 */
@Component
({
  selector: 'app-auth-layout',
  templateUrl: './authlayout.component.html',
  styleUrls: ['./authlayout.component.scss']
})

/**
 * DEFINES THE AUTHLAYOUTCOMPONENT CLASS FOR AN AUTHENTICATION PAGE LAYOUT.
 */
export class AuthLayoutComponent 
{
}
