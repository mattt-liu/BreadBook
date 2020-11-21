import { Injectable } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { Income } from './income';
import { Expense } from './expense';

@Injectable({
  providedIn: 'root'
})
export class DashboardDisplayService {

  // temp data
  incomeData: Income[] = [
    {
      name: "Work",
      amount: 36284.38,
      info: {type: "year", repeat: 1}
    },
    {
      name: "Business",
      amount: 230.93,
      info: {type: "week", repeat: 1}
    }
  ];
  expensesData: Expense[] = [
    {
      name: "Gym membership",
      amount: 9.99,
      info: {type: "week", repeat: 2}
    },
    {
      name: "Netflix",
      amount: 19.99,
      info: {type: "month", repeat: 1}
    }
  ];

  constructor() { }

  // expenses
  getExpenses(): Expense[] {
    return this.expensesData;
  }

  getExpensesWeekly() {
    
  }
  getExpensesMonthly() {

  }
  getExpensesYearly() {

  }

  // income
  getIncome(): Income[] {
    return this.incomeData;
  }
  getIncomeWeekly() {

  }
  getIncomeMonthly() {
    
  }
  getIncomeYearly() {
    
  }

  updateIncome(data: Income[]) {
    this.incomeData = data;
  }

  updateExpenses(data: Expense[]) {
    this.expensesData = data;
  }
}
