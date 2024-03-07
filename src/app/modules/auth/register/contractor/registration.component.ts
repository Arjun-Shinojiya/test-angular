/*
			 FILENAME: registration.component.ts
				ROUTE: totalscope_web_client/src/app/modules/auth/register/contractor/
			   AUTHOR: ICI/SZ
				 WHAT: HOLDS THE REGISTRATION OF THE CONTRACTOR PROFILE FORM AND CONTAINS ALL THE CHILD COMPONENTS
				  HOW: THIS FILE CONTAINS A KENDO STEPPER WIDGET, AND ON THE CHANGE OF THE STEPPER MULTIPLE CHILD
				   	   COMPONENTS ARE BEING RENDERED
	  IMPORTING FILES: registration.component.html | registration.component.scss
	SUBSCRIBING FILES: register.module.ts | register-routing.module.ts
	 LAST COMMIT DATE: SEPTEMBER 19, 2023
*/

/**
 * IMPORTING ANGULAR MODULE
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {StepperActivateEvent} from '@progress/kendo-angular-layout';
import { HelperService } from 'src/app/services/helper.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";

/**
 * THIS COMPONENT REPRESENTS THE CONTRACTOR MANAGEMENT SECTION OF THE APP
 */
@Component
({
	selector: 'app-contractor',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss']
})

/**
 * COMPONENT THAT DEFINES THE STEPS OF THE 6-STEP REGISTRATION PROCESS
 */
export class RegistrationComponent implements OnInit
{
	// STEPPER CURRENT STEP
	public current = 0;
	public showOverview = false;
	public companyType = 'contractor';
	public onSteperValidation: any;

	// STEPPER LIST
	public steps =
	[
		{label: "Contractor Profile", isValid: false}, // FIRST STEP (1)
		{label: "Payment Details", isValid: false},
		{label: "Code of Conduct", isValid: false},
		{label: "Conclusion", isValid: false}, // LAST STEP
	];

	/**
	 * CONSTRUCTOR - AUTOMATICALLY CALLED WHEN INITIALIZING THIS COMPONENT
	 */
	constructor(
		private helper: HelperService,
		private router: Router,
		private route: ActivatedRoute
	)
	{
	}

	ngOnInit(): void
	{
		let companyType = this.router.url.split('/');

		if(companyType.length > 3)
		{
			this.companyType = companyType[companyType.length - 2];
		}else{
			this.companyType = companyType[companyType.length - 1];
		}

		switch(this.companyType)
		{
			case 'contractor':
				this.steps =
				[
					this.steps[0],
					{label: "Contractor Details", isValid: false},
					{label: "Create Users", isValid: false},
					...this.steps.slice(1)
				]
				break;
			case 'claimhandler':
				this.steps =
				[
					this.steps[0],
					{label: "Create Users", isValid: false},
					...this.steps.slice(1)
				]
				break;
		}

		this.onSteperValidation = this.helper.onSteperValidationError.subscribe((index: number) =>
		{
			console.log('invalid index', index);
			this.steps[index]['isValid'] = true;

		});

		if (this.route.snapshot.paramMap.get("step"))
		{
			this.current = Number(this.route.snapshot.paramMap.get("step")) - 1;
			console.log('current1',this.current,this.route.snapshot.paramMap.get("step"));
		}

		this.router.events.subscribe((event: any) =>
		{
			if (event instanceof NavigationEnd)
			{
				console.log('current3',this.route.snapshot.paramMap.get("step"));
				if (this.route.snapshot.paramMap.get("step"))
				{
					this.current = Number(this.route.snapshot.paramMap.get("step")) - 1;
					console.log('current2',this.current);
				}
			}
		});
	}

	ngOnDestroy()
	{
		this.onSteperValidation.unsubscribe();
	}

	/**
	 * DEFINES THE PREVIOUS BUTTON OF THE STEPPER
	 * NAVIGATES TO THE PREVIOUS STEP (IF AVAILABLE)
	 */
	public prev(): void
	{
		if (this.current > 0)
		{
			this.current -= 1;
		}
	}

	/**
	 * DEFINES THE NEXT BUTTON OF THE STEPPER
	 * NAVIGATES TO THE NEXT STEP (IF AVAILABLE)
	 */
	// public next(): void
	// {
	// 	console.log(this.current);
	// 	 if (this.current < this.steps.length - 1)
	// 	 {
	// 	 		this.current += 1;
	// 	 }
	// 	this.current += 1;
	// 	this.router.navigate(['/register/contractor/' + this.current]);
	// }

	public updateValidStep(index: number, event: boolean)
	{
		this.steps[index].isValid = event;
		console.log('sessionStep',JSON.stringify(this.steps));
	}

	public jumpStep(step: any)
	{
		console.log('jumpStep', step);
		if (step <= this.steps.length && step > 0)
		{
			this.router.navigate(['/register/contractor/' + step]);
		}else{
			this.router.navigate(['/register/contractor/']);
		}


	}

	// CALL THIS HELPER OBSERVER ON CHANGE STEPER
	onStepActivate(e: StepperActivateEvent): void
	{
		console.log('index',e.index);
		e.preventDefault();
		this.helper.onSteperChange.next(Number(e.index)+1);
	}
}
