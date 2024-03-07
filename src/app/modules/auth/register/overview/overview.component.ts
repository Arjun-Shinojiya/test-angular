/**
 *          FILENAME: overview.component.ts
 *             ROUTE: totalscope_webclient/src/app/modules/auth/register/overview/
 *            AUTHOR: ICI/SZ
 *              WHAT: DISPLAYS AN OVERVIEW SECTION IN THE APPLICATION'S USER INTERFACE.
 *               HOW: DEFINES HOW THE COMPONENT SHOULD BE DISPLAYED IN THE TEMPLATES AND WHERE TO FIND ITS HTML TEMPLATE AND CSS STYLES.
 *   IMPORTING FILES: overview.component.html | overview.component.scss
 *  LAST COMMIT DATE: SEPTEMBER 12, 2023
 */
/**
 * COMPONENT | CREATES COMPONENTS.
 */
import {Component} from '@angular/core';
// Import jQuery
import * as $ from 'jquery';
// Import Kendo libraries
import '@progress/kendo-ui';
import '@progress/kendo-ui/js/kendo.mediaplayer';
import { VideoPlayerService } from '../video-player.service';

// Declare global jQuery extension
declare global {
  interface JQuery {
      kendoMediaPlayer(options?: any): JQuery;
  }
}
/**
 * @COMPONENT | DEFINES THE COMPONENT'S PROPERTIES.
 * SELECTOR | DISPLAYS THE COMPONENT IN THE TEMPLATE.
 * TEMPLATEURL | SPECIFIES THE LOCATION OF THE COMPONENT'S TEMPLATE.
 * STYLEURLS | SPECIFIFIES THE LOCATION OF THE COMPONENT'S STYLE.
 */
@Component
({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
/**
 * EXPORTS AN OVERVIEW COMPONENT CLASS WITH AN EMPTY CONSTRUCTOR FOR INITIALIZATION.
 */
export class OverviewComponent{
  private kendoMediaPlayer: any; // Type it properly if you have the type information

  constructor(private videoPlayerService: VideoPlayerService) {}

  ngOnInit(): void {
    this.initializeVideoPlayer();
    console.log("initializeVideoPlayer");
	
    // Subscribe to changes in the autoplay state
    this.videoPlayerService.autoplay$.subscribe((autoplay: boolean) => {
      this.updateAutoplay(false);
    });
  }
  initializeVideoPlayer()
  {
	  try
	  {// Initialize Kendo video player
		  const $videoPlayer = $("#videoPlayer");
		  
		  if ($videoPlayer.length === 0)
		  {
			  console.error("Video player element not found.");
			  return;
		  }
		  
		  // INITIALIZE KENDO VIDEO PLAYER
		  this.kendoMediaPlayer = $videoPlayer.kendoMediaPlayer ({
			  autoPlay: false,
			  media: {
				  title: "  ",
				  source: "https://tscopedev.s3.us-east-2.amazonaws.com/admin/overview_videos/TS_Registration_Overview.mp4"
			  }
		  }).data ('kendoMediaPlayer');
	  }
	  catch (error)
	  {
		  console.error ("Error initializing Kendo UI Media Player:", error);
	  }
  }
  
  updateAutoplay(autoplay: boolean) {
    // Check if kendoMediaPlayer is defined before attempting to play
    if (this.kendoMediaPlayer) {
      // Pause the player if it's currently playing
      this.kendoMediaPlayer.pause();

      // Set autoplay
      this.kendoMediaPlayer.options.autoPlay = autoplay;

      // Play the video if autoplay is true
      if (autoplay) {
        this.kendoMediaPlayer.play();
      }
    }
  }
}
