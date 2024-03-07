/**
 *          FILENAME: reset-password-email.component.ts
 *             ROUTE: totalscope_webclient/src/app/modules/auth/reset-password-email/
 *            AUTHOR: ICI/NK
 *              WHAT: RESPONSIBLE FOR HANDLING EMAIL-RELATED FUNCTIONALITY, LIKE RESETTING PASSWORDS.
 *               HOW: DISPLAYS A MESSAGE FOR RESETTING A USER'S PASSWORD, AND USES A TRANSLATION SERVICE 
 * 					  TO PROVIDE INTERNATIONALIZATION SUPPORT AND REPLACE SPECIFIC PLACEHOLDERS IN THE MESSAGE.
 *   IMPORTING FILES: translation.service.ts | app-reset-password-email.ts | reset-password-email.component.html
 					  | reset-password-email.component.scss
 * SUBSCRIBING FILES: auth.module.ts | auth-routing.module.ts
 *  LAST COMMIT DATE: SEPTEMBER 15, 2023
 */

/**
 * COMPONENT | CREATES COMPONENTS WHICH ARE BASIC BUILDING BLOCKS OF AN ANGULAR APPLICATION.
 */
import {Component} from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

/**
 * TRANSLATIONSERVICE | PROVIDES TRANSLATION SERVICES.
 */
import {TranslationService} from 'src/app/services/translation/translation.service';

/**
 * @COMPONENT | DEFINES THE COMPONENT.
 * SELECTOR | NAME OF THE COMPONENT, WHICH CAN BE USED TO REFER THE COMPONENT IN HTML.
 * TEMPLATEURL | DEFINES THE HTML COMPONENT ASSOCIATED WITH THIS COMPONENT.
 * STYLEURLS | DEFINES THE STYLE SHEETS ASSOCIATED WITH THIS COMPONENT.
 */
@Component
({
	selector: 'app-reset-email-sent',
	templateUrl: './resetemailsent.component.html',
	styleUrls: ['./resetemailsent.component.scss']
})

/**
 * THE RESETPASSWORDEMAILCOMPONENT CLASS RESETS A USER'S PASSWORD. 
 * TAKES A TRANSLATIONSERVICE IN ITS CONSTRUCTOR AND USES GETTRANSLATIONS TO REPLACE [EMAIL] WITH PLACEHOLDER ADMIN@SITE.COM.
 */
export class ResetPasswordEmailComponent
{
	public translationMessage: any;

	constructor 
	(
		private translationPipe: TranslationService,
		private helperService: HelperService
	)
	{
		let translation = this.translationPipe.getTranslations ('INSTR-BOTH-LOGIN-RESETEMAILSENT-TEXT-RESETTINGINSTRUCTIONS');
		const userEmail = this.helperService.userEmail
		
		if(userEmail)
		{
			this.translationMessage = translation.replace ("[email]", userEmail);
		}
		else{
			this.translationMessage = translation.replace ("<b>[email].</b>", 'your email.');
		}
	}
}
