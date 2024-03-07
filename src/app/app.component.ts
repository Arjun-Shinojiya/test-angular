/**
 *          FILENAME: app.component.ts
 *             ROUTE: totalscope_webclient/src/app/
 *            AUTHOR: ICI/MS
 *              WHAT: MANAGES THE UI AND BEHAVIOR OF A SPECIFIC PART OF TOTALSCOPE.
 *               HOW: PROVIDES A FOUNDATION FOR THE APPLICATION'S STRUCTURE AND FUNCTIONALITY.
 *   IMPORTING FILES: api.service.ts | constants.ts | app.component.html | app.component.scss
 * SUBSCRIBING FILES: app.module.ts
 *  LAST COMMIT DATE: JUNE 15, 2023
 */

/**
 * HTTPCLIENT | MAKES HTTP REQUESTS TO A SERVER.
 * COMPONENT AND ONINIT | CREATES COMPONENTS.
 */
import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

/**
 * APISERVICE | MAKES API CALLS.
 * RESPONSESTATUS | CONTAINS CONSTANTS RELATED TO THE STATUS RESPONSE OF AN API CALL.
 */
import {ApiService} from 'src/core/api.service';
import {responseStatus} from 'src/utilities/constants';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {HelperService} from "./services/helper.service"
import {TranslationService} from "./services/translation/translation.service"

/**
 * @COMPONENT | DEFINES THE COMPONENT'S PROPERTIES.
 * SELECTOR | DISPLAYS THE COMPONENT IN THE TEMPLATE.
 * TEMPLATEURL | SPECIFIES THE LOCATION OF THE COMPONENT'S TEMPLATE.
 * STYLEURLS | SPECIFIES THE LOCATION OF THE COMPONENT'S STYLE.
 */
@Component
({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * DEFINES THE APPCOMPONENT FOR SHARING PROPERTIES AND METHODS WITH OTHER COMPONENTS, OFTEN SERVING AS AN ANGULAR APP'S ROOT COMPONENT.
 */
export class AppComponent
{
	/**
	 * CONSTRUCTOR - AUTOMATICALLY CALLED WHEN INITIALIZING THIS COMPONENT
	 */
	constructor(
		private helper: HelperService,
		private router: Router,
		private route: ActivatedRoute,
	)
	{
	}
	ngOnInit(): void
	{
		this.router.events.subscribe((routeinfo: any) =>
		{
			if (routeinfo instanceof NavigationEnd)
			{
				const url = routeinfo.url; // STORING THE URL INTO LOCAL VARIABLE.
				const urlArray = url.split ('/'); // SPLITTING THE URL ON THE BASIS OF SLASH.
				
				if (!urlArray[2] || urlArray[2] != 'contractor')
				{
				
				}
			}
		});
	}
}
