import { Component, Input } from '@angular/core';
import { ApiService } from 'src/core/api.service';

@Component({
	selector: 'app-structures',
	templateUrl: './structures.component.html',
	styleUrls: ['./structures.component.scss']
})
export class StructuresComponent {

	@Input() propertyId: string | null = '';
	public scopes: any = [];
	public tabs: any = [];
	public activeSubScopes: any = [];

	public width = "100%";
	public height = "70px";
	public expandedIndex = 0;
	public activeScroll = '';
	public currentDecking: string = 'images';
	public activeSubScroll: string = '';
	public structure_id: string = '';
	public questions: any = [];

	constructor(
		private apiService: ApiService,
	) { }

	public ngOnInit() {
		this.getScopes();
	}

	// FUNCTION TO CONTROL EXPAND AND COLLAPSE FUNCTIONALITY OF DROPDOWN
	public onPanelSelect(value: any) {
		if (this.activeSubScroll !== value.label) {
			this.activeSubScroll = value.label;
			this.getQuestion(value.scope_id);
		}
		else {
			this.activeSubScroll = '';
		}

	}

	// FUNCTION TO SET THE CURRENT ACTIVE SCROLL BAR COMPONENT
	public currentScroll(value: any) {
		this.activeScroll = value.scope_id;
		this.activeSubScopes = value.sub_scope;
		this.activeSubScroll = value.sub_scope[0]?.label;
		this.getQuestion(value.sub_scope[0]?.scope_id);
	}

	// FUNCTION TO SET THE CURRENT ACTIVE DECKING COMPONENT
	public activeDecking(data: string) {
		this.currentDecking = data;
	}

	public updateTabsContent(event: any) {
		this.structure_id = event.structure_id
		this.formatTabsData(event.scope)
	}

	public formatTabsData(dataset: any) {
		this.tabs = [];
		let currentArray = [];

		for (const element of dataset) {
			if (currentArray.length < 6) {
				currentArray.push(element);
			}
			else {
				this.tabs.push(currentArray);
				currentArray = [element];
			}
		}

		// Add the last array if it's not empty
		if (currentArray.length > 0) {
			this.tabs.push(currentArray);
		}
	}

	// FUNCTION TO GET THE SCOPES AND SUB-SCOPES
	public getScopes() {

		this.apiService.get(`/properties/get-scope-by-property-id/${this.propertyId}`)
			.subscribe((response) => {
				if (response.status === 'success') {
					if (response?.data) {
						this.scopes = response.data;
						this.structure_id = response.data[0].structure_id
						this.formatTabsData(this.scopes[0]?.scope)
						this.currentScroll(this.scopes[0]?.scope[0])
					}
				}
				else {
					console.error('Error fetching data:', response.error);
				}
			}, (error) => {
				console.error('API Error:', error);
			});
	}
  
	//  FUNCTION TO GET QUESTIONS ADN ANSWERS
	public getQuestion(scope_id: any) {
		this.questions = [];
		this.apiService.get(`/question_answer/admin-get-all?scope_id=${scope_id}&structure_id=${this.structure_id}`)
			.subscribe((response) => {
				if (response.status === 'success') {

					this.questions = response.data[0].questionData

					console.log(this.questions);
				}
				else {
					console.error('Error fetching data:', response.error);
				}
			}, (error) => {
				console.error('API Error:', error);
			});
	}

  /**
   * FUNCTION TO GET ANSWER FROM ACTIONS
   * @param { string } answer 
   */
	getAnswerFromAction(answer: string, data: any) 
	{
		for (let index = 0; index < data.length; index++) {
			const element = data[index]
			if (answer === element.enum_id) {
				return element.label
			}
		}
		return answer
	}

}
