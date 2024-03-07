import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/core/api.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent {

  public fileOwnerInfo: any = {};
  public clientInfo: any = {};
  public salesManagerInfo: any = {};

  public selectedPropertyType: string = 'SINGLE FAMILY';
  public selectedEstimateType: string = 'Insurance Claim';
  public selectedClaimHandling: boolean = true;
  public selectedWarranted: boolean = true;
  public selectedTradeRates: boolean = true;
  public selectedTelemetryReport: boolean = true;
	public expandedIndex = 0;
  public propertyId: string | null = '';

  constructor ( private apiService: ApiService, private route: ActivatedRoute ) { }

  ngOnInit()
  {
    this.route.paramMap.subscribe(params => {
      this.propertyId = params.get('propertyId');
    });
    this.getPropertyInfo();
  }

  // FUNCTION TO GET PROPERTY INFORMATION
	public getPropertyInfo() 
	{

		this.apiService.get(`/properties/get-property-info/${this.propertyId}`)
			.subscribe((response) => {
				if (response.status === 'success') 
				{
					this.fileOwnerInfo = response.data[0];
          this.clientInfo = response.data[0];
          this.salesManagerInfo = response.data[0]
          this.selectedPropertyType = response.data[0]?.propertytype;
          this.selectedEstimateType = response.data[0]?.filetype;
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


  public onPropertyTypeChange(value: string) {
    this.selectedPropertyType = value;
  }

  public onEstimateTypeChange(value: string) {
   this.selectedEstimateType = value;
  }

  public onClaimHandlingChange(value: boolean) {
    this.selectedClaimHandling = value;
  }

  public onWarrantedChange ( value : boolean) {
    this.selectedWarranted = value;
  }

  public onTradeRatesChange (value : boolean ) {
    this.selectedTradeRates = value;
  }

  public onTelemetryReportChange (value : boolean ) {
    this.selectedTelemetryReport = value;
  }

}
