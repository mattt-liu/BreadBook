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
      info: {type: "yearly", repeat: 1, category: "Primary"}
    },
    {
      name: "Business",
      amount: 230.93,
      info: {type: "weekly", repeat: 1, category: "Secondary"}
    },
    {
      name: "Investing",
      amount: 725.54,
      info: {type: "monthly", repeat: 1, category: "Other"}
    },
    {
      name: "Yard sale",
      amount: 100.00,
      info: { type: "other", repeat: 0, category: "Other" }
    }
  ];
  private expensesData: Expense[] = [
    {
      name: "Utilities",
      amount: 133.56,
      info: {type: "monthly", repeat: 1, category: "Bills"}
    },
    {
      name: "Fit-4-Less",
      amount: 9.99,
      info: {type: "weekly", repeat: 2, category: "Entertainment"}
    },
    {
      name: "Netflix",
      amount: 19.99,
      info: {type: "monthly", repeat: 1, category: "Entertainment"}
    },
    {
      name: "Metro",
      amount: 63.89,
      info: {type: "other", repeat: 0, category: "Groceries"}
    },
    {
      name: "Taco Bell",
      amount: 57.12,
      info: {type: "other", repeat: 0, category: "Dining Out"}
    },
    {
      name: "Uber",
      amount: 12.43,
      info: {type: "other", repeat: 0, category: "Transportation"}
    },
    {
      name: "Vacation",
      amount: 1100.00,
      info: {type: "yearly", repeat: 1, category: "Entertainment"}
    }
  ];


  types: string[] = ["yearly", "monthly", "weekly","daily","other"];
  typesVal: number[] = [365, 30, 7, 1, 0];
  incomeCategories = ["Primary","Secondary","Other"];
  expenseCategories = ["Bills", "Groceries", "Shopping", "Entertainment", "Dining Out"];

  constructor(private http: HttpClient) { }
  
  //categories
  getExpenseCategories(): string[] {
    return this.expenseCategories;
  }
  getIncomeCategories(): string[] {
    return this.incomeCategories;
  }
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
      if (type.toLowerCase() === this.types[i]) {
        index = i;
        break;
      }
    }

    // only add the expenses that are preceding of the repeat type
    // ie: month --> year, but year -/-> day; (year does not precede day)
    let out: Expense[] = [];

    for (let e of this.expensesData) {
      // get index of every expense 'e.info.type';
      let temp = this.types.length-1;
      for (let i = 0; i < this.types.length; i ++) {
        // check if it precedes the selected type
        if (e.info.type.toLowerCase() === this.types[i]) {
          temp = i;
          break;
        }
      }

      // if the current expense >= selected expnse type add to output
      if (temp >= index) {
        // converted values
        let converted = this.getSumType(e,this.types[index]);
        let newE: Expense = {
          name: e.name,
          amount: converted.amount,
          info: e.info
        };

        out.push(newE);
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
      if (type.toLowerCase() === this.types[i].toLowerCase()) {
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
        if (e.info.type.toLowerCase() === this.types[i].toLowerCase()) {
          temp = i;
          break;
        }
      }

      if (temp >= index) {
        // converted values
        let converted = this.getSumType(e,this.types[index]);
        let newE: Expense = {
          name: e.name,
          amount: converted.amount,
          info: e.info
        };

        out.push(newE);
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

  getSumType(e: Expense, type: string): Expense {

    if (e.info.type === "other")
      return e;

    if (e.info.repeat <= 0)
      return e;

    // convert the sum to the chronological type
    let sum = 0;

    // convert from this type
    let i = this.types.indexOf(e.info.type, 0);
    // to this tyjpe
    let j = this.types.indexOf(type, 0);

    sum = e.amount * ((this.typesVal[j]/e.info.repeat)/this.typesVal[i]);
    sum = Math.round(sum * 100) / 100

    return {
      name: e.name,
      amount: sum
    }
  }

  // ----------------------


  getTypes() {
    return this.types;
  }
}
