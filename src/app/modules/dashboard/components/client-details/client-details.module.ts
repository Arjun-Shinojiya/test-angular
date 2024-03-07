import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { NotesComponent } from './components/notes/notes.component';
import { StructuresComponent } from './components/structures/structures.component';
import { ClientDetailsComponent } from './client-details.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { MediaComponent } from './components/media/media.component';
import { MediaNavbarComponent } from './components/media/Components/media-navbar/media-navbar.component';
import { MediaAssetBarComponent } from './components/media/Components/media-assetbar/media-assetbar.component';
import { MediaAssetComponent } from './components/media/Components/media-asset/media-asset.component';
import { InputsModule } from "@progress/kendo-angular-inputs";
import { FormsModule } from '@angular/forms';
import { ChipModule } from '@progress/kendo-angular-buttons';
import { AutoCompleteModule } from '@progress/kendo-angular-dropdowns';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaAssetViewComponent } from './components/media/Components/media-asset/components/media-asset-view/media-asset-view.component';
import { DeckingImagesComponent } from './components/structures/components/decking-images/decking-images.component';
import { PopupModule } from "@progress/kendo-angular-popup";
import { UploadsModule } from "@progress/kendo-angular-upload";
import { DeckingNotesComponent } from './components/structures/components/decking-notes/decking-notes.component';
import { DeckingAudiosComponent } from './components/structures/components/decking-audios/decking-audios.component';
import { DeckingVideosComponent } from './components/structures/components/decking-videos/decking-videos.component';
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { InsuranceDocsComponent } from './components/insurance-docs/insurance-docs.component';
import { MicsDocsComponent } from './components/mics-docs/mics-docs.component';
import { MeasurementsComponent } from './components/measurements/measurements.component';
import { ProgressBarModule } from "@progress/kendo-angular-progressbar";
import { QuestionComponent } from './components/structures/components/questions/question.component';

@NgModule({
  declarations: [
    ClientDetailsComponent,
    ClientInfoComponent,
    NotesComponent,
    StructuresComponent,
    MediaComponent,
    MediaNavbarComponent,
    MediaAssetBarComponent,
    MediaAssetComponent,
    MediaAssetViewComponent,
    DeckingImagesComponent,
    DeckingNotesComponent,
    DeckingAudiosComponent,
    DeckingVideosComponent,
    InsuranceDocsComponent,
    MicsDocsComponent,
    MeasurementsComponent,
    QuestionComponent
],
  imports: [
    CommonModule,
    ClientRoutingModule,
    LayoutModule,
    ScrollViewModule,
    InputsModule,
    FormsModule,
    ChipModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    PopupModule,
    UploadsModule,
    DialogsModule,
    ProgressBarModule
  ]
})
export class ClientDetailsModule { }
