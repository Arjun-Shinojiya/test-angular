
import {Component, EventEmitter, Input, Output} from '@angular/core';


// DECLARE VARIABLE $ TO ANY TYPE. LATER, IT CAN BE CAST TO THE DESIRED TYPE.
declare var $: any;
/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component
({
  selector: 'app-property-scope',
  templateUrl: './property-scope.component.html',
  styleUrls: ['./property-scope.component.scss'],
})

export class PropertyScopeComponent
{
  // CREATING INPUT AND OUTPUT EMITTER FOR DATA COMMUNICATION TO PARENT COMPONENTS
  @Output() isValid = new EventEmitter();
	@Output() currentPage = new EventEmitter();
  @Input() current: number = 0;
  
  // LIST OF SCOPED ITEMS
  public scopeItems: any = [
    {name: 'Doors', active: true, preSelected: false, icon: './assets/images/svg/door-closed.svg'},
    {name: 'Roof', active: false, preSelected: false, icon: './assets/images/svg/roof.svg'},
    {name: 'Gutters', active: false, preSelected: false, icon: './assets/images/svg/gutters.svg'},
    {name: 'Siding', active: false, preSelected: false, icon: './assets/images/svg/siding.svg'},
    {name: 'Windows', active: false, preSelected: false, icon: './assets/images/svg/windows.svg'},
    {name: 'Fencing', active: false, preSelected: false, icon: './assets/images/svg/fencing.svg'},
    {name: 'Painting', active: false, preSelected: false, icon: './assets/images/svg/painting.svg'},
    {name: 'Interior', active: false, preSelected: false, icon: './assets/images/svg/interior.svg'},
    {name: 'HVAC', active: false, preSelected: false, icon: './assets/images/svg/hvac.svg'},
    {name: 'A/C & Lights', active: false, preSelected: true, icon: './assets/images/svg/lights.svg'},
    {name: 'Other', active: false, preSelected: false, icon: './assets/images/svg/other.svg'},
  ]

  constructor () {}

  ngOnInit() {}

  // FUNCTION TO SELECT/UNSELECT THE SCOPEDITEMS.
  selectScope(index: number): void {
    if (!this.scopeItems[index].preSelected) {
      this.scopeItems[index].active = !this.scopeItems[index].active;
    }  
  }
}
