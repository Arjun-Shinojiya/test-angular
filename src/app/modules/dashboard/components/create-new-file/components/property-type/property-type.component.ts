
import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrls: ['./property-type.component.scss'],
})

export class PropertyTypeComponent
{
  // CREATING INPUT AND OUTPUT EMITTER FOR DATA COMMUNICATION TO PARENT COMPONENTS
  @Output() isValid = new EventEmitter();
	@Output() currentPage = new EventEmitter();
  @Input() current: number = 0;
  
  @ViewChild('upload', { static: false }) uploadComponent: any;
  public showCheck: boolean[]=[false, false, false, false];
  // public current: number = -1;
  public showUpload: boolean = false;
  public selectedFile: File | null = null;
  public imageUrl: string | ArrayBuffer | null = null;
  public show: boolean = false;
  public uploadSaveUrl = "saveUrl";
  public uploadRemoveUrl = "removeUrl";
  public uploadProgress = 0;
  public propertyId: string = '';
  public userId: string  = '';

  propertyDetailsForm = new FormGroup({
    propertyType: new FormControl('SINGLE FAMILY'),
    estimateType: new FormControl('Insurance Claim'),
  });

  constructor 
  (
    private apiService: ApiService, 
  ) {}

  ngOnInit() 
  {
    const propertyId = localStorage.getItem('property_id')
    if ( propertyId !== null )
    {
      this.propertyId = propertyId;
      this.getFormData()
    }
    const userDataString = localStorage.getItem('userData');
    if (userDataString !== null) 
    {
      const userData = JSON.parse(userDataString);
      if( userData !== null )
      {
        this.userId = userData.userId;
      }
    }
  }

  public toggleCheck(blockNumber: number): void {
    this.showCheck[blockNumber] = !this.showCheck[blockNumber];
    this.current = blockNumber ;
  }

  public isAnyCheckTrue(): boolean {
    return this.showCheck.some(check => check);
  }

  // FUNCTION TO UPLOAD IMAGE
  public onClickSelectFile() 
  {
    const fileInput = document.getElementById('selectFile') as HTMLInputElement;
  }

  // FUNCTION TO GENERATE THE IMAGE URL
  public onFileSelected(event: any) 
  {
    const file = event.target.files[0];

    if (file) 
    {
      this.selectedFile = file;
      // Read the file and generate a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result as string;
        this.uploadProgress = 100;
      };
      reader.readAsDataURL(file);
    }
  }

  // FUNCTION TO CALCULATE THE SIZE OF THE IMAGE
  public formatFileSize(size: number): string 
  {
    const KB = 1024;
    const MB = KB * 1024;

    if (size < KB) 
    {
      return size + ' B';
    } 
    else if (size < MB) 
    {
      return (size / KB).toFixed(2) + ' KB';
    } 
    else 
    {
      return (size / MB).toFixed(2) + ' MB';
    }
  }

  public onRemove()
  {
    this.imageUrl = null;
  }

  public saveInfo()
  {
    const payload = {
			
			propertyType: this.propertyDetailsForm?.get('propertyType')?.value,
			estimateTypeRequested: this.propertyDetailsForm?.get('estimateType')?.value,
      propertyImage: this.imageUrl,
      user_id: this.userId,
      property_id: this.propertyId
		}

    if ( this.propertyDetailsForm.valid )
    {
      this.apiService.put(`/admin-property/update-step-3`, payload ).subscribe({
        next: (response) =>
        {
          if (response.status === 'success')
          {
           console.log(response, "Property Type Response")
          }
  
        },
        error: (err) =>
        {
          console.log('err', err)
        }
      });
    }
    else
    {
      console.log(Error,'Error')
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
          const data = response.data?.property_id[0];
          this.propertyDetailsForm.patchValue({
            propertyType: data?.propertytype,
            estimateType: data?.filetype,
          })
        }

      },
      error: (err) =>
      {
        console.log('err', err)
      }
    });
  }
}
