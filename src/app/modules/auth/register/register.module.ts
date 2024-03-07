/**
 *          FILENAME: register.module.ts
 *             ROUTE: totalscope_webclient/src/app/modules/auth/
 *            AUTHOR: ICI/SZ
 *              WHAT: HANDLES REGISTRATION-RELATED COMPONENTS AND FUNCTIONALITY. 
 *               HOW: LOAD ALL THE COMPONENTS TO BE USED IN DIFFERENT PLACES AND STAY SEPARATED FROM CONCERNS AND LOAD WHEN NEEDED.
 *   IMPORTING FILES: shared.module.ts | register-routing.module.ts | company-type.component.ts
					  | registration.component.ts | contractorprofile.component.ts | contractordetails.component.ts
 * SUBSCRIBING FILES: app-routing.module.ts | auth-routing.module.ts | register-routing.module.ts 
					  | registration.component.ts | contractor-details.component.ts
 *  LAST COMMIT DATE: SEPTEMBER 19, 2023
 */

/**
 * IMPORT THE NECESSARY ANGULAR AND KENDO BUILDING BLOCKS.
 * COMMONMODULE | PROVIDES ACCESS TO COMMON DIRECTIVES SUCH AS NGIF, NGFOR, AND NGSWITCH.
 * NGMODULE | PROVIDES THE BASIC BUILDING BLOCKS FOR CREATING AN ANGULAR MODULE.
 * FORMSMODULE | ACCESS TO THE DIRECTIVES AND SERVICES THAT IMPLEMENT THE FORMS API.
 * LABELMODULE | CUSTOM LABEL COMPONENTS.
 * LAYOUTMODULE | SET OF COMPONENTS AND DIRECTIVES FOR LAYING OUT THE COMPONENTS IN AN ANGULAR APPLICATION.
 * REACTIVEFORMSMODULE | FUNCTIONALITY FOR REACTIVE FORMS.
 * BUTTONSMODULE | BUTTONS AND BUTTON COMPONENTS.
 * ICONSMODULE | ICONS AND ICON COMPONENTS.
 * INPUTSMODULE | INPUT COMPONENTS.
 * DROPDOWNSMODULE | DROPDOWN COMPONENTS.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LabelModule } from "@progress/kendo-angular-label";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { IconsModule } from "@progress/kendo-angular-icons";
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";

/**
 * SHAREDMODULE | CONTAINS COMPONENTS THAT CAN BE USED IN MULTIPLE FILES IN THE PROJECT.
 * REGISTERROUTINGMODULE | CONTAINS ROUTES FOR THE REGISTRATION PAGE.
 * ENTITYTYPECOMPONENT | SELECTS A ENTITY TYPE.
 * REGISTRATIONCOMPONENT | OPENS REGISTRATION FORM.
 * ENTITYPROFILECOMPONENT | CREATES A ENTITY PROFILE.
 * FOOTERCOMPONENT | DISPLAYS A FOOTER.
 * ENTITYDETAILSCOMPONENT | ENTERS ENTITY DETAILS.
 */
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { CompanyTypeComponent } from './company-type/company-type.component';
import { RegistrationComponent } from './contractor/registration.component';
import { footerComponent } from './components/footer/footer.component';
import { CreateUsersComponent } from './contractor/components/createusers/createusers.component';
import { ContractorDetailsComponent } from './contractor/components/contractordetails/contractordetails.component';
import { ContractorProfileComponent } from './contractor/components/contractorprofile/contractorprofile.component';
import { PopupModule } from '@progress/kendo-angular-popup';
import { OverviewComponent } from './overview/overview.component';
import { PaymentdetailsComponent } from './contractor/components/paymentdetails/paymentdetails.component';
import { CodeofconductComponent } from './contractor/components/codeofconduct/codeofconduct.component';
import { ConclusionComponent } from './contractor/components/conclusion/conclusion.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GenericService } from 'src/app/services/generic.service';
import { DashboardModule } from '../../dashboard/dashboard.module';





/**
 * DEFINES AN ANGULAR MODULE USING AN @NGMODULE DECORATOR. 
 * IT INCLUDES DECLARATIONS FOR COMPONENTS (COMPANYTYPECOMPONENT, REGISTRATIONCOMPONENT, ETC.) 
 * AND IMPORTS OTHER MODULES (COMMONMODULE, REACTIVEFORMSMODULE, ETC.) TO PROVIDE VARIOUS FUNCTIONALITY
 * LIKE FORM VALIDATION, INPUT FIELDS, BUTTONS, ICONS, AND DROPDOWN MENUS.
 */
@NgModule
	({
		declarations:
			[
				CompanyTypeComponent,
				RegistrationComponent,
				ContractorProfileComponent,
				footerComponent,
				ContractorDetailsComponent,
				CreateUsersComponent,
				OverviewComponent,
    			PaymentdetailsComponent,
				CodeofconductComponent,
				ConclusionComponent
			],
		imports:
			[
				CommonModule,
				RegisterRoutingModule,
				ReactiveFormsModule,
				InputsModule,
				ButtonsModule,
				IconsModule,
				SharedModule,
				FormsModule,
				LabelModule,		
				LayoutModule,
				DropDownsModule,
				PopupModule,
                DialogsModule
				
			],
			exports:[
				CreateUsersComponent
			],
			providers:[GenericService]
	})

/**
 * INTRODUCES THE REGISTERMODULE CLASS, WHICH ENHANCES FLEXIBILITY IN MODULAR APP DEVELOPMENT 
 * BY FACILITATING MODULAR MODULE REGISTRATION.
 */
export class RegisterModule { }
