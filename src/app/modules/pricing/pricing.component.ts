import { Component } from '@angular/core'
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent {
  public items = [
    {
      icon: 'assets/images/svg/home.svg',
      text: '$297 for up to 2 structures (main house + shed/detached garage (ie)). Your first residential file is FREE.',
      heading: 'Residential Properties',
    },
    {
      icon: 'assets/images/svg/Icons4.svg',
      text: '5% of the increase between the original carrier RCV and the updated carrier RCV. if no original carrier estimate is provided to TotalClaim by client.the claim handling fee will be 2.5% of the total of the final carrier RCV.',
      heading: 'Claim Handling',
    },
    {
      icon: 'assets/images/svg/commercial.svg',
      text: 'Commercial and multifamily files are billed at $500 per building. TotalScope will invoice client separately for these files.',
      heading: 'Commercial Properties',
    },
    {
      icon: 'assets/images/svg/enterprise.svg',
      text: 'For volume north of 100 files per month, call us to discuss enterprise-level pricing for your organization',
      heading: 'Enterprise Pricing',
    },
  ]
}
