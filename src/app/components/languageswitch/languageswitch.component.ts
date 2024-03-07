/**
 *          FILENAME: language-switch.component.ts
 *             ROUTE: totalscope_webclient/src/component/language-switch/
 *            AUTHOR: ICI/NK
 *              WHAT: ALLOWS USERS TO TOGGLE BETWEEN SPANISH AND ENGLISH LANGUAGES IN THE APPLICATION.
 *               HOW: INITIALIZES THE LANGUAGE STATE BASED ON THE LOCAL STORAGE AND PROVIDES A METHOD TO TOGGLE BETWEEN LANGUAGES.
 *   IMPORTING FILES: translation.service.ts | language-switch.component.html | language-switch.component.scss
 * SUBSCRIBING FILES: language-switch.component.spec.ts
 *  LAST COMMIT DATE: AUGUST 08, 2023
 */

/**
 * COMPONENT | PROVIDES THE BASIC BUILDING BLOCKS FOR CREATING COMPONENTS.
 */
import {Component} from '@angular/core';

/**
 * TRANSLATIONSERVICE | TRANSLATES TEXT IN THE APPLICATION.
 */
import {TranslationService} from 'src/app/services/translation/translation.service';

/**
 * SELECTOR | DEFINES THE HTML ELEMENT THAT WILL BE USED TO REPRESENT THIS COMPONENT IN THE TEMPLATE.
 * TEMPLATEURL | DEFINES THE HTML TEMPLATE THAT WILL BE USED TO RENDER THIS COMPONENT IN THE DOM.
 * STYLEURLS | DEFINES AN ARRAY OF CSS FILES THAT WILL BE USED TO STYLE THIS COMPONENT.
 */
@Component
({
  selector: 'app-language-switch',
  templateUrl: './languageswitch.component.html',
  styleUrls: ['./languageswitch.component.scss']
})

/**
 * HANDLES LANGUAGE SWITCHING USING A LANGUAGESWITCHCOMPONENT. 
 * IT STORES TRANSLATIONS FOR TWO LANGUAGES AND CHECKS IF THE LANGUAGE IS SET TO SPANISH. 
 * IN THE CONSTRUCTOR, IT SETS THE CHECKED PROPERTY BASED ON THE CURRENT LANGUAGE. 
 * THE ONCHANGE METHOD TOGGLES BETWEEN SPANISH AND ENGLISH BASED ON THE CHECKED VALUE (TRUE FOR SPANISH, FALSE FOR ENGLISH).
 */
export class LanguageSwitchComponent 
{
  /**
   * DEFINES AN ANY TYPE VARIABLE TRANSLATIONS, A BOOLEAN CHECKED SET TO FALSE, 
   * AND A CONSTRUCTOR FOR A TRANSLATIONSERVICE WITH A PARAMETER OF THE SAME TYPE.
   */
  translations: any;
  public checked: boolean = false;
  constructor (private translationService: TranslationService) 
  {
    
    /**
     * CHECKS IF THE VALUE OF A SELECTEDLANGUAGE KEY IN THE LOCAL STORAGE IS EQUAL TO SPANISH. 
     * IF IT IS, THEN IT CHECKED PROPERTY OF THE ELEMENT IS SET TO TRUE.
     */
    if (localStorage.getItem ('selectedLanguage') == "spanish") 
    {
      this.checked = true;
    }
  }

  /**
   * DEFINES A METHOD IN A CLASS THAT TAKES A BOOLEAN ARGUMENT AND PERFORMS AN ACTION BASED ON IT, WITHOUT RETURNING ANYTHING.
   */
  public onChange (value: boolean): void 
  {

    /**
     * TOGGLES BETWEEN SPANISH AND ENGLISH LANGUAGE USING THE SWITCHLANGUAGE FUNCTION FROM THE TRANSLATIONSERVICE, 
     * BASED ON A TRUE OR FALSE VALUE.
     */
    if (value) 
    {
      this.translationService.switchLanguage ("spanish");
    } 
    else 
    {
      this.translationService.switchLanguage ("english");
    }
  }
}

