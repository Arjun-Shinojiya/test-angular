import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

export interface Item {
  title?: string
  url?: string
}

export const data = [
  { title: 'Flower', url: 'https://bit.ly/2cJjYuB' },
  { title: 'Mountain', url: 'https://bit.ly/2cTBNaL' },
  { title: 'Sky', url: 'https://bit.ly/2cJl3Cx' },
]
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  @ViewChild('sv') private scrollView: any
  public paused = false
  public items: Item[] = data
  public width = '100%'
  public height = '100%'

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<img src="assets/images/svg/left_icon.svg" />', '<img src="assets/images/svg/right_icon.svg" />'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  } 
}
