import { Component, OnInit, Inject } from '@angular/core';
import { NgModule } from "@angular/core";
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpenseComponent  } from '../expense/expense.component';

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

  // if dialog is opened to edit an expense, an object will be pased and we will set this member to that object to populate the inputs for editing
  expenseBeingEdited = {name: undefined, value: undefined, amount: undefined, category: undefined, repeats:  undefined};
  
  // create category input value. Two way binded to the "create category" HTML text input
  createdCategoryName; 

  constructor(
    private dialogRef: MatDialogRef<ExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // setting member variables to corresponding data passed in to component
      this.enableNewExpense = data.enableNewExpense;
      this.enableEditExpense = data.enableEditExpense;
      this.expenseCategories = data.expenseCategories;

    // if an expense is being edited (one is passed in) set the expene member object to the passed in object
      if(data.expenseBeingEdited){
        console.log("data to expense selected (below)");
        this.expenseBeingEdited = data.expenseBeingEdited; 
      }
    
    console.log(data);
  }

  createExpenseCategory(){
    let category = this.createdCategoryName;
    console.log(this.expenseCategories); 
    this.expenseCategories.push(category);
  }

  showCreateExpenseCategorySection(){
    this.enableCategorySection = true;
  }

  saveEditExpense(){

     // creating the result object to pas back
     let result = {
      expenseBeingEdited: this.expenseBeingEdited,
      expenseCategories:  this.expenseCategories,
    };

    // close dialog and end result data back to update 
    this.dialogRef.close(result);
  } 
  
  createExpense(){

    // create expense object and apply properties to it as specified in the dialog HTML inputs
      let createdExpense = {name: undefined, value: undefined, repeats: undefined, category: undefined};
      createdExpense.name =  this.expenseBeingEdited.name;
      createdExpense.value = this.expenseBeingEdited.value; 
      createdExpense.repeats = this.expenseBeingEdited.repeats; 
      createdExpense.category = this.expenseBeingEdited.category; 

      //todo just do createdExpense = this.expenseBeingEdited?

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
