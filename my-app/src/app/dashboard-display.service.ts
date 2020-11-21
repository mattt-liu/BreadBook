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
      info: {type: "", repeat: 52}
    },
    {
      name: "Business",
      amount: 230.93,
      info: {type: "", repeat: 1}
    }
  ];

  constructor() { }

  // expenses
  getExpenses(): Expense[] {
    return [];
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
}
