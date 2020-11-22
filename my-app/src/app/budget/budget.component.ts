import { Component, OnInit } from '@angular/core';

import { DashboardDisplayService } from '../dashboard-display.service';

import { Expense } from '../expense';
import { Income } from '../income';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})

export class BudgetComponent implements OnInit {
  mode = "Weekly";
  moneyToSpend;
  
  constructor(private dashService: DashboardDisplayService) { }

  changeMode(mode: string){
    this.mode = mode;

    //this.calculateBudget(mode);
  }

  calculateBudget(type: string) {

    // get expenses and income
    let expenses: Expense[] = this.dashService.getExpensesType(type.toLowerCase());
    let income: Expense[] = this.dashService.getIncomeType(type.toLowerCase());

    let types = this.dashService.getTypes();

    let sumOther = 0;
    let sumDaily = 0;
    let sumWeekly = 0;
    let sumMonthly = 0;
    let sumYearly = 0;
    
    // subtract expenses from income
    for (let e of expenses) {
      let r = e.info.repeat;
      let t = e.info.type;
      switch(t) {
        case 'yearly':
          sumYearly += e.amount/r;
          break;
        case 'monthly':
          sumMonthly += e.amount/r;
          break;
        case 'weekly':
          sumWeekly += e.amount/r;
          break;
        case 'daily':
          sumDaily += e.amount;
          break;
        default: // 'other'
          sumOther += e.amount;
          break;
      }
    }
    
    // based on type
    let sums = [sumOther, sumDaily, sumWeekly, sumMonthly, sumYearly];
    console.log(sums);
    
    // mutliply if repeating
  }


  ngOnInit(): void {
  }

}
