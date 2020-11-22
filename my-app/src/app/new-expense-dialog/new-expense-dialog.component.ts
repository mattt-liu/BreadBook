import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from "@angular/core";
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpenseComponent  } from '../expense/expense.component';
import { Expense } from '../expense';
import { Income } from '../income';
//import { createDecipher } from 'crypto';

@Component({
  selector: 'app-new-expense-dialog',
  templateUrl: './new-expense-dialog.component.html',
  styleUrls: ['./new-expense-dialog.component.css']
})

export class NewExpenseDialogComponent implements OnInit {
  expenseCategories;  // to be set to array of expense categories (strings) passed in when dialog is called  

  // members to determine what dialog content is shown (html divs shown based on 'ngIf' for these members)
    enableCategorySection =  false; 
    enableNewExpense = false;
    enableEditExpense = false;
    isIncome = false; // whether they are creating/ editing an income (false if an expense)
    incomeOrExpense: string;

  // if dialog is opened to edit an expense, an object will be pased and we will set this member to that object to populate the inputs for editing
  expenseBeingEdited: Expense = {
    name: undefined, 
    amount: undefined, 
    info: {
      category: undefined, 
      type:  undefined,
      repeat: 0
    }
  };
  
  // Expense interface model format (not used here)
  someExpense: Expense = {
    name: "onlyfans",
    amount: 19.99,
    info: {
      type: "month",
      repeat: 0,
      category: "entertainment"
    }
  }
  
  // create category input value. Two way binded to the "create category" HTML text input
  createdCategoryName; 

  constructor(
    private dialogRef: MatDialogRef<ExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // setting member variables to corresponding data passed in to this component
      this.enableNewExpense = data.enableNewExpense;  // if we are creating an expense
      this.enableEditExpense = data.enableEditExpense;  // if we are editing an expense
      this.expenseCategories = data.expenseCategories;  // the categories (string) array passed in to list categories to choose from

    // if an expense is being edited (one is passed in) set the expene member object to the passed in object
      if(data.expenseBeingEdited){
        console.log(data.expenseBeingEdited);
        this.expenseBeingEdited = data.expenseBeingEdited; 
      }

    // set according 'incomeOrExpense' string based on whether it is an income or expense (string is used in HTML)
      if(data.isIncome){
        this.incomeOrExpense = "Income";
      }
      else{
        this.incomeOrExpense = "Expense";
      }
  }

  createExpenseCategory(){
    let category = this.createdCategoryName;

    // push the new category to the category array (which we will also pass back to the calling component to save the list)
      this.expenseCategories.push(category);
  }

  // called when user clicks 'create cagetory' to show the input and button to create a new category
  showCreateExpenseCategorySection(){
    this.enableCategorySection = true;
  }

  saveEditExpense(){

     // creating the result object to pass back
      
      let result = {
        expenseBeingEdited: this.expenseBeingEdited,
        expenseCategories:  this.expenseCategories,
      };

    // close dialog and end result data back to update 
      this.dialogRef.close(result);
  } 
  
  createExpense(){

    // create expense object to be sent back and apply properties as specified in the dialog HTML inputs
      let createdExpense = this.expenseBeingEdited;

    // creating the result object to pas back
      let result = {
        createdExpense: createdExpense,
        expenseCategories:  this.expenseCategories,
      };

    // close the dialog and pass back the created expense along with the categories list
      this.dialogRef.close(result);
  }

  ngOnInit(): void {
  }

}
