import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { InputsModule } from "@progress/kendo-angular-inputs";
import { FormsModule } from '@angular/forms';
import { ChipModule } from '@progress/kendo-angular-buttons';
import { AutoCompleteModule } from '@progress/kendo-angular-dropdowns';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupModule } from "@progress/kendo-angular-popup";
import { UploadsModule } from "@progress/kendo-angular-upload";
import { CreateNewFileComponent } from './create-new-file.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { LabelModule } from "@progress/kendo-angular-label";
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { PropertyTypeComponent } from './components/property-type/property-type.component';
import { ProgressBarModule } from "@progress/kendo-angular-progressbar";
import { StructureTypeComponent } from './components/structure-type/structure-type.component';
import { PropertyScopeComponent } from './components/property-scope/property-scope.component';
import { SharedModule } from "../../../../shared/shared.module";


@NgModule({
  declarations: [
    CreateNewFileComponent,
    PersonalInfoComponent,
    PropertyDetailsComponent,
    PropertyTypeComponent,
    StructureTypeComponent,
    PropertyScopeComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ScrollViewModule,
    InputsModule,
    FormsModule,
    ChipModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    PopupModule,
    UploadsModule,
    LabelModule,
    DropDownsModule,
    ProgressBarModule,
    SharedModule

  ]
})
export class CreateNewFileModule { }
