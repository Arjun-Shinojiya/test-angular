
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { error } from 'jquery';
import { ApiService } from 'src/core/api.service';


// DECLARE VARIABLE $ TO ANY TYPE. LATER, IT CAN BE CAST TO THE DESIRED TYPE.
declare var $: any;
/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component
({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
})

export class PropertyDetailsComponent
{
  // CREATING INPUT AND OUTPUT EMITTER FOR DATA COMMUNICATION TO PARENT COMPONENTS
  @Output() isValid = new EventEmitter();
	@Output() currentPage = new EventEmitter();
  @Input() current: number = 0;
  
  public showCheck: boolean[]=[false, false, false, false];
  public stateList: string[] = ['California', 'Alaska', 'Texas', 'Florida']; // STATIC LIST OF STATES, WILL UPDATE IT WITH API IN FUTURE
  public activeOption: any = '';
  public propertyId: string = '';
  public ownerId: string = '';
  propertyDetailsForm = new FormGroup({
    streetNumber: new FormControl('',{validators: [Validators.required, Validators.maxLength(5)],updateOn:'blur'}),
    streetName: new FormControl('',{validators: [Validators.required],updateOn:'blur'}),
    zip: new FormControl('',{validators: [Validators.required, Validators.pattern('^\\d{5}(-\\d{4})?$')], updateOn: 'blur'}),
    city: new FormControl('',{validators: [Validators.required, Validators.pattern('^[a-zA-Z \']*$'), this.cityValidator(false)], updateOn: 'blur'}),
    state: new FormControl('',{validators: [Validators.required, Validators.pattern('^[a-zA-Z \']*$'), this.stateValidator(false)], updateOn: 'blur'}),
    portfolioLink: new FormControl('')
  });

  public linksData = [ // STATIC LIST OF LINKS DATA
    {
      name: 'COMPANYCAM',
      asset: './assets/images/svg/company-cam.svg',
      link: 'http://companycam.com'
    },
    {
      name: 'ACCULYNX',
      asset: './assets/images/svg/Frame1.svg',
      link: 'http://acculynx.com'
    },
    {
      name: 'GOOGLEDRIVE',
      asset: './assets/images/svg/drive.svg',
      link: 'http://googledrive.com'
    },
    {
      name: 'ONEDRIVE',
      asset: './assets/images/svg/Frame.svg',
      link: 'http://onedrive.com'
    },
  ];

  constructor 
  (
    private apiService: ApiService,
  ) 
  {}

  ngOnInit() 
  {
    // this.subscribeToZipChanges()
    const ownerId = localStorage.getItem('owner_id')
    const propertyId = localStorage.getItem('property_id')
    if ( ownerId )
    {
      this.ownerId = ownerId;
    }
    if ( propertyId !== null )
    {
      this.propertyId = propertyId;
      this.getFormData()
    }
  }

  // FUNCTION TO UPDATE ACTIVE OPTION VAR AND SET VALUE IN PORTFOLIOLINK CONTROLLER
  public currentActive(index: number): void {
    // UPDATE PORTFOLIO LINK CONTROLLER
    this.propertyDetailsForm.controls.portfolioLink.setValue(this.linksData[index].link);
    // ASSIGN CURRENTLY CHECKED OPTION TO ACTIVE OPTION
    this.activeOption = this.linksData[index];
  }

  // FUNCTION TO SAVE THE PORTFOLIOLINK VALUE INTO LINKSDATA
  public updateLink(): void {
    const index = this.linksData.findIndex((item) => item.name === this.activeOption.name)
    if (index > -1) {
      this.linksData[index].link = this.propertyDetailsForm.controls.portfolioLink.value!;
    }
  }

  // ON FOCUSOUT GET ZIPCODE VALUE
  public zipChange()
  {
    const zipCode = this.propertyDetailsForm.get('zip')?.value;
    if (zipCode) {
      this.getZipCode(zipCode);
    }
  }
  
  // CALL API TO GET STATE AND CITY FROM ZIPCODE AND SET ITS RESPONSE IN FORM FIELD
  public getZipCode(zipValue: any): void {
    this.apiService.get(`/zip/get-by-id?zip_id=${zipValue}`).subscribe({
      next: (response) =>
      {
        if (response.status === 'success')
        {
          const data = response.data;
          this.propertyDetailsForm.patchValue({
            city: data?.city,
            state: data?.state,
          })
        }
      },
      error: (err) =>
      {
        console.log('err', err);
        this.propertyDetailsForm.controls.city.setValue('');
        this.propertyDetailsForm.controls.state.setValue('');
      }
    });
  }

  // FUNCTION TO UPDATE THE PROPERTY DETAILS
  public saveInfo() {
    if(this.propertyDetailsForm.valid){
      const payload =
      {
        propertyStreetNumber: this.propertyDetailsForm?.get('streetNumber')?.value,
        propertyStreetName: this.propertyDetailsForm?.get('streetName')?.value,
        propertyZip: this.propertyDetailsForm?.get('zip')?.value,
        state: this.propertyDetailsForm?.get('state')?.value,
        city: this.propertyDetailsForm?.get('city')?.value,
        links: [
          {
            "type": this.activeOption?.name,
            "url": this.propertyDetailsForm?.get('portfolioLink')?.value
          },
        ],
        property_id: this.propertyId,
        owner_id: this.ownerId,
      };
    
      this.apiService.put(`/admin-property/update-step-2`, payload).subscribe({
        next: (response) => {
    
          if (response.status === 'success') 
          {
            this.isValid.emit(true);
            this.currentPage.emit(this.current + 1);
            console.log(response, "Personal Info Response");
            const propertyId = response?.data?.property_id;
            localStorage.setItem('property_id', propertyId)
          } 
          else 
          {
            // CHECK TYPE TO IDENTIFY BETWEEN CITY AND STATE FIELD INVALID
            if (response?.type === 'city') {
              this.propertyDetailsForm.get('city')?.setErrors({ 'invalidCity': true });
            }
            if (response?.type === 'state') {
              this.propertyDetailsForm.get('state')?.setErrors({ 'invalidState': true });
            }
            // Handle unsuccessful response status here
            console.error(response, "Unsuccessful response status");
            this.isValid.emit(false);
          }
        },
        error: (err) => 
        {
          // Handle HTTP error (e.g., network error, server error) here
          console.error('HTTP error:', err);
          this.isValid.emit(false);
          if (err instanceof ErrorEvent) 
          {
            // Client-side error
            console.error('Client-side error:', err.error.message);
          } 
          else 
          {
            // Server-side error
            console.error('Server-side error:', err.error);
          }
        },
      });
    }else{
      this.isValid.emit(false);
      this.propertyDetailsForm.markAllAsTouched();
    }
   
  }

  // FUNCTION TO GET PROPERTY DETAILS
  public getFormData()
  {

    this.apiService.get(`/admin-property/get-step-2/${this.propertyId}`).subscribe({
      next: (response) =>
      {
        if (response.status === 'success')
        {
          const data = response.data?.property_detail;
          this.propertyDetailsForm.patchValue({
            city: data?.city,
            state: data?.state,
            streetName: data?.streetname,
            streetNumber: data?.streetnumber,
            zip: data?.zip,
          })
          if(response.data.photoportfolio.length > 0 ){
            let data = response.data.photoportfolio[0];
            let activeOptionObj = {
              name:data.urltype,
              link:data.url
            }
            data.urltype && data.url ? this.activeOption = activeOptionObj : '' ;
            this.propertyDetailsForm.patchValue({
              portfolioLink:data.url
            });
          }
        }

      },
      error: (err) =>
      {
        console.log('err', err)
      }
    });
  }
  

  /**
   * CUSTOM VALIDATION FUNCTION TO DISPLAY ERROR IN CITY FIELD WHEN FROM BACKEND CITY NAME COMES INVALID
   * @param apiResponse - TRUE/FALSE
   */
  cityValidator(apiResponse: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (apiResponse) {
        return { invalidCity: true }; // SET THE ERROR IF PARAM IS TRUE
      }
      return null; // RETURN NULL IF THE VALIDATION PASSED
    };
  }

  /**
   * CUSTOM VALIDATION FUNCTION TO DISPLAY ERROR IN STATE FIELD WHEN FROM BACKEND STATE NAME COMES INVALID
   * @param apiResponse - TRUE/FALSE
   */
  stateValidator(apiResponse: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors| null => {
      if (apiResponse) {
        return { invalidState: true }; // SET THE ERROR IF PARAM IS TRUE
      }
      return null; // RETURN NULL IF THE VALIDATION PASSED
    };
  }

}
