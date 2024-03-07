import { Component } from '@angular/core';

@Component({
  selector: 'app-media-asset-view',
  templateUrl: './media-asset-view.component.html',
  styleUrls: ['./media-asset-view.component.scss']
})
export class MediaAssetViewComponent {

  public assets: any = [
    {url: 'assets/images/png/image.png' , title: 'decking01.jpg', isSelected: false},
    {url: 'assets/images/png/image2.png' , title: 'decking02.jpg', isSelected: false},
    {url: 'assets/images/png/image3.png' , title: 'decking03.jpg', isSelected: false},
    {url: 'assets/images/png/image4.png' , title: 'decking04.jpg', isSelected: false},
    {url: 'assets/images/png/image4.png' , title: 'decking05.jpg', isSelected: false},
    {url: 'assets/images/svg/speaker.svg' , title: 'voice.wav', isSelected: false},
    {url: 'assets/images/svg/video-camera.svg' , title: 'video.mp4', isSelected: false},
  ];
  
  public showButtons: boolean = false;
  public show: boolean = false;
  public popupURL: string = '';
  
  // FUNCTION TO APPLY CONDITIONAL CLASSES
  public selectAsset(selectedAsset: any) {
    if (selectedAsset.isSelected === false) {
      selectedAsset.isSelected = true;
    } else if (selectedAsset.isSelected === true) {
      selectedAsset.isSelected = false;
    }
    this.showButtons = this.buttonShow(); 
  }
  
  // FUNCTION TO CHECK IF ANY ITEM SELECTED
  buttonShow(): boolean {
    return this.assets.some((item: { isSelected: boolean; }) => item.isSelected === true);
  }

  onDoubleClick (url: string)
  {
    this.popupURL = url;
    this.show = true;
  }

  close()
  {
    this.show = false;
  }
  
}
