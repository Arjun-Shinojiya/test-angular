
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { error } from 'jquery';
import { ApiService } from 'src/core/api.service';


// DECLARE VARIABLE $ TO ANY TYPE. LATER, IT CAN BE CAST TO THE DESIRED TYPE.
declare var $: any;
/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component
({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})

export class PersonalInfoComponent implements OnInit
{
	// CREATING INPUT AND OUTPUT EMITTER FOR DATA COMMUNICATION TO PARENT COMPONENTS
  @Output() isValid = new EventEmitter();
	@Output() currentPage = new EventEmitter();
  @Input() current: number = 0;

  public ownerId: string = '';
  public userId: string = '';
	public phoneMask = "(000) 000-0000";

  profileForm = new FormGroup({
    firstName: new FormControl('',{validators: [Validators.required,Validators.pattern("^[a-zA-Z\\s\\-\\']+$")], updateOn: 'blur' }),
    lastName: new FormControl('', {validators: [Validators.required, Validators.pattern("^[a-zA-Z\\s\\-\\']+$")], updateOn: 'blur'}),
    phone: new FormControl('',{validators: [Validators.required], updateOn: 'blur' }),
    email: new FormControl('',{validators: [Validators.required, Validators.email], updateOn: 'blur' }),
  });

  constructor 
  (
    private apiService: ApiService,
  ) {}

  ngOnInit() 
  {
    const userDataString = localStorage.getItem('userData');
    const ownerId = localStorage.getItem('owner_id');
    if (userDataString !== null) 
    {
      const userData = JSON.parse(userDataString);
      if( userData !== null )
      {
        this.userId = userData.userId;
      }
    }
    if ( ownerId !== null)
    {
      this.ownerId = ownerId;
      this.getOwnerInfo();
    }
  }

  public saveInfo()
  {
    if ( this.profileForm.valid )
    {
      if ( this.ownerId )
      {
        const payload = 
        {			
          namefirst: this.profileForm?.get('firstName')?.value,
          namelast: this.profileForm?.get('lastName')?.value,
          mobilephone: this.profileForm?.get('phone')?.value,
          email: this.profileForm?.get('email')?.value,
          owner_id: this.ownerId,
        }
        this.apiService.put(`/owner/update-owner`, payload ).subscribe({
          next: (response) =>
          {
            if (response.status === 'success')
            {
              this.isValid.emit(true);
              this.currentPage.emit(this.current + 1);
              console.log(response, "Response")
            }else{
              this.isValid.emit(false);
              console.log('error', response.message)
            }
    
          },
          error: (err) =>
          {
            this.isValid.emit(false);
            console.log('err', err)
          }
        });
      }
      else
      {
        const payload = 
        {			
          namefirst: this.profileForm?.get('firstName')?.value,
          namelast: this.profileForm?.get('lastName')?.value,
          mobilephone: this.profileForm?.get('phone')?.value,
          email: this.profileForm?.get('email')?.value,
        }
        this.apiService.post(`/owner/create-owner`, payload ).subscribe({
          next: (response) =>
          {
            if (response.status === 'success')
            {
              this.isValid.emit(true);
              this.currentPage.emit(this.current + 1);
              this.ownerId = response?.data?.object?.owner_id;
              localStorage.setItem('owner_id', this.ownerId)
            }else{
              this.isValid.emit(false);
              console.log('error', response.message)
            }
    
          },
          error: (err) =>
          {
            this.isValid.emit(false);
            console.log('err', err)
          }
        });
      }      
    }
    else
    {
      this.isValid.emit(false);
      this.profileForm.markAllAsTouched();
      console.log(error)
    }

  }

  // FUNCTION TO GET OWNER INFORMATION
  public getOwnerInfo()
  {
    this.apiService.get(`/owner/find/${this.ownerId}`).subscribe({
      next: (response) =>
      {
        if (response.status === 'success')
        {
          const data = response.data[0];
          response.data.length > 0 ?
          this.profileForm.patchValue({
            firstName: data?.namefirst,
            lastName: data?.namelast,
            phone: data?.mobilephone,
            email: data?.email
          }) : '';
        }

      },
      error: (err) =>
      {
        console.log('err', err)
      }
    });
  }

}
