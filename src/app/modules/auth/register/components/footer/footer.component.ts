/**
 *          FILENAME: footer.component.ts
 *             ROUTE: totalscope_webclient/src/app/modules/auth/register/components/footer/
 *            AUTHOR: ICI/SZ
 *              WHAT: DISPLAYS A FOOTER SECTION IN THE APPLICATION'S USER INTERFACE.
 *               HOW: DEFINES HOW THE COMPONENT SHOULD BE DISPLAYED IN THE TEMPLATES AND WHERE TO FIND ITS HTML TEMPLATE AND CSS STYLES.
 *   IMPORTING FILES: footer.component.html | footer.component.scss
 * SUBSCRIBING FILES: index.ts | footer.component.spec.ts | register.module.ts
 *  LAST COMMIT DATE: SEPTEMBER 12, 2023
 */

/**
 * COMPONENT | CREATES COMPONENTS.
 */
import {Component, EventEmitter, Output} from '@angular/core';
import { VideoPlayerService } from '../../video-player.service';

/**
 * @COMPONENT | DEFINES THE COMPONENT'S PROPERTIES.
 * SELECTOR | DISPLAYS THE COMPONENT IN THE TEMPLATE.
 * TEMPLATEURL | SPECIFIES THE LOCATION OF THE COMPONENT'S TEMPLATE.
 * STYLEURLS | SPECIFIFIES THE LOCATION OF THE COMPONENT'S STYLE.
 */
@Component
({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

/**
 * EXPORTS A FOOTER COMPONENT CLASS WITH AN EMPTY CONSTRUCTOR FOR INITIALIZATION.
 */
export class footerComponent {
  // Injecting the VideoPlayerService into the component through the constructor
  constructor(private videoPlayerService: VideoPlayerService) {}

  // EventEmitter to emit an event when showOverview state changes
  @Output() emitShowOverview = new EventEmitter<boolean>();

  // Property to store the state of showOverview, initialized as false
  public showOverview = false;

  // Method to toggle the showOverview state, emit an event, and update the VideoPlayerService
  updateShowOverview() {
    //debugger; // Debugger statement for debugging purposes

    // Toggle the showOverview state
    this.showOverview = !this.showOverview;

    // Emit an event with the updated showOverview state
    this.emitShowOverview.emit(this.showOverview);

    // Update the VideoPlayerService with the latest showOverview state
    this.videoPlayerService.setAutoplay(false);
  }
}