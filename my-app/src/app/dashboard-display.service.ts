import { Injectable } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { Income } from './income';
import { Expense } from './expense';
import { templateJitUrl } from '@angular/compiler';
import { number } from 'joi';

@Injectable({
  providedIn: 'root'
})
export class DashboardDisplayService {

  // temp data
  incomeData: Income[] = [
    {
      name: "Work",
      amount: 53284.38,
      info: {type: "year", repeat: 1}
    },
    {
      name: "Business",
      amount: 230.93,
      info: {type: "week", repeat: 1}
    },
    {
      name: "Yard sale",
      amount: 100.00,
      info: { type: "other", repeat: 0 }
    }
  ];
  
  expensesData: Expense[] = [
    {
      name: "Utilities",
      amount: 133.56,
      info: {type: "month", repeat: 1, category: ""}
    },
    {
      name: "Gym membership",
      amount: 9.99,
      info: {type: "week", repeat: 2, category: ""}
    },
    {
      name: "Netflix",
      amount: 19.99,
      info: {type: "month", repeat: 1, category: ""}
    },
    {
      name: "Groceries",
      amount: 63.89,
      info: {type: "other", repeat: 0, category: ""}
    },
    {
      name: "Taco Bell",
      amount: 57.12,
      info: {type: "other", repeat: 0, category: ""}
    },
    {
      name: "Uber",
      amount: 12.43,
      info: {type: "other", repeat: 0, category: ""}
    }
  ];

  types: string[] = ["year", "month", "week","day","other"];
  typesVal: number[] = [365, 30, 7, 1];

  constructor() { }

  // expenses
  getExpenses(): Expense[] {
    // get all expenses

    return this.expensesData;
  }

  getExpensesType(type: string): Expense[] {

    // get expenses of chrnological type

    // get the index of the repeat type
    let index = this.types.length-1;
    for (let i = 0; i < this.types.length; i ++) {
      if (type === this.types[i]) {
        index = i;
        break;
      }
    }

    // only add the expenses that are preceding of the repeat type
    // ie: month --> year, but year -/-> day; (year does not precede day)
    let out: Expense[] = [];

    for (let e of this.expensesData) {
      // get index of 'e.info.type';
      let temp = this.types.length-1;
      for (let i = 0; i < this.types.length; i ++) {
        if (e.info.type === this.types[i]) {
          temp = i;
          break;
        }
      }

      if (temp >= index) {
        out.push(e);
      }
      
    }
    return out;
  }

  // income
  getIncome(): Income[] {
    // return all income
    return this.incomeData;
  }
  getIncomeType(type: string): Income[] {
    // get income of specific chronological type

    // get the index of the repeat type
    let index = this.types.length-1;
    for (let i = 0; i < this.types.length; i ++) {
      if (type === this.types[i]) {
        index = i;
        break;
      }
    }

    // only add the expenses that are preceding of the repeat type
    // ie: month --> year, but year -/-> day; (year does not precede day)
    let out: Income[] = [];

    for (let e of this.incomeData) {
      // get index of 'e.info.type';
      let temp = this.types.length-1;
      for (let i = 0; i < this.types.length; i ++) {
        if (e.info.type === this.types[i]) {
          temp = i;
          break;
        }
      }

      if (temp >= index) {
        out.push(e);
      }
      
    }
    return out;
  }

  // update
  updateIncome(data) {
    this.incomeData.concat(data);
  }

  updateExpenses(data) {
    this.expensesData.concat(data);
  }

  

  // 

  getTypes() {
    return this.types;
  }
}
