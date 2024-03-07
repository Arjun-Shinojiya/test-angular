/*
		  FILENAME: src\app\modules\auth\register\contractor\components\contractorprofile\contractorprofile.component.ts
			AUTHOR: ICI/SZ
		   SUMMARY: HOLDS THE REGISTRATION OF COMPANY PROFILE FORM.
		   PURPOSE: TO MAKE MULTIPLE COMPONENTS TO GET USE IN DIFFERENT PLACES AND STAY SEPARATE OF CONCERNS
   IMPORTING FILES: contractorprofile.component.html | contractorprofile.component.scss
 SUBSCRIBING FILES: contractordetails.component.ts
  LAST COMMIT DATE: SEPTEMBER 4, 2023
*/

// TBD
import { Component, DebugElement, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { GenericService } from 'src/app/services/generic.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { HelperService } from 'src/app/services/helper.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";

// TBD
@Component
	({
		selector: 'app-create-users',
		templateUrl: './createusers.component.html',
		styleUrls: ['./createusers.component.scss']
	})

// TBD
export class CreateUsersComponent implements OnInit
{
	// CREATING INPUT AND OUTPUT FOR DATA COMMUNICATION FOR COMPONENTS
	@Input() companyType: string = '';
	@Input() current: number = 0;
	@Input() companyTypeAfterclick: string = '';

    @Output() usercClickBack= new EventEmitter();
	@Input() userEditAfterLogin : string='';
	@Input() userDataAfterLoginEdit: any;
	@Output()
	currentPage = new EventEmitter();
	@Output()
	isValid = new EventEmitter();
	@Output() expansionState= new EventEmitter();
	@Output() addUserSuccess = new EventEmitter();

	// TBD
	public formArray: any;
	
	public expandedIndex: number | null = 0;
	public phoneMask = "(000) 000-0000";
	public show: boolean = false;
    public userFormIndex: number = 0;
    public payload: any;
	public errorMessage: any;
	public entity_id: string = '';
	public user_id : string = '';
	public primaryUserPaylaod: any;
	public entityId: string = '';
	public matchingRoles = ['Super Admin', 'Admin', 'Oversight'];
	public isSuperAdminSet = false;
	public userIdsArr:Array<any> = [];
	public shouldHideField: boolean = false;
	public isRoleValid: boolean = true;
	public count:number = 1;
	public errorIndex:number = -1;
	public activeStatus:string = '';
	public stepSubcription: any;
	checked: boolean = false;

	
	// TBD
	constructor (private formBuilder: FormBuilder,
        private translationService: TranslationService,
        private genericService: GenericService,
        private commonService: CommonService,
		    private helper: HelperService,
		    private router: Router
    )
	{
		// INITIALIZING REACTIVE ENTITY PROFILE FORM
		
		this.formArray = this.formBuilder.array([this.emptyForm()]);
		this.formArray.controls[this.userFormIndex].get('totalScopeRole').setValue('Super Admin');

		
		
		
	}
	ngOnChanges(): void {
		console.log(this.userDataAfterLoginEdit);
		if (this.userDataAfterLoginEdit) {
			
			const formData = this.userDataAfterLoginEdit; // Assuming you're interested in the first form
		
			if (formData) {
			  const formGroup = this.formArray.at(0) as FormGroup;
		
			  // Update form controls based on received data
			  formGroup.get('namefirst')?.setValue(formData.namefirst);
			  formGroup.get('namelast')?.setValue(formData.namelast);
			  formGroup.get('mobilephone')?.setValue(formData.mobilephone);
			  formGroup.get('email')?.setValue(formData.email);
			  const matchedRole = formData.roles.find((role: any) => this.matchingRoles.includes(role.roletitle));
			formGroup.get('totalScopeRole')?.setValue(matchedRole ? matchedRole.roletitle : '');
			formGroup.get('salesManager')?.setValue(formData.roles.some((role: any) => role.roletitle === 'Sales Manager'));
			formGroup.get('salesRep')?.setValue(formData.roles.some((role: any) => role.roletitle === 'Sales Rep'));
			formGroup.get('claimHandler')?.setValue(formData.roles.some((role: any) => role.roletitle === 'Claim Handler'));
			formGroup.get('user_id')?.setValue(formData.user_id);
			formGroup.get('activestatus')?.setValue(formData.activestatus === 'A');
			  // ... Update other form controls similarly
		
			  console.log(this.formArray);
			}
		  }
	}

    ngOnInit(): void {
        this.entityId = this.commonService.contractorDetails.entity_id;

		if(this.entityId){			
			this.getCreateUser(this.entityId);
			this.getFirstStepData(this.entityId);
		}

		this.stepSubcription = this.helper.onSteperChange.subscribe((step: any) =>{
			this.onSteperSelected(step);
		});
    }
	ngOnDestroy()
	{
		this.stepSubcription.unsubscribe();
	}

	onChange(event:any){
		this.checked=!this.checked;
	}

	async onSaveChanges(form : any){
		await this.saveForm(form);
		this.expansionState.emit();
	}
	
	onEditCancel(){
		this.usercClickBack.emit(true);
	}

	emptyForm (): any
	{
		return this.formBuilder.group
			({
				namefirst: new FormControl('', { validators: [Validators.required,Validators.pattern("^[a-zA-Z0-9\\s\\-\\']+$")], updateOn: 'blur' }),
				namelast: new FormControl('', { validators: [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s\\-\\']+$")], updateOn: 'blur' }),
				mobilephone: new FormControl(''),
				email: new FormControl('', { validators: [Validators.required, Validators.pattern('^\\w+(?:[\\.+\\-]\\w+)*@\\w+(?:[\\.-]\\w+)*(?:\\.\\w{2,})+$'), Validators.maxLength(75)], updateOn: 'blur' }),
				activestatus: new FormControl(true),
				totalScopeRole: new FormControl(''),
				salesManager: new FormControl(false),
				salesRep: new FormControl(false),
				claimHandler: new FormControl(false),
				user_id: new FormControl('')
			});
	}

	checkRoleValid(index:any){
		console.log(this.formArray.controls[index]);
		
		const formValue = this.formArray.controls[index];
		if(formValue.get('totalScopeRole').value === '' && formValue.get('salesManager').value === false && formValue.get('salesRep').value === false && formValue.get('claimHandler').value === false){
			this.isRoleValid = false;
		}else{
			this.isRoleValid = true;
		}
	}

	onStatusChange(event:any){
		this.activeStatus = event ? 'A' : 'I';
	}

	// TO CHANGE THE STEPPER TO NEXT PREVIOUS
	public onNext ()
	{

		
		if (this.expandedIndex != null)
		{
			const isValid = this.validateForm(this.formArray.controls[this.expandedIndex]);
			if (isValid)
			{
				this.currentPage.emit(this.current + 1);
				this.isValid.emit(true);
			}
			
		}
		else
		{
			this.currentPage.emit(this.current + 1);
			this.isValid.emit(true);
		}
	}
	AddanotherUser(){
	
	}

	// CALL THIS FUNTION ON CHANGE STEPER ON CLICK
	public async onSteperSelected (stepNumber: any)
	{
		if(stepNumber > this.current)
		{
			if (this.expandedIndex != null)
			{
				const isValid = this.validateForm(this.formArray.controls[this.expandedIndex]);
				if (isValid)
				{
					this.isValid.emit(true);
					this.currentPage.emit(stepNumber);
					
				} else {
					this.helper.onSteperValidationError.next(2);
				}
			}
			else
			{
				this.isValid.emit(true);
				this.currentPage.emit(stepNumber);
				
			}
		}else{
			this.currentPage.emit(stepNumber);
		}

	}

	// TO CHECK THE VALIDATION OF FORM
	public validateForm (form: any)
	{
		let isValid = true;
		if (this.formArray.invalid)
		{
			isValid = false;
			form.markAllAsTouched();
		}
		return isValid;
	}

	// GET CONTRACTOR PROFILE DATA
	public getCreateUser (entityId: any)
	{
		this.genericService.get(`registration-steps/get-step-3?entity_id=${entityId}`).subscribe({
			next: (response) =>
			{
				if (response.status === 'success')
				{
					this.mapFormFields(response.data);

					response.data.forEach((element:any) => {
						if(element.user_id){
							this.userIdsArr.push(element);
						}
					});

					this.checkSuperAdminAssgined()
				}
				else
				{
					console.log('error', response.message);
				}
			},
			error: (error) =>
			{
				console.log('error', error);
			}
		});
	}

	/** 
	 * FUNCTION TO GET FIRST STEP DATA TO SET EMAIL ID ON INPUT FIELD
	 * @param entityId - string 
	 */
	public getFirstStepData(entityId: any) {
		this.genericService.get(`registration-steps/get-step-1?entity_id=${entityId}`).subscribe({
			next: (response) => {
				if (response.status === 'success') {
					// IF FORMGROUP IS EMPTY THEN SET EMAIL ID VALUE IN FIRST EMAIL FIELD
					if(!response.length && this.companyTypeAfterclick !='contractor'){
						const formGroup = this.formArray.at(0) as FormGroup;
						formGroup.get('email')?.setValue(response?.data[0].email);
					}
				}
				else {
					console.log('error', response.message);
				}
			},
			error: (error) => {
				console.log('error', error);
			}
		});
	}

	public mapFormFields (data: any)
	{
		if(this.companyTypeAfterclick!=='contractor'){
			while (this.formArray.length < data.length)
			{
				this.formArray.push(this.emptyForm());
			}
	
			for (let i = 0; i < data.length; i++)
			{
				const formGroup = this.formArray.at(i) as FormGroup;
				
				formGroup.get('activestatus')?.setValue(data[i].activestatus === 'A');
				
				i !== this.expandedIndex && this.companyTypeAfterclick !=='contractor' ? formGroup.get('activestatus')?.disable() : formGroup.get('activestatus')?.enable();
				formGroup.get('namefirst')?.setValue(data[i].namefirst);
				formGroup.get('namelast')?.setValue(data[i].namelast);
				formGroup.get('mobilephone')?.setValue(data[i].mobilephone);
				formGroup.get('email')?.setValue(data[i].email);
				const matchedRole = data[i].roles.find((role: any) => this.matchingRoles.includes(role.roletitle));
				formGroup.get('totalScopeRole')?.setValue(matchedRole ? matchedRole.roletitle : '');
				formGroup.get('salesManager')?.setValue(data[i].roles.some((role: any) => role.roletitle === 'Sales Manager'));
				formGroup.get('salesRep')?.setValue(data[i].roles.some((role: any) => role.roletitle === 'Sales Rep'));
				formGroup.get('claimHandler')?.setValue(data[i].roles.some((role: any) => role.roletitle === 'Claim Handler'));
				formGroup.get('user_id')?.setValue(data[i].user_id);
			}
		}
		
	}

	/**
    * @title THIS WILL BE USED TO CHANGE THE VALUE OF
    *
    * @param buttonType string
    */
	public changeTotalScopeRole (buttonType: string): void
	{
		if(this.count%2===1){
			this.formArray.controls[this.userFormIndex].get('totalScopeRole').setValue(buttonType)
		}else{
			this.formArray.controls[this.userFormIndex].get('totalScopeRole').setValue('')
		}
		this.count++;
		this.checkSuperAdminAssgined();
	}

	/**
	 * @title TO CHANGE THE STEPPER TO NEXT PREVIOUS
	 */
	public onBack ()
	{
		this.changePage(this.current - 1);
		this.usercClickBack.emit(true);
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
	public changePage (pageNumber: number)
	{
		// this.isValid.emit(this.productChoice ? true : false);
		this.currentPage.emit(pageNumber);
	}

	/**
	 * @title THIS WILL BE USED TO CHANGE THE VALUE OF USER ROLE
	 *
   	 * @param type string
 	 */public updateReactiveFormValue (value: any, key: string, form: any): void
	{
		form.get(key).setValue(value);
	}

	/**
	 * ADD NEW FORM TO CREATE USER AND COLLAPSE OTHER FORMS
	 */
	public addNewUser ()
	{
	
        this.userFormIndex = this.formArray.controls.length;
		if (this.expandedIndex != null && this.expandedIndex != -1)
		{
			const isValid = this.validateForm(this.formArray.controls[this.expandedIndex]);
			if (isValid)
			{
				this.formArray.push(this.emptyForm());
				this.expandedIndex = this.formArray.controls.length - 1;
			}
		}

		else
		{
			this.formArray.push(this.emptyForm());

			this.userFormIndex == 0 ? this.formArray.controls[0].get('totalScopeRole').setValue('Super Admin') : '';

			this.expandedIndex = this.formArray.controls.length - 1;
		}
		// CHECK FOR ACTIVE SWITCH STATUS WHILE CREATING NEW USER
		this.toggleActiveStatusField(this.userFormIndex);
	}

	checkSuperAdminAssgined ()
	{
		this.isSuperAdminSet = this.formArray.controls.some((control: any) =>
		{
			return control.value.totalScopeRole === 'Super Admin';
		})
	}
	/**
	 * SAVE USER FORM AND COLLAPSE IT
	 * @param form any
	 */
	saveForm (form: any)
	{
		return new Promise((resolve, reject) =>
		{
			this.checkRoleValid(this.userFormIndex);
			if(this.isRoleValid){
				const isValid = this.validateForm(form);
				if (isValid)
				{
					this.expandedIndex = null;
				}
	
				if (this.payload?.user_id)
				{
					this.payload = this.formArray.controls[this.userFormIndex].value;
					for(let role of this.userIdsArr){
						if(role.user_id===this.payload.user_id){
							this.payload.roles = role.roles;
						}
					}
					
				} else
				{
					this.payload = form.value;
					for(let role of this.userIdsArr){
						if(role.user_id===this.payload.user_id){
							this.payload.roles = role.roles;
						}
					}
				}
				
				if (!this.payload.roletitle)
				{
					this.payload.roletitle = {scopeRole: this.payload.totalScopeRole};
					delete this.payload.totalScopeRole;
				}
				
				if (this.payload.salesManager)
				{
					this.payload.roletitle.salesManager = 'Sales Manager';
					delete this.payload.salesManager;
	
				} else
				{
					delete this.payload.salesManager;
				}
				
				if (this.payload.salesRep)
				{
					this.payload.roletitle.salesRep = 'Sales Rep';
					delete this.payload.salesRep;
				} else
				{
					delete this.payload.salesRep;
				}
				
				if (this.payload.claimHandler)
				{
					this.payload.roletitle.claimHandler = 'Claim Handler';
					delete this.payload.claimHandler;
				} else
				{
					delete this.payload.claimHandler;
				}
				
				this.payload.team_id = this.commonService.teamId;
				
				console.log('payload', this.payload);
				localStorage.setItem("contractor_name", this.payload.namefirst +' '+this.payload.namelast);
				localStorage.setItem("contractor_email", this.payload.email);
				
				if (isValid && this.payload.team_id && this.payload.user_id && this.userIdsArr.length > 0)
				{
					this.payload.activestatus = this.payload.activestatus? 'A' :  'I';
					this.payload.entity_id = this.entityId;
					this.payload.entitycode = this.commonService.contractorDetails.entitycode;

					if(!this.payload.roletitle.scopeRole){
						delete this.payload.roletitle.scopeRole;
					}
					
					
					const url = this.userEditAfterLogin == 'true' ? 'registration-steps/update-step-3' :`registration-steps/update-step-3?entity_id=${this.entityId}`; 
					
					this.genericService.put(url, this.payload).subscribe({
						next: (response) =>
						{
							if (response)
							{

								if (this.payload.roletitle.scopeRole === 'Super Admin' && this.payload.user_id)
								{
									this.user_id = this.payload.user_id;
									this.entity_id = this.payload.entity_id;
									this.primaryUserPaylaod = {'primarycontact_user_id': this.user_id, 'entity_id': this.entity_id};
	
									this.genericService.put('entity/update-entity-primary-contact', this.primaryUserPaylaod).subscribe({
										next: (resp) =>
										{
											console.log('resp updated---->>>', resp);
										},
										error: (error) =>
										{
											console.log('error', error);
										}
									});
								}
								resolve(true);
								this.getCreateUser(this.entityId);
							}
							else
							{
								reject(response);
							}
						},
						error: (error) =>
						{
							reject(error);
						}
					});
					this.isRoleValid = true;
				}
				else if (isValid && this.payload.team_id)
				{
					if(!this.payload.roletitle.scopeRole){
						delete this.payload.roletitle.scopeRole;
					}
					this.payload.activestatus = this.payload.activestatus? 'A' :  'I';
					
					this.genericService.post('auth/createUser', this.payload).subscribe({
						next: (response) =>
						{
							if (response.status === 'success')
							{
								if (response.data.role && response.data.userId)
								{
									this.user_id = response.data.userId;
									this.entity_id = this.commonService.contractorDetails.entity_id;
									this.primaryUserPaylaod = {'primarycontact_user_id': this.user_id, 'entity_id': this.entity_id};
	
									this.genericService.put('entity/update-entity-primary-contact', this.primaryUserPaylaod).subscribe({
										next: (resp) =>
										{
											console.log('resp updated---->>>', resp);
										},
										error: (error) =>
										{
											console.log('error', error);
										}
									});
								}
								resolve(true);
								this.getCreateUser(this.entityId);
							}
							else
							{
								this.errorMessage = response.message;
	
								if (this.errorMessage)
								{
									this.expandedIndex = this.userFormIndex;
									this.errorIndex = this.userFormIndex;
								}
								reject(response.message);
							}
						},
						error: (error) =>
						{
							reject(error.message);
						}
				});
				this.isRoleValid = true;
				}
				else
				{
					resolve('Invalid Field');
				}

				//DISABLE ALL THE ACTIVESTATUS FIELD
				for(let i=0;i<this.formArray.controls.length;i++){
					form.status == "INVALID" ? 	this.formArray.controls[i].get('activestatus').enable() :
					this.formArray.controls[i].get('activestatus').disable();
				}
			}
			else
			{
				this.validateForm(form);
				resolve('Invalid Field');
			}
		});
	}

	/**
	* @title EMPTY ERROR MESSAGE VARIABLE WHEN EMAIL VALUE CHANGE
	*/
	onChangeEmail(){
		this.errorMessage = '';
	}

	/**
	 * DELETE FORM FROM FORM ARRAY
	 * @param formIndex number
	 */
	deleteForm (formIndex: number)
	{
		
	
			return new Promise((resolve, reject) =>
		{
			if (this.expandedIndex != null)
			{
				const userId = this.formArray.controls[this.expandedIndex].value.user_id;
				
					this.genericService.delete('account/delete',{userId:userId}).subscribe({
						next: (response:any) =>
						{
							if(response.status === 'success' && this.expandedIndex != null){
								this.getCreateUser(this.entityId);
								this.formArray.controls.splice(this.expandedIndex, 1);
								this.expandedIndex = this.expandedIndex - 1;
								this.errorIndex = -1;
							}
							resolve(true);
						}, error: (error:any) =>
						{
							reject(error);
						}
					});
			}
			this.userFormIndex = this.userFormIndex - 1;
			//AFTER DELETE ACTIVE THE STATUS FIELD
			this.toggleActiveStatusField(this.userFormIndex);
		});
	}

	/**
	 * EDIT FORM IN FORM ARRAY
	 * @param formIndex number
	 */
	editForm (formIndex: number)
	{
			this.checkRoleValid(formIndex);

			this.toggleActiveStatusField(formIndex);

			if (this.expandedIndex != null && this.expandedIndex != -1)
			{
				const isValid = this.validateForm(this.formArray.controls[this.expandedIndex]);
				if (isValid)
				{
					this.userFormIndex = formIndex;
					this.expandedIndex = formIndex;
				}
			}
			else
			{
				this.userFormIndex = formIndex;
				this.expandedIndex = formIndex;
			}
		
	}

	/**
	 * TOGGLE ENABLE DISABLE ACTIVE STATUS FIELD
	 * @param indexValue - Number
	 */
	toggleActiveStatusField(indexValue:number){
		for(let i=0;i<this.formArray.controls.length;i++){
			if(indexValue !== i && this.companyTypeAfterclick !== 'contractor'){
				this.formArray.controls[i].get('activestatus').disable();
			}else{
				this.formArray.controls[i].get('activestatus').enable();
			}
		}
	}
	// public onChange(event:any){
    //     this.checked = event;
	// 	if(event == true){
	// 		this.translationService.switchLanguage ("spanish");
	// 	}else{
	// 		this.translationService.switchLanguage ("english");
	// 	}
	// }

	/**
	 * ADD NEW USER 
	 *  @param form any
	 */
	async onAddNewUser(form:any){
		const isValid = this.validateForm(form);
		if (isValid){
			await this.saveForm(form);
			this.usercClickBack.emit(true);
			this.addUserSuccess.emit();
		}	
	}
}
