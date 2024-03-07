/**
 *          FILENAME: about.component.ts
 *             ROUTE: totalscope_webclient/src/app/modules/about/
 *            AUTHOR: ICI/SK
 *              WHAT: CREATES LOGIC FOR THE TS ABOUT PAGE.
 *               HOW: DEFINES THE COMPONENT'S LOGIC AND PROPERTIES, PARTICULARLY AN ARRAY OF ITEMS 
 *                    REPRESENTING DIFFERENT ASPECTS OF THE USER'S EXPERIENCE.
 *   IMPORTING FILES: about.component.html | about.component.scss
 * SUBSCRIBING FILES: about.component.spec.ts | about.module.ts | about.routing.ts
 *  LAST COMMIT DATE: JULY 03, 2023
 */

/**
 * IMPORTS THE COMPONENT CLASS FROM THE ANGULAR CORE MODULE.
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
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})

/**
 * DEFINES THE ABOUTCOMPONENT CLASS WITH AN ARRAY OF ITEMS, EACH HOLDING A TEXT PROPERTY 
 * DESCRIBING THE USER'S EXPERIENCE IN THE RESTORATION CONTRACTOR INDUSTRY.
 */
export class AboutComponent 
{
  public items = 
  [
    {
      text: 'Restoration contractor company ownership',
    },
    {
      text: 'Various manufacturer certifications',
    },
    {
      text: 'Licensed adjusting experience',
    },
    {
      text: 'National industry keynote speaking',
    },
    {
      text: 'Large loss consulting',
    },
    {
      text: 'Appraisal and umpire experience',
    },
    {
      text: 'Licensed general contracting',
    },
  ]
}
