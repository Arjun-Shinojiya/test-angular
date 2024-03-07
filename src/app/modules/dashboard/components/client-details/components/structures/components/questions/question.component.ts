import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  @Input() questionType: string = '';
  @Input() actions: any = [];
  @Input() currentAnswer: any = '';

  // public selectedAnswer: string = '';
  public numbers: any = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public current: any = null;
  public actionSectionEnabled: boolean = false;

  /**
   * FUNCTION TO CONTROL INPUT FIELD BASED ON CURRENT VALUE
   */
  toggleActionSection(): void 
  {
    if (this.current >= 10) 
    {
      this.current = 10;
      this.actionSectionEnabled = true;
    } 
    else 
    {
      this.actionSectionEnabled = false;
    }
  }

  /**
   * FUNCTION TO HANDEL INPUT MATHEMATICAL OPERATION
   * @param { string } operator 
   */
  performOperation(operator: string): void 
  {
    if (this.actionSectionEnabled) 
    {
      if (operator === '+') 
      {
        this.current += 1;
      } 
      else if (operator === '-') 
      {
        this.current -= 1;
        if (this.current < 10) 
        {
          this.actionSectionEnabled = false;
        }
      }
    }
  }
}

