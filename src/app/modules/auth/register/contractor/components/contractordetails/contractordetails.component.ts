/**
 *					FILENAME: contractordetails.component.ts
 *						AUTHOR: ICI/SZ
 *							WHAT: HOLDS THE REGISTRATION FROM FOR COMPANY DETAILS.
 *							 HOW: THIS FILE CONTAINS DETAILS FOR THE COMPANY WE ARE REGISTERING LIKE IT'S NATURE, COMPANY LOGO AND ALL THAT
 *	 IMPORTING FILES: WE ARE IMPORTING NO FILE HERE
 * SUBSCRIBING FILES: register.module.ts | registration.component.html
 *	LAST COMMIT DATE: SEPTEMBER 19, 2023
 */
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from 'src/app/services/common.service';
import {GenericService} from 'src/app/services/generic.service';
import { HelperService } from 'src/app/services/helper.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";

// TBD
@Component({
	selector: "app-contractor-details",
	templateUrl: "./contractordetails.component.html",
	styleUrls: ["./contractordetails.component.scss"],
})

// TBD
export class ContractorDetailsComponent
{
	/**
	 * CONSTRUCTOR - THIS IS A DEFAULT FUNCTION THAT WILL BE AUTOMATICALLY WHEN THIS COMPONENT WILL BE INITIATED
	 * @param formBuilder FormBuilder
	 */
	constructor(
		private formBuilder: FormBuilder,
		private genericService: GenericService,
		private commonService: CommonService,
		private http:HttpClient,
		private helper: HelperService,
		private router: Router
	) { }
	// INPUT FOR COMPANY TYPE AND CURRENT STEP
	@Input() companyType: string = "";
	@Input() current: number = 0;

	// CREATING OUTPUT EMITTER FOR DATA COMMUNICATION TO PARENT COMPONENTS
	@Output()
	currentPage = new EventEmitter();

	// TBD
	@Output()
	isValid = new EventEmitter();
	public stepSubcription: any;

	// TBD
	public imageUrl = "";
	public file: any;
	public productChoice: string = "EST";
	public roofingNature: string = "Residential";
	public contractorDetialsForm: FormGroup | any;
	public payload: any;
	public entityId: string = "";
	public nextClicked: boolean = false;
	public original_url = "";
	public original = "";
	public contractorId:string = '';
	@ViewChild('files') fileInput!: ElementRef;

	// TBD
	ngOnInit(): void
	{
		// INITIALIZING REACTIVE ENTITY PROFILE FORM
		this.contractorDetialsForm = this.formBuilder.group({
			roofingNature: new FormControl("", {
				validators: [Validators.required],
				updateOn: "blur",
			}),
			uploadImage: new FormControl(""),
			productChoice: new FormControl("EST"),
		});

		this.entityId = this.commonService.contractorDetails.entity_id;
		this.contractorId = this.commonService.contractorDetails.contractor_id;
		
		if(this.entityId && this.contractorId){
			this.getContractorDetails(this.entityId);
		}

		this.stepSubcription = this.helper.onSteperChange.subscribe((step: any) =>{
			this.onSteperSelected(step);
		});
		console.log('contractorDetails',this.commonService.contractorDetails);
	}

	ngOnDestroy()
	{
		this.stepSubcription.unsubscribe();
	}

	/**
	 * @title THIS WILL BE USED TO CHANGE THE VALUE OF ROOFING NATURE
	 *
	 * @param buttonType string
	 */
	public changeRoofingNature(buttonType: string): void
	{
		this.contractorDetialsForm.get("roofingNature").setValue(buttonType);
		this.nextClicked = false;
	}

	// TO CHECK THE VALIDATION OF FORM
	public validateForm()
	{
		let isValid = true;
		if (this.contractorDetialsForm.invalid)
		{
			isValid = false;
			this.contractorDetialsForm.markAllAsTouched();
		}
		return isValid;
	}

	// SAVE CONTRACTOR PROFILE
	public saveContractorDetails()
	{
		return new Promise((resolve, reject) =>
		{
			const formValue = this.contractorDetialsForm.value;

			this.payload = {
				entity_id: this.commonService.contractorDetails.entity_id,
				contractor_id: this.commonService.contractorDetails.contractor_id,
				jobtypesdone: formValue.roofingNature,
				productchoicestatus: formValue.productChoice,
			};

			if (this.file)
			{
				this.entityId = this.commonService.contractorDetails.entity_id;
				this.genericService.get(`company-logo-get-signed-url?entity_id=${this.entityId}`).subscribe({

					next: (response) =>
					{
						if (response.status === "success")
						{
							resolve(true);

							this.original_url = response.data.original_url;
							this.original = response.data.original;

							let formData = new FormData();
							formData.append("myfile", this.file);

							this.genericService.puturl(`${this.original_url}`, this.file).subscribe({
								next: (response) =>
								{
									if (response.status === 200)
									{
										resolve(true);
										this.payload.logourl = this.original;
										this.saveData();
									}
									else
									{
										reject(response.statusText);
									}
								},
								error: (error) =>
								{
									reject(error.statusText);
								},
							});
						}
						else
						{
							reject(response.statusText);
						}
					},
					error: (error) =>
					{
						reject(error.message);
					},
				});
			}
			else
			{
				resolve(this.saveData());
			}
		});
	}

	saveData()
	{
		return new Promise((resolve, reject) =>
		{
			const isValid = this.validateForm();

			if (isValid)
			{
				this.genericService.post("auth/contractorDetails", this.payload).subscribe({
					next: (response) =>
					{
						if (response.status === "success")
						{
							resolve(true);
						}
						else
						{
							reject(response.message);
						}
					},
					error: (error) =>
					{
						reject(error.message);
					},
				});
			}
			else
			{
				reject("Invalid Field");
			}
		});
	}

	// GET CONTRACTOR PROFILE DATA

	public getContractorDetails(entityId : any)
	{
		this.genericService.get(`registration-steps/get-step-2?entity_id=${entityId}`).subscribe({
			next: (response) =>
			{
				if (response.status === 'success')
				{
					this.mapFormFields(response.data[0]);
				}
				else
				{
					console.log('error',response.message);
				}
			},
			error: (error) =>
			{
				console.log('error',error);
			}
		});
	}

	// SET THE VALUE IN THIER RESPECTIVE FIELDS
	public mapFormFields (data: any){
		this.contractorDetialsForm?.get('roofingNature')?.setValue(data.jobtypesdone);
		this.contractorDetialsForm?.get('productChoice')?.setValue("EST");
		this.productChoice = "EST";

		if(data.logourl){
			fetch(data.logourl).then((response)=>{
				if (response.ok) {
					return response.blob().then((myBlob:any)=>{
						const lastIndex = data.logourl.lastIndexOf('/');
						const fileName = data.logourl.substr(lastIndex+1);
						myBlob.lastModifiedDate = new Date();
						myBlob.name = fileName;
	
						const fileType = myBlob?.type;
						const parts = [myBlob];
						const options = { type: fileType };
					 
						const file = new File(parts, fileName, options);
						let reader = new FileReader();
	
						reader.onload = (event: any) =>
						{
							this.imageUrl = event.target.result;
						};
	
						reader.readAsDataURL(file);
						this.file = file;
					});
				
				} else {
					return response.json().then(function(jsonError) {
						// ...
					});
				}
			}).catch(function(error) {
				console.log('There has been a problem with fetch operation: ', error.message);
			});
		}
	}

	/**
	 * @title THIS FUNCTION WILL BE CALLED WHEN USER DROPS THE IMAGES IN "DROP FILES HERE" AREA
	 *
	 * @description
	 *    * WE ARE GETTING AN EVENT (ANGULAR PROVIDE THIS THING WHILE HANDLING A DROP EVENT)
	 *    * THE FILE USER DROPS WILL BE INSIDE  event.dataTransfer.files
	 *    * WE ARE USING A FUNCTION event.preventDefault IT STOPS FROM ALL OTHER ACTION THAT ANGULAR DO IT'S OWN
	 *
	 * @param event any
	 */
	onDrop(event: any): void
	{
		event.preventDefault();
		const files: FileList = event.dataTransfer.files; // TBD

		// TBD
		if (files.length > 0)
		{
			this.onFileUpload({target: {files}});
		}
	}

	/**
	 * @title THIS FUNCTION WILL BE CALLED WHEN USER DRAGOVER THE DROP FILES HERE AREA
	 *
	 * @description
	 *    * WE ARE GETTING AN EVENT (ANGULAR PROVIDE THIS THING WHILE HANDLING A DRAG EVENT)
	 *
	 * @param event any
	 */
	onDragOver(event: any): void
	{
		event.preventDefault();
	}

	/**
	 * @title THIS FUNCTION WILL BE CALLED WHEN USER CLICK ON UPLOAD FILES OR DROP THE FILE
	 *
	 * @description
	 *    * WE ARE GETTING AN EVENT (ANGULAR PROVIDE THIS THING WHEN WE UPLOAD A FILE)
	 *    * THE FILE USER UPLOADS WILL BE INSIDE event.target.files <ARRAY/OBJECT
	 *
	 * @flow
	 *    * FIRST WE HAVE CREATED A ARRAY OF VALID EXTENSIONS WITH NAME validExts
	 *    * THEN WE ARE GETTING THE NAME OF UPLOADED FILE
	 *    * THEN WE ARE SPLITTING THE NAME FROM '.' AND COMPARING THE EXTENSION NAME FROM OUR validExts ARRAY
	 *    * PASSING THE FILE TO READER TO SHOW THE PREVIEW OF FILE
	 *
	 * @param event any
	 */
	public async onFileUpload(event: any)
	{
		let validExts = new Array(".jpg", ".png", ".jpeg", ".svg", ".gif");
		let fileExt = event.target.files[0]?.name;
		fileExt = fileExt.substring(fileExt.lastIndexOf("."));

		// THIS WILL VALIDATE FILE TYPES AND IF IT'S WRONG THE RETURN NULL VALUE
		if (validExts.indexOf(fileExt) < 0)
		{
			return;
		}
		this.file = event.target.files.item(0);

		//TO SHOW IMAGE PREVIEW
		let reader = new FileReader();

		// TBD
		reader.onload = (event: any) =>
		{
			this.imageUrl = event.target.result;
		};

		// TBD
		reader.readAsDataURL(event.target.files.item(0));
	}

	/**
	 * @title THIS WILL BE USED TO REMOVE THE UPLOADED IMAGE
	 */
	public removeImage()
	{
		this.imageUrl = "";
		this.contractorDetialsForm.get("uploadImage").setValue("");
		this.file = null;
	}

	/**
	 * @title TO CHANGE THE STEPPER TO NEXT PAGE
	 */
	public onNext()
	{
		this.nextClicked = true;
		if (!this.productChoice)
		{
			return;
		}
		const isValid = this.validateForm();
		if (isValid)
		{
			if (this.commonService.contractorDetails.entity_id && this.commonService.contractorDetails.contractor_id)
			{
				this.saveContractorDetails();
			}
			this.currentPage.emit(this.current + 1);
			this.isValid.emit(true);
		} else
		{
			return;
		}

		
	}

	// CALL THIS FUNTION ON CHANGE STEPER ON CLICK
	public async onSteperSelected (stepNumber: any)
	{
		
		if(stepNumber > this.current)
		{
			this.nextClicked = true;
			// if (!this.productChoice)
			// {
			// 	return;
			// }

			const isValid = await this.validateForm();
			if (isValid)
			{
				console.log('contractorDetails', this.commonService.contractorDetails);
				if (this.commonService.contractorDetails.entity_id && this.commonService.contractorDetails.contractor_id)
				{
					this.isValid.emit(true);
					this.saveContractorDetails().then(()=>{
						this.currentPage.emit(stepNumber);
					}).catch((err) => console.log('error=>', err));
				}
			} else {
				this.helper.onSteperValidationError.next(1);
			}
		}else{
			this.currentPage.emit(stepNumber);
		}
	}

	/**
	 * @title TO CHANGE THE STEPPER TO NEXT PREVIOUS
	 */
	public onBack()
	{
		this.changePage(this.current - 1);
	}

	/**
	 * @title TO CHECK THE VALIDATION AND CHANGE THE STEPPER ACCORDING TO PARAM
	 *
	 * @description
	 *    * FIRST WE WILL EMIT A EMITTER THAT WILL TELL THE PARENT COMPONENT WETHER THIS COMPONENT IS VALID OR IN VALID
	 *        * ALL FIELDS ARE FILLED CORRECTLY OR NOT
	 *    * tHEN WE ARE EMITTING AN EMITTER THAT WILL TELL THE CURRENT PAGE NUMBER TO PARENT
	 *        * SHOULD WE MOVE NEXT OR BACK
	 *
	 * @param pageNumber number
	 */
	public changePage(pageNumber: number)
	{
		this.isValid.emit(this.productChoice ? true : false);
		this.currentPage.emit(pageNumber);
	}
}
