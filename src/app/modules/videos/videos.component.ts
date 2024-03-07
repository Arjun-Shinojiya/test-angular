import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface MyMediaCard {
  videoSrc?: SafeResourceUrl;
}
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent {
  public active = 'tab1';

  public changeTab = (tab: string) => {
    this.active = tab;
  };
  public mediaCards: Array<MyMediaCard> = [
    {
      videoSrc: this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/kaiYwkoYtXI'
      ),
    },
  ];

  constructor(private sanitizer: DomSanitizer) {}
}
