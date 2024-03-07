// IMPORTING ANGULAR CORE LIBRARIES
import {Directive, Output, Input, EventEmitter, HostBinding, HostListener} from '@angular/core';

// ANGULAR DECLARATION FOR A DIRECTIVE
@Directive
({
  selector: '[appDragDrop]'
})

// DECLARING THE DragDropDirective CLASS 
export class DragDropDirective
{
  // EMITS THIS EVENT WHEN A FILE IS DROPPED ON THE HTML ELEMENT
  @Output() onFileDropped = new EventEmitter<any>();

  // CONTROLS THE CSS STYLE OF THE HTML ELEMENT
  @HostBinding ('style.opacity') public opacity = '1'
  
  // DRAGOVER LISTENER, ON DRAGOVER THE OPACITY OF THE ELEMENT CHANGES TO INDICATE SOME FILE IS BEING DRAGGED HERE
  @HostListener ('dragover', ['$event']) 
  onDragOver (evt: any)
  {
    evt.preventDefault();
    evt.stopPropagation();
    this.opacity = '0.8'
  }
  
  // DRAGLEAVE LISTENER, THE OPACITY IS RESTORED AFTER THE DRAG EVENT IS DONE
  @HostListener ('dragleave', ['$event'])
  public onDragLeave (evt: any)
  {
    evt.preventDefault();
    evt.stopPropagation();
    this.opacity = '1'
  }
  
  // DROP LISTENER
  @HostListener ('drop', ['$event'])
  public ondrop (evt: any)
  {
    evt.preventDefault();
    evt.stopPropagation();
    this.opacity = '1'

    // ONCE THE FILE IS DROPPED, WE WILL NOW CHECK FOR THE ITEM DROPPED AND EMIT THE NECESSARY EVENT
    if (evt.dataTransfer.items)
    {
      this.getFileList(evt.dataTransfer.items).then((filelist: any)=>
      {
        this.onFileDropped.emit (filelist);
      });
    }
    else
    {
      // IF THE FILES WERE NOT IN THE ITEMS PROPERTY, LET'S CHECK IF THE FILES ARE IN THE FILES PROPERTY OF DATATRANSFER
      for (var i = 0; i < evt.dataTransfer.files.length; i++)
      {
        // SEEMS LIKE THIS IS NEVER REACHED. KEEPING IT HERE JUST IN CASE, TO CATCH ANY CORNER CASE
        console.log ('... file[' + i + '].name = ' + evt.dataTransfer.files[i].name);
      }
    }
  }

  public getFileList(items: any)
  {
    return new Promise (async (resolve, reject) =>
    {
      let fileList = [];
      for (var i = 0; i < items.length; i++)
      {
        // IF DROPPED ITEMS AREN'T FILES, REJECT THEM
        if (items[i].kind === 'file')
        {
          // WE NOW GOT A FILE
          let file = items[i].getAsFile();
          fileList.push(file);
        }
      }

      if (fileList.length == items.length)
      {
        resolve(fileList);
      }
    });
  }
}
