/*
          FILENAME: totalscope_webclient/src/app/modules/auth/register/company-type/company-type.components.ts
            AUTHOR: ICI/SBZ
           SUMMARY: HOLDS THE REGISTRATION OF COMPANY TYPE FORM.
           PURPOSE: TO MAKE MULTIPLE COMPONENTS TO GET USE IN DIFFERENT PLACES AND STAY SEPARATE OF CONCERNS
   IMPORTING FILES: company-type.component.html | company-type.component.scss
 SUBSCRIBING FILES: N/A
  LAST COMMIT DATE: SEPTEMBER 04, 2023
*/

// TBD
import {Component, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

// TBD
@Component
({
  selector: 'app-company-type',
  templateUrl: './company-type.component.html',
  styleUrls: ['./company-type.component.scss']
})

// TBD
export class CompanyTypeComponent
{
  // TBD
  constructor
  (
    public router: Router,
    private commonService: CommonService
  ){
    // CLEAR THE IDS,TO START REGISTER FROM FRESH AND AVOID PREVIOUS ENTITYID BASED API CALLS
    this.commonService.contractorDetails = {
      entity_id: '', contractor_id: '', entitycode: ''
    }
  }
  public showOverview = false;
  // TBD
  public jobType: string = '';
  public opened = true;
  public ifCheck = false;

  // TO NAVIGATE TO REGISTER PAGE DEPENDING ON THE JOB TYPE USER HAS SELECTED
  public navigate()
  {
  	// TBD
    if (this.jobType.toLowerCase() === 'contractor') {
     this.router.navigateByUrl (`register/${this.jobType.toLowerCase()}`)
    } else {
        this.ifCheck = true;
        this.opened = true;
    }
    
  }

  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
    this.ifCheck = false;
  }
}
