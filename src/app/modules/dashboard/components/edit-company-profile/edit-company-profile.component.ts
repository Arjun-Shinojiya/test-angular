/**
 *          FILENAME: dashboard.component.ts
 *             ROUTE: totalscope_webclient/src/app/modules/dashboard/
 *            AUTHOR: ICI/AD
 *              WHAT: HOLDS MAIN WAREFRAME OF DASHBOARD
 *               HOW: THIS WILL INJECT THE LEFT MENU, TOP BAR AND PAGE CONTAINER.
 *   IMPORTING FILES: dashboard.component.html | dashboard.component.scss
 * SUBSCRIBING FILES: dashboard.module.ts | dashboard.routing.ts
 *  LAST COMMIT DATE: DECEMBER 12, 2023
 */

/**
 * COMPONENT | PROVIDES THE LOGIC AND TEMPLATE FOR CREATING COMPONENTS.
 */
import {Component} from '@angular/core'
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
  selector: 'app-edit-company-profile',
  templateUrl: './edit-company-profile.component.html',
  styleUrls: ['./edit-company-profile.component.scss'],
})

export class EditCompanyProfileComponent
{
  public imageUrl: string | ArrayBuffer | null = './assets/images/svg/company-logo.svg';
  public selectedFile: File | null = null;

  public companyDetails = {
    entity: '',
    address_id: '',
    city : '',
    state : '',
    zip : '',
    entityphone : '',
    websiteurl : '',
    address: '',
  }

  constructor (
    private apiService: ApiService,
    ) {}

  ngOnInit()
  {
    this.getCompanyDetails()
  }

  // onClickSelectFile()
  // {
  //   $('#selectLogo').trigger('click');
  // }

  onFileDrop(filelist: any)
  {
    console.log('filelist',filelist);
  }

  // FUNCTION TO FETCH THE COMPANY DETAILS FROM API
  public getCompanyDetails() 
  {

    const userData:any = localStorage.getItem("userData");

    if(userData){
      this.apiService.get('/entity/get-company-by-id?id=' + JSON.parse(userData).userId).subscribe((response) => 
      {
        if ( response.status === 'success' ) 
        {
          this.companyDetails.entity = response.data[0]?.entity;
          this.companyDetails.address_id = response.data[0]?.address_id;
          this.companyDetails.city = response.data[0]?.city;
          this.companyDetails.state = response.data[0]?.state;
          this.companyDetails.zip = response.data[0]?.zip;
          this.companyDetails.entityphone = response.data[0]?.mobilephone;
          this.companyDetails.websiteurl = response.data[0]?.websiteurl;
          this.companyDetails.address = `${response.data[0]?.streetnumber} ${response.data[0]?.streetname}`;
        }
  
        else 
        {
          console.log(Error)
        }
      })
    }
    
  }

  // FUNCTION TO UPDATE THE COMPANY INFO
  public onUpdate()
  {
    this.apiService.put('/entity/update-company-by-id', this.companyDetails).subscribe((response) => 
    {
      if ( response.status === 'success')
      {
        console.log(response)
      }
      else{
        console.log(error)
      }
    })
  }

  // FUNCTION TO UPLOAD IMAGE
  public onClickSelectFile() 
  {
    const fileInput = document.getElementById('selectLogo') as HTMLInputElement;
    fileInput.click();
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

}
