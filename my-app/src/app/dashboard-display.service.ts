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
      info: {type: "month", repeat: 1, lux: false}
    },
    {
      name: "Gym membership",
      amount: 9.99,
      info: {type: "week", repeat: 2, lux: false}
    },
    {
      name: "Netflix",
      amount: 19.99,
      info: {type: "month", repeat: 1, lux: true}
    },
    {
      name: "Groceries",
      amount: 63.89,
      info: {type: "other", repeat: 0, lux: false}
    },
    {
      name: "Taco Bell",
      amount: 57.12,
      info: {type: "other", repeat: 0, lux: true}
    },
    {
      name: "Uber",
      amount: 12.43,
      info: {type: "other", repeat: 0, lux: true}
    }
  ];

  types: string[] = ["year", "month", "week","day","other"];
  typesVal: number[] = [365, 30, 7, 1];

  constructor() { }

  // expenses
  getExpenses(): Expense[] {
    return this.expensesData;
  }

  getExpensesType(type: string): Expense[] {
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
  getIncomeType(type: string): Income[] {
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

  // income
  getIncome(): Income[] {
    return this.incomeData;
  }

  getIncomeDay(): Income[] {
    
    let out: Income[] = [];

    for (let e of this.incomeData) {

      let expenseAmount = 0;
      // find the chronological type and divide by weekly 
      let type = e.info.type
      switch(type) {
        case "year":
          expenseAmount = e.amount/365;
          break;
        case "month":
          expenseAmount = e.amount/30;
          break;
        case "week":
          expenseAmount = e.amount/7;
          break;
        default:
          expenseAmount = e.amount;
          break;
      }

      // create new Expense and push it
      let x: Income = {
        name: e.name,
        amount: expenseAmount,
        info: {
          type: "day",
          repeat: e.info.repeat
        }
      };

      // push
      out.push(x);
    }
    return out;
  }
  getIncomeWeek(): Income[] {
    let out: Income[] = [];

    for (let e of this.incomeData) {

      let expenseAmount = 0;
      // find the chronological type and divide by weekly 
      let type = e.info.type
      switch(type) {
        case "year":
          expenseAmount = e.amount/52;
          break;
        case "month":
          expenseAmount = e.amount/4;
          break;
        case "day":
          expenseAmount = e.amount*7;
          break;
        default:
          expenseAmount = e.amount;
          break;
      }

      // create new Expense and push it
      let x: Income = {
        name: e.name,
        amount: expenseAmount,
        info: {
          type: "week",
          repeat: e.info.repeat
        }
      };

      // push
      out.push(x);
    }

    return out;
  }
  getIncomeMonth(): Income[] {
    
    let out: Income[] = [];

    for (let e of this.incomeData) {

      let expenseAmount = 0;
      // find the chronological type and divide by weekly 
      let type = e.info.type
      switch(type) {
        case "year":
          expenseAmount = e.amount/12;
          break;
        case "week":
          expenseAmount = e.amount*4;
          break;
        case "day":
          expenseAmount = e.amount*30;
          break;
        default:
          expenseAmount = e.amount;
          break;
      }

      // create new Expense and push it
      let x: Income = {
        name: e.name,
        amount: expenseAmount,
        info: {
          type: "month",
          repeat: e.info.repeat
        }
      };

      // push
      out.push(x);
    }
    return out;
  }
  getIncomeYear(): Income[] {
    
    let out: Income[] = [];

    for (let e of this.incomeData) {

      let expenseAmount = 0;
      // find the chronological type and divide by weekly 
      let type = e.info.type
      switch(type) {
        case "month":
          expenseAmount = e.amount*12;
          break;
        case "week":
          expenseAmount = e.amount*52;
          break;
        case "day":
          expenseAmount = e.amount*365;
          break;
        default:
          expenseAmount = e.amount;
          break;
      }

      // create new Expense and push it
      let x: Income = {
        name: e.name,
        amount: expenseAmount,
        info: {
          type: "year",
          repeat: e.info.repeat
        }
      };

      // push
      out.push(x);
    }
    return out;
  }


  // update
  updateIncome(data: Income[]) {
    this.incomeData = data;
  }

  updateExpenses(data: Expense[]) {
    this.expensesData = data;
  }

  getTypes() {
    return this.types;
  }
}
