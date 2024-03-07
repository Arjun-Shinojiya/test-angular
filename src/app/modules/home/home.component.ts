/**
 *          FILENAME: home.component.ts
 *             ROUTE: totalscope_webclient/src/app/modules/home/
 *            AUTHOR: ICI/NK
 *              WHAT: DISPLAYS A LIST OF ITEMS WITH ICONS AND TEXT IN TOTALSCOPE.
 *               HOW: PROVIDES A REUSABLE COMPONENT FOR A SPECIFIC PAGE OR VIEW IN THE APPLICATION, 
 *                    AND OUTLINES THE STRUCTURE AND BEHAVIOR, AND THE DATA IT WILL RENDER AS A LIST OF ITEMS
 *                    WITH ICONS AND TEXTS.
 *   IMPORTING FILES: home.component.html | home.component.scss
 * SUBSCRIBING FILES: home.module.ts | home.routing.ts
 *  LAST COMMIT DATE: JULY 13, 2023
 */

/**
 * COMPONENT | PROVIDES THE LOGIC AND TEMPLATE FOR CREATING COMPONENTS.
 */
import {Component} from '@angular/core'

/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component
({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

/**
 * DEFINES THE HOMECOMPONENT CLASS, WITH AN NGONINIT() FUNCTION FOR CONSOLE LOGGING DURING INITIALIZATION 
 * AND AN ITEMS ARRAY FOR DISPLAYING ASSET AND TEXT INFORMATION ON THE ASSOCIATED PAGE.
 */
export class HomeComponent 
{
  ngOnInit() 
  {
    console.log ('This is for testing');
  }

  // CREATES AN ARRAY OF OBJECTS WITH ICONS AND TEXT FOR DISPLAYING ITEM LISTS.
  public items = 
  [
    {
      icon: 'assets/images/svg/Icons1.svg', // PROVIDES PRECISE AND WELL-DOCUMENTED INDUSTRY ESTIMATES.
      text: 'The most accurate and documented estimates in the industry',
    },
    {
      icon: 'assets/images/svg/Icons2.svg', // REPRESENTS THE ENTIRE PROJECT SCOPE.
      text: 'Representation of the full scope of the project',
    },
    {
      icon: 'assets/images/svg/Icons3.svg', // SAVES TIME IN ESTIMATING AND COMMUNICATING WITH THE CARRIER.
      text: 'Time-saving estimates and communication with the carrier',
    },
    {
      icon: 'assets/images/svg/Icons4.svg', // ENSURES THE PROJECT IS VALUED CORRECTLY.
      text: 'Proper project valuation',
    },
    {
      icon: 'assets/images/svg/Icons5.svg', // OFFERS AN AUTOMATED PROCESS MANAGEMENT VIA FREE APP.
      text: 'Automated process management with our free app',
    },
  ]
}
