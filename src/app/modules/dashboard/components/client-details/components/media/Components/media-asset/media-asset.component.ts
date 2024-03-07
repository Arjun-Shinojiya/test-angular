import { Component } from '@angular/core';

@Component({
  selector: 'app-media-asset',
  templateUrl: './media-asset.component.html',
  styleUrls: ['./media-asset.component.scss']
})
export class MediaAssetComponent {
    
  public assets : any = ['Decking' , 'Roof Specs', 'Roofing Material', 'Ventilation', 'Chimneys', 'High Pitch Access', 'Accessories', 'Skylight']
  public assetView: boolean = false;

  public viewAsset (data: any ) {
   if(data === 'Decking') {
     this.assetView = true;
   }
  }
}
