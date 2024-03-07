import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { ContactRoutingModule } from './contact.routing';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ButtonsModule, ContactRoutingModule],
})
export class ContactModule {}
