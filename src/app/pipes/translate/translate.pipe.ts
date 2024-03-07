/**
 *          FILENAME: translate.pipe.ts
 *             ROUTE: totalscope_webclient/src/app/pipes/translate/
 *            AUTHOR: ICI/NK
 *              WHAT: ALLOWS FOR DYNAMIC TRANSLATION OF TEXT FROM ENGLISH TO SPANISH.
 *               HOW: ENSURES THAT TRANSLATIONS ARE DYNAMIC AND NOT CACHED, MAKING IT SUITABLE FOR SCENARIOS 
 *                    WHERE REAL-TIME TRANSLATIONS ARE REQUIRED
 *   IMPORTING FILES: translation.service.ts
 * SUBSCRIBING FILES: shared.module.ts
 *  LAST COMMIT DATE: AUGUST 04, 2023
 */

/**
 * PIPE | CREATES CUSTOM PIPES.
 * PIPETRANSFORM | PERFORMS THE ACTUAL DATA TRANSFORMATION.
 */
import {Pipe, PipeTransform} from '@angular/core';

/**
 * TRANSLATIONSERVICE | SERVICE FOR TRANSLATING TEXT FROM ENGLISH TO SPANISH.
 */
import {TranslationService} from 'src/app/services/translation/translation.service';

/**
 * DEFINES AN ANGULAR PIPE CALLED 'TRANSLATE' AND SPECIFIES THAT IT SHOULD NOT CACHE RESULTS, 
 * WHICH IS COMMON FOR TRANSLATION PIPES TO ENSURE DYNAMIC TRANSLATIONS.
 */
@Pipe
({
  name: 'translate',
  pure: false
})

/**
 * DEFINES A TRANSLATEPIPE CLASS IMPLEMENTING PIPETRANSFORM, WITH A CONSTRUCTOR TAKING A TRANSLATIONSERVICE 
 * AND A TRANSFORM METHOD FOR TRANSLATING KEYS USED IN TEMPLATES.
 */
export class TranslatePipe implements PipeTransform 
{
  data: any;

  constructor (private translationService: TranslationService) 
  {
  }
  
  transform (key: string): string 
  {
    return this.translationService.getTranslations (key);
  }
}
