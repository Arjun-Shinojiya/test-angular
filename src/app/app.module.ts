/**
 *          FILENAME: app.module.ts
 *             ROUTE: totalscope_webclient/src/app/
 *            AUTHOR: ICI/SZ
 *              WHAT: THE CENTRAL FILE THAT BRINGS TOGETHER ALL THE DIFFERENT PARTS OF THE APPLICATION.
 *               HOW: ORGANIZES AND DECLARES COMPONENTS, IMPORTS REQUIRED MODULES, PROVIDES SERVICES, AND SETS THE MAIN APPLICATION COMPONENT.
 *   IMPORTING FILES: api.service.ts | app-routing.module.ts | app.component.ts | layouts.ts | loader.component.ts
 *                    | loading.interceptor.ts | page-not-found.component.ts
 * SUBSCRIBING FILES: app.component.ts | app-routing.module.ts | global-error-handler.service.ts
 *  LAST COMMIT DATE: AUGUST 13, 2023
 */

/**
 * NGMODULE | DEFINES THE COMPONENTS, DIRECTIVES, AND SERVICES.
 * BROWSERMODULE | PROVIDES SERVICES THAT ARE ESSENTIAL FOR RUNNING AN APPLICATION IN A BROWSER.
 * HTTPCLIENTMODULE | MAKES REQUESTS TO A REMOTE SERVER.
 * HTTP_INTERCEPTORS | INTERCEPTS HTTP REQUESTS AND MODIFY THEM BEFORE THEY ARE SENT TO THE SERVER.
 * BROWSERANIMATIONSMODULE | PROVIDES SUPPORT FOR ANIMATION IN THE BROWSER.
 */
import {APP_INITIALIZER, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

/**
 * BUTTONSMODULE | PROVIDES COMPONENTS AND DIRECTIVES FOR CREATING BUTTONS, TOGGLE BUTTONS, AND SPLIT BUTTONS.
 * ICONSMODULE | PROVIDES COMPONENTS FOR DISPLAYING ICONS.
 * INDICATORSMODULE | PROVIDES COMPONENTS AND DIRECTIVES FOR DISPLAYING LOADING INDICATORS.
 * INPUTSMODULE | PROVIDES COMPONENTS AND DIRECTIVES FOR CREATING INPUT FIELDS.
 * LAYOUTMODULE | PROVIDES COMPONENTS AND DIRECTIVES FOR CREATING LAYOUTS.
 * NAVIGATIONMODULE | PROVIDES COMPONENTS AND DIRECTIVES FOR NAVIGATION.
 * POPUPMODULE | PROVIDES COMPONENTS AND DIRECTIVES FOR CREATING POPUPS.
 */
import {ButtonsModule} from '@progress/kendo-angular-buttons'
import {IconsModule} from '@progress/kendo-angular-icons'
import {IndicatorsModule} from '@progress/kendo-angular-indicators'
import {InputsModule} from '@progress/kendo-angular-inputs'
import {LayoutModule} from '@progress/kendo-angular-layout'
import {NavigationModule} from '@progress/kendo-angular-navigation'
import {PopupModule} from '@progress/kendo-angular-popup'

/**
 * APISERVICE | PROVIDES AN INTERFACE TO THE APPLICATION'S API.
 * APPROUTINGMODULE | PROVIDES ROUTING FOR THE APPLICATION.
 * APPCOMPONENT | MAIN COMPONENT OF THE APPLICATION.
 * AUTHLAYOUTCOMPONENT, FOOTERCOMPONENT, NAVBARCOMPONENT, AND PUBLICLAYOUTCOMPONENT | PROVIDES THE LAYOUT FOR THE APPLICATION.
 * LOADERCOMPONENT | PROVIDES A LOADING INDICATOR.
 * LOADINGINTERCEPTOR | HANDLES LOADING INDICATORS.
 * PAGENOTFOUNDCOMPONENT | HANDLES 404 PAGE NOT FOUND ERRORS.
 */
import {ApiService} from 'src/core/api.service'
import {HelperService} from 'src/app/services/helper.service'
import {AppRoutingModule} from './approuting.module'
import {AppComponent} from './app.component'
import {AuthLayoutComponent, FooterComponent, NavbarComponent, PublicLayoutComponent,} from './layouts';
import {LoaderComponent} from './components/loader/loader.component'
import {LoadingInterceptor} from "../core/http/loading.interceptor";
import {PageNotFoundComponent} from './modules/pagenotfound/pagenotfound.component';
import {TranslationService} from "./services/translation/translation.service"
import {InitProvider} from "./services/init.provider"

// STARTING A PROVIDER THAT WILL LOAD REQUIRED DATA WHICH IS NEED TO RUN THE APP.
// LIKE TRANSLATION DATA.
// @ts-ignore
export function initProviderFactory (provider: InitProvider)
{
	// IF THERE IS A PROVIDER TO BE LOADED ON APP START?
	if (typeof provider !== 'undefined')
	{
		// CALLING THE LOAD FUNCTION IN THAT PROVIDER. THE PROVIDER'S NAME IS INIT.PROVIDER.
		// IT WILL LOAD DATA FROM DATABASE.
		return () => provider.load ();
	}
}

/**
 * DECLARES COMPONENTS AND IMPORTS MODULES.
 */
@NgModule
({
  declarations:
  [
    AppComponent,
    PublicLayoutComponent,
    NavbarComponent,
    FooterComponent,
    AuthLayoutComponent,
    LoaderComponent,
    PageNotFoundComponent
  ],
  imports:
  [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonsModule,
    IconsModule,
    IndicatorsModule,
    InputsModule,
    LayoutModule,
    NavigationModule,
    PopupModule
  ],

  // PROVIDES APISERVICE FOR DATA SERVICES.
  providers:
  [
    	ApiService,
		HelperService,
		InitProvider,
		{
		  provide: APP_INITIALIZER,
		  useFactory: initProviderFactory,
		  deps: [InitProvider],
		  multi: true
		},
		{
	
		  // PROVIDES LOADINGINTERCEPTOR AS AN HTTP INTERCEPTOR FOR LOADING INDICATORS.
		  provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
		}
  ],

  // SETS UP THE MAIN COMPONENT OF THE APP.
  bootstrap: [AppComponent],
})

/**
 * DEFINES HOW THE APP'S COMPONENTS, SERVICES, AND OTHER FEATURES COME TOGETHER.
 */
export class AppModule{}
