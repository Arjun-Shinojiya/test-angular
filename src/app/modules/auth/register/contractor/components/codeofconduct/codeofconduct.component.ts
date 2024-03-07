/*
	FILENAME: src\app\modules\auth\register\contractor\components\codeofconduct\codeofconduct.component.ts
	AUTHOR: ICI/SS
	SUMMARY: HOLDS THE REGISTRATION CODE OF CONDUCT INSTRUCTIONS.
	PURPOSE: TO MAKE MULTIPLE COMPONENTS TO GET USE IN DIFFERENT PLACES AND STAY SEPARATE OF CONCERNS
	IMPORTING FILES: codeofconduct.component.html | codeofconduct.component.scss
	SUBSCRIBING FILES: register.module.ts
	LAST COMMIT DATE: November 29, 2023
*/
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import {CommonService} from "src/app/services/common.service";
import {GenericService} from "src/app/services/generic.service";
import { HelperService } from 'src/app/services/helper.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";

@Component({
	selector: "app-codeofconduct",
	templateUrl: "./codeofconduct.component.html",
	styleUrls: ["./codeofconduct.component.scss"],
})
export class CodeofconductComponent
{
	// INPUT FOR COMPANY TYPE AND CURRENT STEP
	@Input() companyType: string = "";
	@Input() current: number = 0;
	public entityId = "";

	// OUTPUT SHOWS CURRENT STEP FOR REGISTRATION FORM

	@Output() currentPage = new EventEmitter();

	@Output() isValid = new EventEmitter();

	public codeOfConductForm: FormGroup | any;

	public stepSubcription: any;

	/**
	 * CONSTRUCTOR - THIS IS A DEFAULT FUNCTION THAT WILL BE AUTOMATICALLY WHEN THIS COMPONENT WILL BE INITIATED
	 * @param formBuilder FormBuilder
	 */
	constructor(
		private formBuilder: FormBuilder,
		private commonService: CommonService,
		private genericService: GenericService,
		private helper: HelperService,
		private router: Router
	) { }

	// TBD
	ngOnInit(): void
	{
		this.entityId = this.commonService.contractorDetails.entity_id;

		if (this.entityId)
		{
			this.getCreateUser(this.entityId);
		}

		// INITIALIZING REACTIVE ENTITY PROFILE FORM
		this.codeOfConductForm = this.formBuilder.group({
			insuranceFraud: new FormControl("", {validators: [Validators.requiredTrue]}),
			licensing: new FormControl("", {validators: [Validators.requiredTrue]}),
			insurance: new FormControl("", {validators: [Validators.requiredTrue]}),
			safety: new FormControl("", {validators: [Validators.requiredTrue]}),
			warranties: new FormControl("", {validators: [Validators.requiredTrue]}),
			supplements: new FormControl("", {validators: [Validators.requiredTrue]}),
			submittals: new FormControl("", {validators: [Validators.requiredTrue]}),
			distributors: new FormControl("", {validators: [Validators.requiredTrue]}),
			subcontractedLabor: new FormControl("", {validators: [Validators.requiredTrue]}),
		});

		this.stepSubcription = this.helper.onSteperChange.subscribe((step: any) =>{
			this.onSteperSelected(step);
		});
	}

	ngOnDestroy()
	{
		this.stepSubcription.unsubscribe();
	}

	// TO CHECK THE VALIDATION OF FORM
	public validateForm()
	{
		let isValid = true;
		if (this.codeOfConductForm.invalid)
		{
			isValid = false;
			this.codeOfConductForm.markAllAsTouched();
		}
		return isValid;
	}

	/**
	 * @title GET CREATED USERS DATA
	 */
	public getCreateUser(entityId: any)
	{
		this.genericService.get(`registration-steps/get-step-3?entity_id=${entityId}`).subscribe({
			next: (response) =>
			{
				if (response.status === "success")
				{
					for (let data of response.data)
					{
						this.commonService.emailsArray.push(data.email);
					}
				} else
				{
					console.log("error", response.message);
				}
			},
			error: (error) =>
			{
				console.log("error", error);
			},
		});
	}

	/**
	 * @title TO CHANGE THE STEPPER TO NEXT
	 */
	public onNext()
	{
		const isValid = this.validateForm();
		if (isValid)
		{
			this.currentPage.emit(this.current + 1);
			this.isValid.emit(true);

			this.genericService.post("auth/sendEmail", {emails: this.commonService.emailsArray, }).subscribe({
				next: (res) =>
				{
					if (res.status === "success")
					{
						console.log("SEND EMAIL RESPONSE", res);
						this.commonService.emailsArray = [];
					}
				},
				error: (err) =>
				{
					console.log("ERROR SENDING EMAIL", err);
				},
			});
		}
	}

	// CALL THIS FUNTION ON CHANGE STEPER ON CLICK
	public async onSteperSelected (stepNumber: any)
	{	
		if(stepNumber > this.current)
		{
			const isValid = this.validateForm();
			if (isValid)
			{
				this.currentPage.emit(stepNumber);
				this.isValid.emit(true);

				this.genericService.post("auth/sendEmail", {emails: this.commonService.emailsArray, }).subscribe({
					next: (res) =>
					{
						if (res.status === "success")
						{
							console.log("SEND EMAIL RESPONSE", res);
							this.commonService.emailsArray = [];
							
						}
					},
					error: (err) =>
					{
						console.log("ERROR SENDING EMAIL", err);
					},
				});
			} else {
				this.helper.onSteperValidationError.next(4);
			}
		}else{
			this.currentPage.emit(stepNumber);
		}
	}

	/**
	 * @title TO CHANGE THE STEPPER TO PREVIOUS
	 */
	public onBack()
	{
		this.changePage(this.current - 1);
	}

	/**
	 * @title TO CHECK THE VALIDATION AND CHANGE THE STEPPER ACCORDING TO PARAM
	 *
	 * @description
	 *    * WE ARE EMITTING AN EMITTER THAT WILL TELL THE CURRENT PAGE NUMBER TO PARENT
	 *        * SHOULD WE MOVE NEXT OR BACK
	 *
	 * @param pageNumber number
	 */
	public changePage(pageNumber: number)
	{
		this.currentPage.emit(pageNumber);
	}
}
