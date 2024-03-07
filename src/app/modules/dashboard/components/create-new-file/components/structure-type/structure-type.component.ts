
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


// DECLARE VARIABLE $ TO ANY TYPE. LATER, IT CAN BE CAST TO THE DESIRED TYPE.
declare var $: any;
/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component
({
  selector: 'app-structure-type',
  templateUrl: './structure-type.component.html',
  styleUrls: ['./structure-type.component.scss'],
})

export class StructureTypeComponent
{
  // CREATING INPUT AND OUTPUT EMITTER FOR DATA COMMUNICATION TO PARENT COMPONENTS
  @Output() isValid = new EventEmitter();
	@Output() currentPage = new EventEmitter();
  @Input() current: number = 0;
  
  public showOtherType: boolean = false;

  structureTypeForm = new FormGroup({
    structureName: new FormControl('',{validators: [Validators.required]}),
    structureType: new FormControl('dwelling'),
    otherType: new FormControl('',{validators: [Validators.required]}),
  });

  constructor () {}

  ngOnInit() {}

  public onStructureTypeClick(value: string)
  {
    if( value === 'other')
    {
      this.showOtherType = true;
    }
    else
    {
      this.showOtherType = false;
    }
  }

}
