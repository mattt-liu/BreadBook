import { Injectable } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { Income } from './income';
import { Expense } from './expense';
import { templateJitUrl } from '@angular/compiler';
import { number } from 'joi';


import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardDisplayService {

  url = "localhost:3000/api";


  // temp data
  private testData: Income[];
  private incomeData: Income[] = [
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
  
  private expensesData: Expense[] = [
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

  constructor(private http: HttpClient) { }

  // expenses
  getHttpExpenses() {
    
  }

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
  updateIncome(data: Income[]) {
    for (let i = 0; i < data.length; i ++) {
      let t = data[i].info.type.toLowerCase();

      // skip it if 't' is in the existing format
      if (this.types.find(e => e === t))
        continue

      // format
      switch(t) {
        case "yearly":
          data[i].info.type = "year"
          break
        case "monthly":
          data[i].info.type = "month"
          break
        case "weekly":
          data[i].info.type = "week"
          break
        case "daily":
          data[i].info.type = "day"
          break
        default:
          data[i].info.type = "other";
      }
    }

    this.incomeData.concat(data);
  }

  updateExpenses(data: Expense[]) {

    for (let i = 0; i < data.length; i ++) {
      let t = data[i].info.type.toLowerCase();

      // skip it if 't' is in the existing format
      if (this.types.find(e => e === t))
        continue

      // format
      switch(t) {
        case "yearly":
          data[i].info.type = "year"
          break
        case "monthly":
          data[i].info.type = "month"
          break
        case "weekly":
          data[i].info.type = "week"
          break
        case "daily":
          data[i].info.type = "day"
          break
        default:
          data[i].info.type = "other";
      }
    }

    
    this.expensesData.concat(data);
  }


  // delete
  deleteExpense(name: string) {
    
    for(let i = 0; i < this.expensesData.length; i ++){
      let exp = this.expensesData[i];
      if(exp.name === name){
        this.expensesData.splice(i, 1);
        break;
      }
    }
  }
  deleteIncome(name: string) {
    
    for(let i = 0; i < this.incomeData.length; i ++){
      let exp = this.incomeData[i];
      if(exp.name === name){
        this.incomeData.splice(i, 1);
        break;
      }
    }
  }

  // ----------------------

  getTypes() {
    return this.types;
  }
}
