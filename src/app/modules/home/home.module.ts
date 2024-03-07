/**
 *          FILENAME: home.module.ts
 *             ROUTE: totalscope_webclient/src/app/modules/home/
 *            AUTHOR: ICI/SK
 *              WHAT: SERVES AS A CONTAINER FOR VARIOUS COMPONENTS AND SERVICES THAT ARE RELATED TO THE HOME PAGE.
 *               HOW: ENCAPSULATES AND ORGANIZES COMPONENTS AND MODULES RELATED TO THE HOME PAGE.
 *   IMPORTING FILES: estimate-card.component.ts | future-estimate-video.component.ts | future-estimate.component 
 *                    | home.component.ts | home.routing.ts 
 * SUBSCRIBING FILES: app-routing.module.ts
 *  LAST COMMIT DATE: SEPTEMBER 27, 2023
 */

/**
 * COMMONMODULE | PROVIDES ACCESS TO CERTAIN COMMON DIRECTIVES THAT CAN BE USED IN THE TEMPLATES OF COMPONENTS DECLARED WITHIN AN NGMODULE.
 * BUTTONSMODULE | PROVIDES ACCESS TO THE KENDO UI BUTTON COMPONENTS.
 * NGMODULE | HELPS ORGANIZE AN APPLICATION INTO COHESIVE BLOCKS OF FUNCTIONALITY.
 */
import {CommonModule} from '@angular/common'
import {ButtonsModule} from '@progress/kendo-angular-buttons'
import {NgModule} from '@angular/core'

/**
 * IMPORTS FOUR COMPONENTS AND A ROUTING MODULE FROM THE HOME DIRECTORY.
 * THE FOUR COMPONENTS ARE: ESTIMATECARDCOMPONENT, FUTUREESTIMATEVIDEOCOMPONENT, FUTUREESTIMATECOMPONENT AND HOMECOMPONENT.
 * HOMEROUTINGMODULE | CONTAINS ROUTES TO THE COMPONENTS THAT WERE IMPORTED.
 */
import {EstimateCardComponent} from './components/estimatecard/estimatecard.component'
import {FutureEstimateVideoComponent} from './components/futureestimatevideo/futureestimatevideo.component'
import {FutureEstimateComponent} from './components/futureestimate/futureestimate.component'
import {HomeComponent} from './home.component'
import {HomeRoutingModule} from './home.routing'

/**
 * DEFINES A MODULE USING THE @NGMODULE DECORATOR, CONTAINING THE HOMECOMPONENT, 
 * FUTUREESTIMATECOMPONENT, ESTIMATECARDCOMPONENT, AND FUTUREESTIMATEVIDEOCOMPONENT COMPONENTS.
 */
@NgModule
({
  declarations: 
  [
    HomeComponent, // MAIN LANDING PAGE.
    FutureEstimateComponent, // COMPONENT FOR FUTURE ESTIMATES.
    EstimateCardComponent, // CARD TO DISPLAY ESTIMATES.
    FutureEstimateVideoComponent, // VIDEO COMPONENT FOR FUTURE ESTIMATES.
  ],

  // IMPORTS AND INCLUDES HOMEROUTINGMODULE, COMMONMODULE, AND BUTTONSMODULE FROM THE LIBRARY 
  // TO MAKE THEIR COMPONENTS AND SERVICES AVAILABLE IN THE CURRENT MODULE.
  imports: [HomeRoutingModule, CommonModule,ButtonsModule],
})

/**
 * DECLARES A CLASS NAMED HOMEMODULE FOR REPRESENTING HOME-RELATED OBJECTS AND THEIR PROPERTIES IN OBJECT-ORIENTED PROGRAMMING (OOP).
 */
export class HomeModule{}
