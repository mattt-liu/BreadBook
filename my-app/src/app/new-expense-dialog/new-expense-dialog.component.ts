import { Component, OnInit } from '@angular/core';
import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';
import { ExpenseComponent  } from '../expense/expense.component';

@Component({
  selector: 'app-new-expense-dialog',
  templateUrl: './new-expense-dialog.component.html',
  styleUrls: ['./new-expense-dialog.component.css']
})
export class NewExpenseDialogComponent implements OnInit {
  expenseCategories = [];

  constructor() {}

  createExpenseCategory(category: string){
    this.expenseCategories.push(category);
  }
  ngOnInit(): void {
  }

}
