import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';
import { ExpenseComponent  } from '../expense/expense.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-new-expense-dialog',
  templateUrl: './new-expense-dialog.component.html',
  styleUrls: ['./new-expense-dialog.component.css']
})
export class NewExpenseDialogComponent implements OnInit {
  expenseCategories = ["Bills", "Groceries", "Rent"];
  enableCategorySection =  false;
  enableNewExpense = false;
  enableEditExpense = false;

  expenseBeingEdited = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.enableNewExpense = data.enableNewExpense;
    this.enableEditExpense = data.enableEditExpense;
    this.expenseBeingEdited = data.expenseBeingEdited;
  }

  createExpenseCategory(){
    let category = (document.getElementById("createCategoryName") as HTMLInputElement).value; 
    this.expenseCategories.push(category);
  }

  showCreateExpenseCategorySection(){
    this.enableCategorySection = true;
  }

  editExpense(){

  }

  createExpense(){

  }

  ngOnInit(): void {
  }

}
