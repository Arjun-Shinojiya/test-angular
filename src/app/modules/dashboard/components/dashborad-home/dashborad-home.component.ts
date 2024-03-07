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

/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component
({
  selector: 'app-dashborad-home',
  templateUrl: './dashborad-home.component.html',
  styleUrls: ['./dashborad-home.component.scss'],
})

export class HomeDashboardComponent
{

  public companyDetails: any 
  public fileStatus : any

  constructor (
    private apiService: ApiService,
    ) {}

  ngOnInit()
  {
    this.getCompanyDetails()
    this.getFileStatus()
   
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
          this.companyDetails = response.data[0];
        }
  
        else {
          console.log(error)
        }
      })
    }
    
    
  }

  // FUNCTION TO FETCH THE STATUSES FROM API
  public getFileStatus() 
  {
    const userData:any = localStorage.getItem("userData");

    if(userData){
      this.apiService.get('/entity/get-file-statues-by-id?id=' + JSON.parse(userData).userId).subscribe((response) => 
      {
        if ( response.status === 'success' ) 
        {
          this.fileStatus = response.data;
        }
  
        else 
        {
          console.log(error)
        }
      })
    }
  }
}
