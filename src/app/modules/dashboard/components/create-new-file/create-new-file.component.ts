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
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StepType } from "@progress/kendo-angular-layout";
import { ApiService } from 'src/core/api.service';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { PropertyTypeComponent } from './components/property-type/property-type.component';
import { ActivatedRoute, Router } from '@angular/router';


// DECLARE VARIABLE $ TO ANY TYPE. LATER, IT CAN BE CAST TO THE DESIRED TYPE.
declare var $: any;
/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component
({
  selector: 'app-create-new-file',
  templateUrl: './create-new-file.component.html',
  styleUrls: ['./create-new-file.component.scss'],
})

export class CreateNewFileComponent implements OnInit,OnDestroy
{

  @ViewChild (PersonalInfoComponent) personalInfoComponent!: PersonalInfoComponent;
  @ViewChild (PropertyDetailsComponent) propertyDetailsComponent!: PropertyDetailsComponent;
  @ViewChild (PropertyTypeComponent) propertyTypeComponent!: PropertyTypeComponent;

  public current = 0;
  public stepType: StepType = "indicator";
  public stepTypes: Array<StepType> = ["indicator", "label", "full"];
  public steps = 
  [
    { label: "First step", isValid: false, disabled: "true" },
    { label: "Second step", isValid: false , disabled: "true"},
    { label: "Third step", isValid: false , disabled: "true"},
    { label: "Fourth step", isValid: false, disabled: "true" },
    { label: "Fifth step", isValid: false, disabled: "true" },
  ];


  constructor (
    private apiService: ApiService,
    private router:Router,
    private activatedRouter:ActivatedRoute
    ) {}

  ngOnInit()
  {
    //ACCORDING TO ACTIVATED ROUTE IT TAKES CURRENT VALUE
		this.activatedRouter.params.subscribe((event: any) =>
		{			
      if (this.activatedRouter.snapshot.paramMap.get("step")){
        this.current = Number(event.step) - 1;
      }
		});
  }

  public next()
  {
    if ( this.current === 0 )
    {
      this.personalInfoComponent.saveInfo();
    }
    else if( this.current === 1 )
    {
      this.propertyDetailsComponent.saveInfo()
    }
    else if( this.current === 2 )
    {
      this.propertyTypeComponent.saveInfo()
    }
  }

  public prev()
  {
    this.jumpStep(this.current);
    this.current = this.current - 1;
  }

  /**
   * FOR CHECK THE STEP IS VALID OR NOT FOR MOVING TO NEXT STEP
   * @param index STEP INDEX VALUE
   * @param event BOOLEAN VALUE FOR STEPPER IS VALID OR NOT
   */
  public updateValidStep(index: number, event: boolean)
	{
		this.steps[index].isValid = event;
    this.current = this.steps[index].isValid ? this.current + 1 : this.current;
		console.log('sessionStep',this.current ,JSON.stringify(this.steps),);
	}

  /**
   * GO TO NEXT OR PREVIOUS STEP WITH IT'S CURRENT STEP INDEX
   * @param step STEPS VALUE
   */
	public jumpStep(step: any)
	{
		console.log('jumpStep', step);
		if (step <= this.steps.length && step > 0)
		{
			this.router.navigate(['/dashboard/create-new-file/' + step]);
		}
	}

  /**
   * Destroy the owner id and property id from local storage
   */
  ngOnDestroy(){
    localStorage.removeItem('owner_id');
    localStorage.removeItem('property_id');
  }


}
