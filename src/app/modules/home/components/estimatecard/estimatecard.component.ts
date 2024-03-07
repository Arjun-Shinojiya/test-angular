import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-estimate-card',
  templateUrl: './estimatecard.component.html',
  styleUrls: ['./estimatecard.component.scss'],
})
export class EstimateCardComponent {
  @Input() estimateCardData: { icon: string; text: string }

  constructor() {
    this.estimateCardData = { icon: '', text: '' }
  }
}
