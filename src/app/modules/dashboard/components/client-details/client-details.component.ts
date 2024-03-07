import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/core/api.service';

@Component({
	selector: 'app-client-details',
	templateUrl: './client-details.component.html',
	styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent
{

	public ownerDetail: any = {};
	public propertyId: string | null = '';
	public tabSection: string | null = '';
	public show: boolean = false;
	public show2: boolean = false;
	public selectedClaimHandling: boolean = false;
	public selectedCarrierApproval: string = 'replacement';
	public selectedIntention: string = 'repairIntention';
	public selectedNotPossibleReason: string = 'damaged';
	public terms: any = [
		'To abide by our Terms of Service for claim handling',
		'That TotalClaim may choose not to claim handle this file',
		'If TotalClaim does handle this file, you agree to pay TotalClaim an amount equal to 5% of the increase between the original carrier RCV and the updated carrier RCV.'
	]

	constructor 
	(
		private apiService: ApiService, 
		private route: ActivatedRoute,
		private router: Router,
	) { }

	ngOnInit ()
	{
		this.route.paramMap.subscribe(params =>
		{
			this.propertyId = params.get('propertyId');
			this.tabSection = params.get('tabSection');
		});
		this.getOwnerDetail();
		
	}

	// FUNCTION TO ROUTE TO THE SELECTED TAB
	public onSelect(e: any)
	{
		this.router.navigate(["dashboard", "client-details", this.propertyId, e.title.split(' ').at(0).split('.').at(0)]);
	}

	// FUNCTION TO GET THE OWNER DETAILS
	public getOwnerDetail () 
	{

		this.apiService.get(`/properties/find/${this.propertyId}`)
			.subscribe((response) =>
			{
				if (response.status === 'success') 
				{
					this.ownerDetail = response?.data;
				}
				else 
				{
					console.error('Error fetching data:', response.error);
				}
			}, (error) => 
			{
				console.error('API Error:', error);
			});
	}

	public showPopup()
	{
		this.show = true;
	}

	public close()
	{
		this.show = false;
		this.show2 = false;
	}

	public onClaimHandlingChange (value: boolean) 
	{
    this.selectedClaimHandling = value;
  }

	public onCarrierApproval (value: string)
	{
		this.selectedCarrierApproval = value;
	}

	public onIntentionChange (value : string)
	{
		this.selectedIntention = value;
	}

	public onNotPossibleChange(value: string)
	{
		this.selectedNotPossibleReason = value;
	}

	public onSubmit()
	{
		this.show = false;
	}

	public onSubmitForClaim()
	{
		this.show = false;
		this.show2 = true;
	}

}
