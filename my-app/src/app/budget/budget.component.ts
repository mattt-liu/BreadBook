import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
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
  mode = "daily";

  
  outputBudget = 0;
  outputIncome = 0;
  outputExpense = 0;
  output = 0;
  
  constructor(private dashService: DashboardDisplayService) { }

  changeMode(mode: string) {
    this.mode = mode;

    this.calculateBudget(mode);
  }

  /*
  calculateBudget(type: string) {

    // get expenses and income
    let expenses: Expense[] = this.dashService.getExpensesType(type.toLowerCase());
    let income: Expense[] = this.dashService.getIncomeType(type.toLowerCase());

    let types = this.dashService.getTypes();

    // get expenses 
    let sumOther = 0;
    let sumDaily = 0;
    let sumWeekly = 0;
    let sumMonthly = 0;
    let sumYearly = 0;
    
    for (let e of expenses) {
      let r = e.info.repeat;
      let t = e.info.type;
      switch(t) {
        case 'yearly':
          sumYearly += this.dashService.getSumType(e, e.amount/r;
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
    let sumExpenses = [sumOther, sumDaily, sumWeekly, sumMonthly, sumYearly];
    
    // get income
    sumOther = 0;
    sumDaily = 0;
    sumWeekly = 0;
    sumMonthly = 0;
    sumYearly = 0;
    for (let e of income) {
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
    
    let sumIncome = [sumOther, sumDaily, sumWeekly, sumMonthly, sumYearly];

    // get index of the type
    let index = types.indexOf(type.toLowerCase(), 0);

    // return budget
    this.outputIncome = 0;
    this.outputExpense = 0;
    this.output = 0;
    if (index > -1) {
      for (let i = 0; i <= index; i ++) {
        this.outputIncome += sumIncome[i];
        this.outputExpense += sumExpenses[i];
      }
    }
    this.output = this.outputIncome - this.outputExpense;

    this.budget = this.budgets[this.dashService.types.indexOf(type, 0)];
  }*/

  calculateBudget(mode) {
    this.outputBudget = 0;
    this.outputIncome = 0;
    this.outputExpense = 0;

    let income: Income[] = this.dashService.getIncomeType(mode);
    let expenses: Expense[] = this.dashService.getExpensesType(mode);

    // loop thru and get totals
    for (let i = 0; i < income.length; i ++) {
      this.outputIncome += income[i].amount;
    }
    for (let i = 0; i < expenses.length; i ++) {
      this.outputExpense += expenses[i].amount;
    }
    this.outputBudget = this.outputIncome - this.outputExpense;

    // rounding
    this.outputIncome = Math.round(this.outputIncome * 100) / 100
    this.outputExpense = Math.round(this.outputExpense * 100) / 100
    this.outputBudget = Math.round(this.outputBudget * 100) / 100
  }

  ngOnInit(): void {
    this.changeMode("daily");
  }

}
