/*
	FILENAME: src\app\modules\auth\register\contractor\components\conclusion\conclusion.component.ts
	AUTHOR: ICI/SS
	SUMMARY: HOLDS THE REGISTRATION COMPLETED MESSAGE.
	PURPOSE: TO MAKE MULTIPLE COMPONENTS TO GET USE IN DIFFERENT PLACES AND STAY SEPARATE OF CONCERNS
	IMPORTING FILES: conclusion.component.html | conclusion.component.scss
	SUBSCRIBING FILES: register.module.ts
	LAST COMMIT DATE: November 29, 2023
*/
import { Component } from '@angular/core';
import {CommonService} from 'src/app/services/common.service';
import {GenericService} from 'src/app/services/generic.service';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.scss']
})
export class ConclusionComponent {

	constructor(
		private commonService:CommonService,
        private genericService:GenericService
	){
	}

	onResendEmail(){
		this.genericService.post('auth/sendEmail',{
			emails:this.commonService.emailsArray
		}).subscribe({
			next:(res)=>{
				console.log("SEND EMAIL RESPONSE",res)
			},
			error:(err)=>{
				console.log("ERROR SENDING EMAIL",err)
			}
		})
	}
}
