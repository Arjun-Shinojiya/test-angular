/**
 *          FILENAME: translation.service.ts
 *             ROUTE: totalscope_webclient/src/app/services/translation/
 *            AUTHOR: ICI/SZ
 *              WHAT: ALLOW USERS TO SWITCH THE APPLICATIONS'S LANGUAGE.
 *               HOW: RESPONSIBLE FOR MANAGING TRANSLATIONS IN AN APPLICATION,
 *                    INCLUDING INITIALIZING TRANSLATIONS FROM LOCAL STORAGE OR AN API.
 *   IMPORTING FILES: api.service.ts
 * SUBSCRIBING FILES: translate.pipe.ts | login-success.component.ts | language-switch.component.ts
 *                    | reset-password-email.component.ts | translation.module.ts | translations.controller.ts
 *                    | user.service.ts
 *  LAST COMMIT DATE: SEPTEMBER 14, 2023
 */

/**
 * INJECTABLE | CREATES SERVICES THAT CAN BE INJECTED INTO OTHER COMPONENTS OR SERVICES.
 */
import {Injectable} from '@angular/core';

/**
 * SUBJECT | MULTICASTS VALUES TO MULTIPLE OBSERVERS.
 * BEHAVIORSUBJECT | REPRESENTS VALUES OVER TIME WITH AN INITIAL VALUE.
 */
import {Subject} from 'rxjs';
import {BehaviorSubject} from "rxjs";

/**
 * APISERVICE | MAKES REQUESTS TO AN API, RETRIEVES DATA FROM THE API,
 * AND THEN USES THAT DATA IN THE APPLICATION.
 */
import {ApiService} from "../../../core/api.service";

/**
 * DEFINES AN INJECTABLE SERVICE IN ANGULAR.
 * @INJECTABLE | MARKS A CLASS AS AVAILABLE TO BE PROVIDED AND INJECTED AS A DEPENDENCY.
 * PROVIDEDIN | SPECIFIES WHERE THE SERVICE SHOULD BE PROVIDED.
 * ROOT | INDICATES THAT THE SERVICE SHOULD BE PROVIDED IN THE ROOT INJECTOR,
 * WHICH MEAN THAT IT IS AVAILABLE TO ALL COMPONENTS IN THE APPLICATION.
 */
@Injectable
({
  providedIn: 'root'
})

/**
 * THE TRANSLATIONSERVICE CLASS IS RESPONSIBLE FOR PROVIDING TRANSLATIONS FOR APPLICATION TEXT.
 * THE CONSTRUCTOR IS RESPONSIBLE FOR INITIALIZING THE TRANSLATIONSERVICE,
 * AND FOR RETRIEVING TRANSLATIONS FROM LOCAL STORAGE OR THE API, IF NEEDED.
 * THE GETTRANSLATIONS METHOD RETRIEVES THE TRANSLATED CONTENT FOR A SPECIFIED KEY,
 * BASED ON THE CURRENT LANGUAGE.
 * THE SWITCHLANGUAGE METHOD IS RESPONSIBLE FOR SWITCHING THE APPLICATION'S LANGUAGE
 * AND NOTIFYING OBSERVERS.
 */
export class TranslationService
{
  private currentLang:any = 'english';
  private translations:any;
  private languageChange = new BehaviorSubject<string> ('english');

  /**
   * DECLARES A PRIVATE VARIABLE APISERVICE OF TYPE APISERVICE WITHIN A CLASS CONSTRUCTOR,
   * RESTRICTING ITS ACCESS TO ONLY WITHIN THE CLASS.
   */
  constructor (private apiService: ApiService)
  {
    /**
     * CHECKS IF THE SELECTEDLANGUAGE ITEM EXISTS IN LOCAL STORAGE.
     * IF IT DOES, THE CURRENTLANG VARIABLE IS SET
     * TO THE VALUE OF THE SELECTEDLANGUAGE (E.G. ENGLISH).
     */
     if(sessionStorage.getItem ('selectedLanguage'))
    {
      this.currentLang = sessionStorage.getItem ('selectedLanguage');
    }

    /**
     * RETRIEVES THE ITEM STORED IN LOCAL STORAGE WITH THE KEY TRANSLATIONS.
     */
    this.translations = sessionStorage.getItem ('translations');

    /**
     * CHECKS IF THIS.TRANSLATIONS IS DEFINED AND NOT EQUAL TO UNDEFINED.
     * IF TRUE, IT PARSES THIS.TRANSLATIONS AS JSON. IF FALSE, IT FETCHES DATA
     * FROM THE APISERVICE USING THE GET METHOD AT /TRANSLATION/MULTI-TRANSLATION
     * AND ASSIGNS THE RECEIVED RESPONSE.DATA TO THIS.TRANSLATIONS.
     */
    if (this.translations && this.translations != 'undefined')
    {
      this.translations = JSON.parse (this.translations);
    } else
    {
      this.apiService.get ('/translation/multi-translation').subscribe
      ({
        next: (response) =>
        {
          this.translations = response.data;

          /**
           * SEE IF THERE IS ANY DATA IN THE RESPONSE.DATA VARIABLE.
           * IF THERE IS, SET THAT DATA TO A KEY CALLED TRANSLATIONS IN THE LOCAL STORAGE.
           * IF THERE IS AN ERROR, DO NOTHING.
           */
          if (response.data)
          {
            sessionStorage.setItem ('translations', JSON.stringify (response.data))
          }
        },
        error: (err) =>
        {
        }
      })
    }
  }

  /**
   * RETRIEVES A TRANSLATION FROM LOCAL STORAGE.
   */
  public getTranslations (key: string): string
  {
    const translations = JSON.parse(sessionStorage.getItem ('translations') || '{}');
	
    /**
     * CHECK FOR A GIVEN KEY IN TWO DIFFERENT DATABASE TABLES (CALLED OBJECTS):
     * THIS.TRANSLATIONS['INSTRUCTIONS'] AND THIS.TRANSLATIONS['MESSAGES'].
     */
    if (typeof translations['instructions'] !== "undefined" && translations['instructions']?.[key])
    {
      return translations['instructions'][key]?.[this.currentLang]
    }
    else if (typeof translations['instructions'] !== "undefined" && translations['messages']?.[key])
    {
      return translations['messages'][key]?.[this.currentLang + 'Message']
    }
    return key;
  }

  /**
   * ALLOWS A USER TO SWITCH LANGUAGES.
   */
  public switchLanguage (lang: string): void
  {
    this.currentLang = lang;
    sessionStorage.setItem ('selectedLanguage', lang);
    this.languageChange.next (lang);
  }
}
