import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AutoCompleteComponent } from "@progress/kendo-angular-dropdowns";
import { ChipRemoveEvent } from "@progress/kendo-angular-buttons";
import { SVGIcon } from "@progress/kendo-angular-icons";
import * as allSvgIcons from "@progress/kendo-svg-icons";
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit{

  public dataArr:any = [];
  isClassAdded:boolean = false;

  constructor(){}

  @ViewChild("contactslist")
  public list!: AutoCompleteComponent;

  notesForm!: FormGroup;

  public contacts: any = [
    { label: "Chris"},
    { label: "Drew"},
    { label: "Alina" },
    { label: "Deen" },
    { label: "Michael" },
    { label: "Mark" },
  ];
  public svgX: SVGIcon = allSvgIcons.xIcon;
  public selectedContacts: any = [this.contacts[0]];

  public valueChange(contact: any): void {
    if (contact === "") {
      return;
    }

    const contactData = this.contacts.find((c:any) => c.label === contact);

    if (!this.selectedContacts.includes(contactData)) {
      this.selectedContacts.push(contactData);
    }

    this.list.reset();
  }

  public onRemove(e: ChipRemoveEvent): void {
    const index = this.selectedContacts
      .map((c:any) => c.label)
      .indexOf(e.sender.label);
    this.selectedContacts.splice(index, 1);
  }

  ngOnInit(): void 
	{
    this.dataArr = [
      {
        name: 'Chris Rossetti',
        date: 'Sep 21, 2023',
        type: 'Sales Rep',
        notified: '5',
        content: "Thank you for the update regarding the change in our invoicing process. I've noted the new email address"
      },
      {
        name: 'Drew Suttle',
        date: 'Sep 21, 2023',
        type: 'Claim Handler',
        notified: '5',
        content: "Thank you for the update regarding the change in our invoicing process. I've noted the new email address"
      }
    ]

    this.notesForm = new FormGroup({
      intro: new FormControl('')
    })
  }

  addClassOnClick(){
    this.isClassAdded = !this.isClassAdded;
  }
}
