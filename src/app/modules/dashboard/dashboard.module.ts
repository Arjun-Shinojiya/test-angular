/**
 *          FILENAME: home.module.ts
 *             ROUTE: totalscope_webclient/src/app/modules/dashboard/
 *            AUTHOR: ICI/AD
 *              WHAT: SERVES AS A CONTAINER FOR VARIOUS COMPONENTS AND SERVICES THAT ARE RELATED TO THE DASHBOARD.
 *               HOW: ENCAPSULATES AND ORGANIZES COMPONENTS AND MODULES RELATED TO THE DASHBOARD.
 *   IMPORTING FILES: leftmenu.component.ts | topbar.component.ts
 * SUBSCRIBING FILES: app-routing.module.ts
 *  LAST COMMIT DATE: DECEMBER 12, 2023
 */

/**
 * COMMONMODULE | PROVIDES ACCESS TO CERTAIN COMMON DIRECTIVES THAT CAN BE USED IN THE TEMPLATES OF COMPONENTS DECLARED WITHIN AN NGMODULE.
 * BUTTONSMODULE | PROVIDES ACCESS TO THE KENDO UI BUTTON COMPONENTS.
 * NGMODULE | HELPS ORGANIZE AN APPLICATION INTO COHESIVE BLOCKS OF FUNCTIONALITY.
 */
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownListModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DragDropDirective } from 'src/directives/drag-drop.directive';


import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BodyModule, GridModule, PagerModule } from '@progress/kendo-angular-grid';
import { InputsModule, RadioButtonModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountsComponent } from './components/accounts/accounts.component';
import { addNewCardComponent } from './components/add-new-card/add-new-card.component';
import { BulkPurchaseComponent } from './components/bulk-purchase/bulk-purchase.component';
import { ClientDetailsModule } from './components/client-details/client-details.module';
import { CreateNewFileModule } from './components/create-new-file/create.new-file.module';

import { HomeDashboardComponent } from './components/dashborad-home/dashborad-home.component';
import { EditCompanyProfileComponent } from './components/edit-company-profile/edit-company-profile.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { ManageFilesComponent } from './components/manage-files/manage-files.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { RegisterModule } from '../auth/register/register.module';

/**
 * DEFINES A MODULE USING THE @NGMODULE DECORATOR, CONTAINING THE DASHBOARDCOMPONENT, LEFTMENU, TOPBAR COMPONENTS.
 */
@NgModule
({
  declarations:
  [
	DashboardComponent, // MAIN LANDING PAGE.
    LeftSidebarComponent,
    TopHeaderComponent,
    HomeDashboardComponent,
    ManageFilesComponent,
    ReportsComponent,
    AccountsComponent,
    MessagesComponent,
    PaymentsComponent,
    SettingsComponent,
    BulkPurchaseComponent,
    EditCompanyProfileComponent,
    DragDropDirective,
    addNewCardComponent,
    
  ],

  // IMPORTS AND INCLUDES HOMEROUTINGMODULE, COMMONMODULE, AND BUTTONSMODULE FROM THE LIBRARY
  // TO MAKE THEIR COMPONENTS AND SERVICES AVAILABLE IN THE CURRENT MODULE.
  imports: [DashboardRoutingModule, 
        CommonModule,
        ButtonsModule,
        LayoutModule,
        FormsModule,
        InputsModule, 
        LabelModule,
        RadioButtonModule,
        DateInputsModule,
        GridModule,
        BodyModule,
        ClientDetailsModule,
        PagerModule,
        DragDropModule,
        RegisterModule,
        
        ReactiveFormsModule,
        DropDownListModule,
        DropDownsModule,
        SharedModule,
        CreateNewFileModule
       
    ],
    
})

/**
 * DECLARES A CLASS NAMED HOMEMODULE FOR REPRESENTING HOME-RELATED OBJECTS AND THEIR PROPERTIES IN OBJECT-ORIENTED PROGRAMMING (OOP).
 */
export class DashboardModule{}
