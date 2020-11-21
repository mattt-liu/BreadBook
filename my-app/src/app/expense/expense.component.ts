import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  income = {}; // todo GET income on init
  expenses = {};  // todo GET expenses on init
  columnHeaders = ["Name", "Amount "]

  constructor() { 
  }

  ngOnInit(): void {
  }

  newExpense(){

  }

  newIncome(){

  }

}
