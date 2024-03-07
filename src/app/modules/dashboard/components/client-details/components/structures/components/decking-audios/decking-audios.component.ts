import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UploadComponent } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-decking-audios',
  templateUrl: './decking-audios.component.html',
  styleUrls: ['./decking-audios.component.scss']
})
export class DeckingAudiosComponent {

  @ViewChild('upload', { static: false }) uploadComponent: any;
  @Input() public data: any = [];
  public showUpload: boolean = false;
  public selectedFile: File | null = null;
  public imageUrl: string | ArrayBuffer | null = null;
  public show: boolean = false;
  public uploadSaveUrl = "saveUrl"; 
  public uploadRemoveUrl = "removeUrl"; 
  public play: boolean = true;
  public uploadProgress: number = 0;

  constructor(){}

  // FUNCTION TO SHOW THE UPLOAD SECTION
  public onClickAdd()
  {
    this.showUpload = true;
  }

  //FUNCTION TO SHOW THE SELECT SECTION
  public onClickCancel()
  {
    this.showUpload = false;
  }

  public viewImage()
  {
    console.log('Hello')
    this.show= true;
  }

  handleFileSelection(event: any) {
    // Your logic to handle the selected file goes here
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
  }

  // FUNCTION TO CHANGE BOOLEAN EXPRESSION
  public onPlay()
  {
    this.play = !this.play;
  }

  // FUNCTION TO UPLOAD IMAGE
  public onClickSelectFile() 
  {
   console.log('onclick Select File')
    const fileInput = document.getElementById('selectFile') as HTMLInputElement;
   //  fileInput.click();
  }

  // FUNCTION TO GENERATE THE IMAGE URL
  public onFileSelected(event: any) 
  {
   console.log('onFile Selected')
    const file = event.target.files[0];

    if (file) 
    {
      this.selectedFile = file;
      // Read the file and generate a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result as string;
        this.uploadProgress = 100;
      };
      reader.readAsDataURL(file);
    }
  }

  // FUNCTION TO CALCULATE THE SIZE OF THE IMAGE
  public formatFileSize(size: number): string 
  {
    const KB = 1024;
    const MB = KB * 1024;

    if (size < KB) 
    {
      return size + ' B';
    } 
    else if (size < MB) 
    {
      return (size / KB).toFixed(2) + ' KB';
    } 
    else 
    {
      return (size / MB).toFixed(2) + ' MB';
    }
  }

  public onRemove()
  {
    this.imageUrl = null;
  }

 
}
