import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingRoutingModule } from './pricing.routing';
import { PricingComponent } from './pricing.component';
import { PricingCardComponent } from './components/pricingcard/pricingcard.component';


@NgModule({
  declarations: [
    PricingComponent,
    PricingCardComponent
  ],
  imports: [
    CommonModule,
    PricingRoutingModule
  ]
})
export class PricingModule { }
