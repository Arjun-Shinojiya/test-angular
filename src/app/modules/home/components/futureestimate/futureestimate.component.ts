import { Component } from '@angular/core'

@Component({
  selector: 'app-future-estimate',
  templateUrl: './futureestimate.component.html',
  styleUrls: ['./futureestimate.component.scss'],
})
export class FutureEstimateComponent {
  public onButtonClick(): void {
    console.log('click')
  }
}
