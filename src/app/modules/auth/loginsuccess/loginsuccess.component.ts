/*
			FILENAME: totalscope_webclient/src/app/modules/auth/login-success/login-success.component.ts
			  AUTHOR: ICI/NK
			 SUMMARY: TBD | PLEASE PROVIDE A SUMMARY
 			 PURPOSE: TBD | PLEASE PROVIDE A PURPOSE
 	 IMPORTING FILES: translation.service.ts | app-login-success.ts | login-success.component.html
 					  | login-success.component.scss
   SUBSCRIBING FILES: N/A
 	LAST COMMIT DATE: AUGUST 22, 2023
*/

// TBD
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';

// TBD
import {TranslationService} from 'src/app/services/translation/translation.service';

// TBD
@Component
({
	selector: 'app-login-success',
	templateUrl: './loginsuccess.component.html',
	styleUrls: ['./loginsuccess.component.scss']
})

// TBD
export class LoginSuccessComponent
{
	LOGINSUCCESSFULMESSAGE: any

	// TBD
	constructor
	(
		private router: Router,
		private translationPipe: TranslationService,
		private tokenService: TokenService
	)
	{
		this.LOGINSUCCESSFULMESSAGE =
		this.translationPipe.getTranslations ('INSTR-WEB-LOGIN-LOGINSUCCESSFUL-TEXT-LOGINSUCCESSFULMESSAGE');

		// TBD
		if (!localStorage.getItem ('loginToken'))
		{
			this.router.navigate ( ['login']);
		}
	}
}
