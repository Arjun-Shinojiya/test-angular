/**
 *          FILENAME: app-routing.module.ts
 *             ROUTE: totalscope_webclient/src/app/
 *            AUTHOR: ICI/SZ
 *              WHAT: LOADS THE SPECIFIC COMPONENTS TO BE USED WHEN THE ROUTE IS ACTIVATED.
 *               HOW: SPECIFIES HOW DIFFERENT WEB PAGES OR VIEWS WITHIN THE APPLICATION ARE ASSOCIATED WITH COMPONENTS,
 *                    HOW THEY CAN BE NAVIGATED, AND HOW TO HANDLE ROUTES THAT ARE NOT DEFINED.
 *   IMPORTING FILES: index.ts | page-not-found.component.ts | home.module.ts | about.module.ts | pricing.module.ts
 *                    | contact.module.ts | videos.module.ts | testimonials.module.ts | auth.module.ts | register.module. ts
 * SUBSCRIBING FILES: app.module.ts | auth.guard.ts | login.module.ts | resetpassword.module.ts | forgotpassword.module.ts
 *  LAST COMMIT DATE: SEPTEMBER 13, 2023
 */

/**
 * NGMODULE | SPECIFIES WHICH COMPONENTS, DIRECTIVES, AND PIPES ARE AVAILABLE TO OTHER MODULES.
 */
import {NgModule} from '@angular/core';
/**
 * ROUTERMODULE | HELPS TO DEFINE THE ROUTES FOR THE APPLICATION AND HELPS TO LINK THEM WITH THE CORRESPONDING COMPONENTS.
 * ROUTES | HELPS TO DEFINE THE PATH, THE COMPONENT THAT SHOULD BE LOADED WHEN THE PATH IS MATCHED.
 * AND ANY ADDITIONAL DATA THAT SHOULD BE PROVIDED TO THE COMPONENT.
 * PAGENOTFOUNDCOMPONENT | DISPLAYS A PAGE WHEN THE REQUESTED ROUTE IS NOT FOUND.
 */
import {RouterModule, Routes} from '@angular/router';
import {PublicLayoutComponent, AuthLayoutComponent} from "./layouts/index";
import {PageNotFoundComponent} from './modules/pagenotfound/pagenotfound.component';

/**
 * DEFINES AN ARRAY OF ROUTES FOR AN APPLICATION. EACH ROUTE HAS A PATH AND AN ASSOCIATED COMPONENT.
 * SOME ROUTES INCLUDE CHILD ROUTES THAT ARE LAZY-LOADED USING THE LOADCHILDREN PROPERTY.
 */
const routes: Routes =
	[
		{
			// SETS UP THE PATH FOR A SPECIFIC WEBPAGE, DEFINES WHAT CONTENT TO SHOW, AND ALLOWS FOR ADDITIONAL PAGES WITHIN IT.
			path: '',
			component: PublicLayoutComponent,
			children:
				[
					{
						
						// DIRECTS THE APPLICATION TO SHOW THE HOMEMODULE WHEN THE USER GOES TO THE HOME PAGE.
						path: '',
						loadChildren: () =>
							import ('./modules/home/home.module').then ((m) => m.HomeModule),
					},
					{
						
						// DIRECTS THE APPLICATION TO SHOW THE ABOUTMODULE WHEN THE USER GOES TO THE ABOUT PAGE.
						path: 'about',
						loadChildren: () =>
							import ('./modules/about/about.module').then ((m) => m.AboutModule),
					},
					{
						
						// DIRECTS THE APPLICATION TO SHOW THE PRICINGMODULE WHEN THE USER GOES TO THE PRICING PAGE.
						path: 'pricing',
						loadChildren: () =>
							import ('./modules/pricing/pricing.module').then ((m) => m.PricingModule),
					},
					{
						
						// DIRECTS THE APPLICATION TO SHOW THE CONTACTMODULE WHEN THE USER GOES TO THE CONTACT PAGE.
						path: 'contact',
						loadChildren: () =>
							import ('./modules/contact/contact.module').then ((m) => m.ContactModule),
					},
					{
						
						// DIRECTS THE APPLICATION TO SHOW THE VIDEOSMODULE WHEN THE USER GOES TO THE VIDEOS PAGE.
						path: 'videos',
						loadChildren: () =>
							import ('./modules/videos/videos.module').then ((m) => m.VideosModule),
					},
					{
						
						// DIRECTS THE APPLICATION TO SHOW THE TESTIMONIALS WHEN THE USER GOES TO THE TESTIMONIALS PAGE.
						path: 'testimonials',
						loadChildren: () =>
							import ('./modules/testimonials/testimonials.module').then ((m) => m.TestimonialsModule),
					},
				],
		},
		{
			/**
			 * SETS UP A MAIN WEBPAGE WITH A SPECIFIC LAYOUT (PUBLICLAYOUTCOMPONENT).
			 * IT ALSO INCLUDES A SUBPAGE (AUTHMODULE) THAT GETS LOADED DYNAMICALLY WHEN NEEDED.
			 */
			path: '',
			component: PublicLayoutComponent,
			children:
				[
					{path: '', loadChildren: () => import ('./modules/auth/auth.module').then (m => m.AuthModule)},
				],
		},
		{
			/**
			 * SETS UP A MAIN WEBPAGE WITH A SPECIFIC LAYOUT (AUTHLAYOUTCOMPONENT).
			 */
			path: 'dashboard',
			loadChildren: () => import ('./modules/dashboard/dashboard.module').then (m => m.DashboardModule)
		},
		{
			/**
			 * SETS UP WHAT TO SHOW WHEN A WEBPAGE PATH IS NOT FOUND IN AN ANGULAR APP.
			 * IT DISPLAYS THE MAIN LAYOUT WHEN THERE'S NO SPECIFIC PATH, AND A PAGE NOT FOUND MESSAGE FOR ANY UNDEFINED PATHS.
			 */
			path: '',
			component: PublicLayoutComponent,
			children:
				[
					{
						path: '**', // CAPTURES ANY UNDEFINED ROUTES.
						component: PageNotFoundComponent, // DISPLAYS THE PAGENOTFOUNDCOMPONENT FOR UNDEFINED ROUTES.
					},
				],
		}
	]

/**
 * IMPORTS AND EXPORTS THE ROUTERMODULE THAT HELPS WITH NAVIGATION WITHIN THE APP.
 * THIS MAKES IT ACCESSIBLE ACROSS THE APPLICATION, ENABLING SMOOTH TRANSITIONS BETWEEN DIFFERENT SECTIONS.
 */
@NgModule
({
	imports:
		[
			RouterModule.forRoot (routes), // SETS UP THE APPLICATION'S ROUTES.
		],
	exports:
		[
			RouterModule, // HELPS IN MANAGING AND DEFINING APPLICATION ROUTES.
		],
})

/**
 * SETS UP A NAVIGATION SYSTEM, ALLOWING USERS TO MOVE BETWEEN DIFFERENT SECTIONS OF THE APP.
 */
export class AppRoutingModule {}
