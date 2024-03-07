import { Component } from '@angular/core';
import { ApiService } from 'src/core/api.service';

@Component({
  selector: 'app-bulk-purchase',
  templateUrl: './bulk-purchase.component.html',
  styleUrls: ['./bulk-purchase.component.scss']
})
export class BulkPurchaseComponent {

  public purchaseList: any = [
    // {dateTimeCreate: '2023-03-24 06:40:42', category: 'Bulk Purchase', quantity: 10, file_cost: 323, total_cost: '3,230' },
    // {dateTimeCreate: '2023-03-24 06:40:42', category: 'Bulk Purchase', quantity: 10, file_cost: 323, total_cost: '3,230' },
    // {dateTimeCreate: '2023-03-24 06:40:42', category: 'Bulk Purchase', quantity: 10, file_cost: 323, total_cost: '3,230' },
  ]

  constructor ( private apiService: ApiService ) { }

  ngOnInit()
  {
    this.getBulkPurchase();
  }

  // FUNCTION TO GET BULK PURCHASE DATA
	public getBulkPurchase() 
	{

		this.apiService.get(`/properties/get-bulk-file-purchase?user_id=iciuser`)
			.subscribe((response) => {
				if (response.status === 'success') 
				{
          this.purchaseList = response.data;
					// console.log(response.data, 'Response')
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
}
