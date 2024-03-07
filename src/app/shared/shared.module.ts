/**
 *          FILENAME: shared.module.ts  
 *             ROUTE: totalscope_webclient/src/app/shared/
 *            AUTHOR: ICI/NK
 *              WHAT: HELPS STREAMLINE THE ORGANIZATION AND MANAGEMENT OF SHARED RESOURCES
 *               HOW: PROMOTES CODE REUSABILITY AND MAINTAINABILITY BY ENCAPSULATING RELATED FUNCTIONALITIES AND MAKING THEM AVAILABLE FOR USE IN OTHER MODULES.
 *   IMPORTING FILES: translate.pipe.ts | language-switch.component.ts
 * SUBSCRIBING FILES: auth.module.ts | register.module.ts
 *  LAST COMMIT DATE: AUGUST 08, 2023
 */

/**
 * COMMONMODULE | CREATES COMPONENTS AND SERVICES.
 * NGMODULE | PROVIDES ACCESS TO COMMON DIRECTIVES.
 * FORMSMODULE | CREATES AND MANAGES FORMS.
 * REACTIVEFORMSMODULE | CREATES AND MANAGES REACTIVE FORMS.
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/**
 * INPUTSMODULE | PROVIDES KENDO COMPONENTS FOR BUILDING FORMS.
 */
import {InputsModule, RadioButtonModule} from '@progress/kendo-angular-inputs';

/**
 * TRANSLATEPIPE | TRANSLATES TEXT INTO ENGLISH AND SPANISH.
 * LANGUAGESWITCHCOMPONENT | SWITCHES BETWEEN ENGLISH AND SPANISH.
 */
import {TranslatePipe} from '../pipes/translate/translate.pipe';
import {LanguageSwitchComponent} from '../components/languageswitch/languageswitch.component';
import {PaymentCardComponent} from '../modules/dashboard/components/payment-card/payment-card.component';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {LayoutModule} from '@progress/kendo-angular-layout';
import {LabelModule} from '@progress/kendo-angular-label';
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';
import {BodyModule, GridModule, PagerModule} from '@progress/kendo-angular-grid';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DropDownListModule, DropDownsModule} from '@progress/kendo-angular-dropdowns';

/**
 * DECLARES AND EXPORTS COMPONENTS AND PIPES (E.G. TRANSLATEPIPE AND LANGUAGESWITCH COMPONENT) FOR USE IN OTHER MODULES.
 */
@NgModule
({
  declarations: 
  [
    TranslatePipe,
    LanguageSwitchComponent,
    PaymentCardComponent
  ],
  imports: 
  [
    CommonModule,
    FormsModule,
    InputsModule,
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
    PagerModule,
    DragDropModule,
    ReactiveFormsModule,
    DropDownListModule,
    DropDownsModule,
  ],
  exports: 
  [
    TranslatePipe,
    LanguageSwitchComponent,
    PaymentCardComponent
  ]
})

/**
 * EXPORTS A MODULE FOR SHARING COMPONENTS, DIRECTIVES, AND SERVICES.
 */
export class SharedModule{}
