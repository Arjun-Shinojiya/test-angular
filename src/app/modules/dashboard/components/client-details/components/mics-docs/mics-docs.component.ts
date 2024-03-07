import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mics-docs',
  templateUrl: './mics-docs.component.html',
  styleUrls: ['./mics-docs.component.scss']
})
export class MicsDocsComponent {

  @ViewChild('upload', { static: false }) uploadComponent: any;
  public showUpload: boolean = false;
  public selectedFile: File | null = null;
  public imageUrl: string | ArrayBuffer | null = null;
  public show: boolean = false;
  public uploadSaveUrl = "saveUrl";
  public uploadRemoveUrl = "removeUrl";
  public imageArray: any = [{ size: '2kb', checked: false }, { size: '2kb', checked: false }, { size: '2kb', checked: false }]
  public checked: boolean = false;
  public uploadProgress: number = 0;

  constructor() { }

  // FUNCTION TO SHOW THE UPLOAD SECTION
  public onClickAdd() {
    this.showUpload = true;
  }

  //FUNCTION TO SHOW THE SELECT SECTION
  public onClickCancel() {
    this.showUpload = false;
  }

  public viewImage() {
    console.log('Hello')
    this.show = true;
  }

  handleFileSelection(event: any) {

    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
  }

  // FUNCTION TO DELETE THE FILE
  public onDelete(index: number) {
    this.imageArray.splice(index, 1);
  }

  // FUNCTION TO UPDATE THE VALUE OF THE CHECK
  public updateCheckedStatus()
  {
    this.checked = this.imageArray.some((image: any) => image.checked);
  }

  // FUNCTION TO SELECT ALL FILES
  public checkAll()
  {
    for (let image of this.imageArray) {
      image.checked = true;
    }
    this.updateCheckedStatus()
  }

   // FUNCTION TO UPLOAD IMAGE
   public onClickSelectFile() 
   {
     const fileInput = document.getElementById('selectFile') as HTMLInputElement;
   }
 
   // FUNCTION TO GENERATE THE IMAGE URL
   public onFileSelected(event: any) 
   {
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
