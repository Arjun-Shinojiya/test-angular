/**
 *          FILENAME: dashboard.component.ts
 *             ROUTE: totalscope_webclient/src/app/modules/dashboard/
 *            AUTHOR: ICI/AD
 *              WHAT: HOLDS MAIN WAREFRAME OF DASHBOARD
 *               HOW: THIS WILL INJECT THE LEFT MENU, TOP BAR AND PAGE CONTAINER.
 *   IMPORTING FILES: dashboard.component.html | dashboard.component.scss
 * SUBSCRIBING FILES: dashboard.module.ts | dashboard.routing.ts
 *  LAST COMMIT DATE: DECEMBER 12, 2023
 */

/**
 * COMPONENT | PROVIDES THE LOGIC AND TEMPLATE FOR CREATING COMPONENTS.
 */
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PageChangeEvent } from "@progress/kendo-angular-grid";
import { SVGIcon, folderIcon } from "@progress/kendo-svg-icons";
import { ApiService } from "src/core/api.service";


/**
 * @COMPONENT | DEFINES THE COMPONENT AND ITS PROPERTIES.
 * SELECTOR | DEFINES THE NAME OF THE COMPONENT.
 * TEMPLATEURL AND STYLEURLS | DEFINES THE HTML AND CSS FILES THAT ARE USED BY THE COMPONENT.
 */
@Component({
	selector: "app-manage-files",
	templateUrl: "./manage-files.component.html",
	styleUrls: ["./manage-files.component.scss"],
})
export class ManageFilesComponent {
	public checkMode: any = "multiple";
	public selectionMode: any = "single";
	public checkOnClick = false;
	public checkParents = true;
	public checkDisabledChildren = false;
	public checkChildren = true;
	public enableCheck = true;
	public checkInProgress = true;
	public checkUnsubmit = true;

	public folderSVG: SVGIcon = folderIcon;
	public loanData: any
	public pageSize = 9;
	public buttonCount = 4;
	public sizes = [10, 20, 50];
	public loanDataTableHeight: number = 200; // HEIGHT OF THE TABLE.
	public dataTablePageSize: number = 5; // NUMBER OF RECORDS TO BE DISPLAYED IN TABLE.
	public sort: any;
	public range = { start: new Date('2024-01-01'), end: new Date() };
	public totalRecords: number = 0;
	public totalPages: number = 0;
	public skip: number = 0;
	public userData: any;
	public propertyId: string = '';
	public sortby = 'date_added';
	public order = 'asc'
	public submissionStatus: any = ['NEW', 'INQUEUE', 'WITHDRAWN','DELETED', 'INPROCESS', 'REJECTED', 'COMPLETED', 'INEGOTIATION', 'CLOSED'];
	public tsStatus: any = ['AVAILABLE', 'COMPLETED', 'INPROCESS', 'REJECTRETURN']
	public selectedSubmissionStatus = this.submissionStatus[0];
	public selectedTsStatus = this.tsStatus[0];
	public timeList  = ['All Time', 'Today', 'Yesterday', 'Last 3 days', 'Last 7 days', 'Last 30 days', 'Last 90 days'];
	public selectedTime = this.timeList[0];
	public searchQuery: any = '';
	public viewMode: string = 'view';
	public showOverview: boolean = false;

	
	getStatusBackgroundColor(status: string): string 
	{
		switch (status) {
			case "AVAILABLE":
				return "available";
			case "INPROCESS":
				return "inprocess";
				case "COMPLETED":
				return "completed";
			case "REJECTRETURN":
				return "rejectreturn";
			default:
				return "";
			}
		}
		
		constructor ( private router: Router, private apiService: ApiService ) { }
		
		ngOnInit() 
		{
			this.getFiles();
		}
		
		// FUNCTION TO GET SEARCHED VALUE LIST
		public handleSearch(event: Event) 
		{
			const inputValue = (event.target as HTMLInputElement).value;
			this.searchQuery = inputValue;
			this.getFiles();
		}

		public updateShowOverview()
		{
			this.showOverview = !this.showOverview ;
		}


	// FUNCTION TO GET TEH USER ID
	public onCellClick(value: any) 
	{
		this.propertyId = value?.dataItem?.property_id;
		this.router.navigate(["dashboard", "client-details", this.propertyId, "Notes"]);
	}

	public onSortData(value: any) { }

	// FUNCTION TO GET THE FILES LIST
	public getFiles() 
	{
		const start_date = this.formatDate(this.range.start);
		const end_date = this.formatDate(this.range.end);

		const userData:any = localStorage.getItem("userData");

		if(userData){
		  this.apiService.get(`/files-progress/get-list-files-sort?userId=${JSON.parse(userData).userId}&status=${this.selectedTsStatus}&start_date=${start_date}&end_date=${end_date}&page=1&page_size=${this.pageSize}&sortby=${this.sortby}&order=${this.order}&search=${this.searchQuery}`)
			  .subscribe((response) => {
				  if (response.status === 'success') 
				  {
					  this.totalRecords = response.data?.total_count;
					  this.loanData = response.data?.files_list;
					  this.loadItems();
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

	public pageChange(event: PageChangeEvent): void 
	{
		this.skip = event.skip;
		this.loadItems();
	}

	private loadItems(): void 
	{
		if (this.loanData) {
			this.userData = {
				data: this.loanData.slice(this.skip, this.skip + this.pageSize),
				total: this.loanData.length,
			};

			this.totalPages = Math.ceil(this.loanData.length / this.pageSize);
		}
	}

	//FUNCTION TO SET THE SORT BY VALUE
	public sortBy(value: any) 
	{
		this.sortby = value;
		this.getFiles();
	}

	// FUNCTION TO FORMAT DATE
	private formatDate(date: Date | null): string | null {
		return date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` : null;
	}

	// FUNCTION TO SET ORDER
	public setOrder(value: string, data: string)
	{
		this.order = value;
		this.sortby = data;
		this.getFiles();
	}

	// FUNCTION TO RESET THE INITIAL VALUES
	public onClear()
	{
		this.selectedSubmissionStatus = this.submissionStatus[0];
		this.selectedTsStatus = this.tsStatus[0];
		this.selectedTime = this.timeList[0];
		this.searchQuery= '';
		this.getFiles();
	}

	// FUNCTION TO CALL API FOR UPDATED TIME VALUE RESPONSE
	public timeChange(value: string)
	{
		console.log(value, 'Time Change', this.selectedTime)
	}

	// FUNCTION TO CALL API FOR UPDATED SUBMISSION STATUS VALUE RESPONSE
	public submissionStatusChange(value: string)
	{
		console.log(value, 'Submission Status Change')
	}

	// FUNCTION TO CALL API FOR UPDATED TS STATUS VALUE RESPONSE
	public tsStatusChange(value: string)
	{
		console.log(value, 'TS Status Change')
	}

	public setViewMode(value: string)
	{
		this.viewMode = value;
	}

	public onSwitchChange(event: any)
	{
		console.log(event, "Switch Change")
	}

}
