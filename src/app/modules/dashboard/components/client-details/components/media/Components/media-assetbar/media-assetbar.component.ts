import { Component } from '@angular/core';

@Component({
  selector: 'app-media-assetbar',
  templateUrl: './media-assetbar.component.html',
  styleUrls: ['./media-assetbar.component.scss']
})
export class MediaAssetBarComponent {

  public assets: any = ['Roof' , 'Window', 'Siding' , 'Fencing', 'Doors', 'Accessories']
  public currentAsset: string = "Roof";
  

  ngOnInit(){}

  public setAsset(asset: string) {
    this.currentAsset = asset;
  }
}
