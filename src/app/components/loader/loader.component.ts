/**
 *          FILENAME: loader.component.ts
 *             ROUTE: totalscope_webclient/src/app/components/loader/
 *            AUTHOR: ICI/NK
 *              WHAT: DISPLAY A LOADING INDICATOR IN THE APPLICATION.
 *               HOW: CREATE A LOADING INDICATOR THAT CAN BE USED TO SHOW THAT THE APPLICATION IS PERFORMING AN ASYNCHRONOUS TASK, 
 *                    SUCH AS LOADING DATA OR RESOURCES.
 *   IMPORTING FILES: loader.service.ts | loader.component.html | loader.component.scss
 * SUBSCRIBING FILES: app.module.ts | loader.component.spec.ts
 *  LAST COMMIT DATE: AUGUST 22, 2023
 */

/**
 * COMPONENT | PROVIDES THE BASIC BUILDING BLOCKS FOR CREATING COMPONENTS.
 * LOADERTYPE, LOADERTHEMECOLOR, LOADERSIZE | CREATES A LOADING INDICATOR TO INDICATE THAT THE APPLICATION IS PERFORMING AN ASYNCHRONOUS TASK.
 */
import {Component} from '@angular/core';
import {LoaderType, LoaderThemeColor, LoaderSize} from "@progress/kendo-angular-indicators";

/**
 * LOADERSERVICE | PROVIDES FUNCTIONS RELATED TO LOADING DATA OR RESOURCES.
 */
import {LoaderService} from "../../services/loader/loader.service";

/**
 * @COMPONENT | DEFINES THE COMPONENT, AND IT TAKES AN OBJECT WITH DIFFERENT PROPERTIES TO DEFINE THE COMPONENT.
 * SELECTOR | USED TO REFERENCE THE COMPONENT IN OTHER HTML TEMPLATES.
 * TEMPLATEURL | DEFINES THE HTML TEMPLATE FOR THE COMPONENT.
 * STYLEURLS | DEFINES THE STYLESHEETS FOR THE COMPONENT.
 */
@Component
({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

/**
 * DEFINES A LOADERCOMPONENT CLASS THAT CREATES A WEB PAGE LOADER ELEMENT. IT USES A LOADERSERVICE IN ITS CONSTRUCTOR. 
 * THE LOADER OBJECT IN THE CLASS HOLDS ITS TYPE, THEME COLOR, AND SIZE, SET TO INFINITE-SPINNER, SECONDARY, 
 * AND LARGE BY DEFAULT.
 */
export class LoaderComponent 
{
  constructor
  (
    /**
     * ACCCESS THE FUNCTIONALITY OF THE LOADERSERVICE CLASS.
     */
    public loaderService: LoaderService
  ){}

  /**
   * DEFINES AN OBJECT WITH THREE PROPERTIES: TYPE (INFINITE-SPINNER), THEMECOLOR (SECONDARY), AND SIZE (LARGE), 
   * USED FOR CONFIGURING A LOADER COMPONENT TO INDICATE ONGOING ACTIONS (E.G., DATA LOADING).
   */
  public loader = 
  {
    type: <LoaderType> "infinite-spinner",
    themeColor: <LoaderThemeColor> "secondary",
    size: <LoaderSize> "large",
  }
}
