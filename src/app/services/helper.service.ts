import {Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';

// RESPONSIBLE TO HOLD THE GLOBAL VARIABLES AND FUNCTIONS.
@Injectable()
export class HelperService
{
  public userEmail = '';

  // OBSERVABLE TO BE TRIGGERED ON STEPPER CHANGE.
	public onSteperChange: Subject <any> = new Subject <any> ();

  // OBSERVABLE TO BE TRIGGERED ON STEPPER VALIDATION ERROR.
  public onSteperValidationError: Subject <any> = new Subject <any> ();
	
	// HOLDS THE APPLICATION PERMISSION FOR THE LOGGED IN USER BY ROLE.
	public permissions: any = [];

	// HOLDS THE APPLICATION PERMISSION FOR THE LOGGED IN USER BY ROLE.
	public translations: any = [];
	
	public staticDataLoaded = false;
	
	public bankData : Array<{ id: string; bank_name: string; image: string }> = [
    {'id': '01', 'bank_name': 'Bank of America', 'image': './assets/images/images.png' },
    {'id': '02', 'bank_name': 'Wells Fargo', 'image': './assets/images/images.png' },
    {'id': '03', 'bank_name': 'JPMorgan Chase', 'image': './assets/images/images.png' },
    {'id': '04', 'bank_name': 'Pnc bank', 'image': './assets/images/images.png' },
    {'id': '05', 'bank_name': 'Capital One', 'image': './assets/images/images.png' },
    {'id': '06', 'bank_name': 'Citibank', 'image': './assets/images/images.png' },
    {'id': '07', 'bank_name': 'Goldman Sachs', 'image': './assets/images/images.png' },
    {'id': '08', 'bank_name': 'T d Bank', 'image': './assets/images/images.png' },
    {'id': '09', 'bank_name': 'Truist Bank', 'image': './assets/images/images.png' },
    {'id': '10', 'bank_name': 'U.S. Bank Branch', 'image': './assets/images/images.png' },
    {'id': '11', 'bank_name': 'Citizens Bank', 'image': './assets/images/images.png' },
    {'id': '12', 'bank_name': 'Bank of New York Mellon', 'image': './assets/images/images.png' },
    {'id': '13', 'bank_name': 'BMO', 'image': './assets/images/images.png' },
    {'id': '14', 'bank_name': 'C i t bank', 'image': './assets/images/images.png' },
    {'id': '15', 'bank_name': 'Fifth Third Bank', 'image': './assets/images/images.png' },
    {'id': '16', 'bank_name': 'HSBC', 'image': './assets/images/images.png' },
    {'id': '17', 'bank_name': 'Huntington National Bank', 'image': './assets/images/images.png' },
    {'id': '18', 'bank_name': 'KeyBank', 'image': './assets/images/images.png' },
    {'id': '19', 'bank_name': 'Morgan Stanley', 'image': './assets/images/images.png' },
    {'id': '20', 'bank_name': 'State Street', 'image': './assets/images/images.png' },
    {'id': '21', 'bank_name': 'Ally Bank', 'image': './assets/images/images.png' },
    {'id': '22', 'bank_name': 'American Express', 'image': './assets/images/images.png' },
    {'id': '23', 'bank_name': 'Arvest Bank', 'image': './assets/images/images.png' },
    {'id': '24', 'bank_name': 'Bank of New England', 'image': './assets/images/images.png' },
];

  // CLASS CONSTRUCTOR
  constructor()
  {}

  // FUNCTION TO CHECK PERMISSION BY THE PERMISSION ID.
  public checkPermission(permission_id: string)
  {
    // FIND THE ROW BY PERMISSION ID FROM THE PREMISSION ARRAY.
    let check = this.permissions.find((x: any) => (x.permission_id == permission_id && x.permission == 'YES'));
    
    // IF FOUND, RETURN TRUE
    if (check)
      return true;
    else
      return false;
  }

}
