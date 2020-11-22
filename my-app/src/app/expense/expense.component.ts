import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';


import { Expense } from '../expense';
import { Income } from '../income';

import { DashboardDisplayService } from '../dashboard-display.service';

// matdialog module
import { NewExpenseDialogComponent } from '../new-expense-dialog/new-expense-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})

export class ExpenseComponent implements OnInit {
  incomes: Income[] = []; // todo GET income on init
  expenses: Expense[] = [];
  balance;
  showDeletePrompt = false;

  incomeDetails = [];
  expenseDetails = ["name", "amount", "repeats", "category"];
  expenseCategories;

  // returned objects from dialog component after the user edits or creates an expense
  changedExpenseResult;
  savedExpenseResult;

  constructor(
    private dialog: MatDialog,
    private dashService: DashboardDisplayService
    ) { 
    this.balance = 100.0;
    this.expenseCategories = ["Bills", "Groceries", "Shopping", "Entertainment", "Dining Out"];
  }

  ngOnInit(): void {
    this.expenses = this.dashService.getExpenses();
    this.incomes = this.dashService.getIncome();
  }

  newExpense(income: boolean){
    var isIncome = income;

    let dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    // dialog properties; passed through open() method when dialog is opened
      dialogConfig = {
        //id: 1,
        //title: 'Angular For Beginners',
        disableClose: false,
        autoFocus: true,
        //height: "500px",
        width: "700px"
      };

    // dialog options. Data passed in so dialog will be formatted properly
      dialogConfig.data = {
        enableNewExpense: true,
        enableEditExpense: false,
        expenseCategories: this.expenseCategories,
        isIncome: isIncome, // telling dialog whether its an income or expense so it can be formatted accordingly
      }

    // opening the dialog and passing in the dialog options
    let dialogRef = this.dialog.open(NewExpenseDialogComponent, dialogConfig);

    // callback for data recieved from dialog after closing. It will pass the created expense object and the (potentially edited) categories list
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.expenseCategories = result.expenseCategories;

      // calling method to create the new income or expense (based on passed in parameter to this method)
      this.addExpenseOrIncome(result, isIncome);
    });
  }

  addExpenseOrIncome(result: any, isIncome){

    // if the expense being added isn't income
      if(!isIncome){
        this.expenses.push(result.createdExpense);
      }
    
    // if the expense being added is income
      else{
        this.incomes.push(result.createdExpense);
      }
  }

  editExpense(expenseName: string){
    let expense;
    let dialogConfig = new MatDialogConfig();

    // find expense in expense array with matching name 
      for(let exp of this.expenses){
        if(exp.name == expenseName){
          expense = exp;
        }
      }

    dialogConfig.autoFocus = true;

    // dialog properties; passed through open() method when dialog is opened
    dialogConfig = {
      //id: 1,
      //title: 'Angular For Beginners',
      disableClose: false,
      autoFocus: true,
      // height:
      width: '330px',
    };

    dialogConfig.data = {
      enableNewExpense: false,
      enableEditExpense: true,
      expenseBeingEdited: expense,
      expenseCategories: this.expenseCategories,
    } // data (property) passed along with dialogConfig

    // opening the dialog and passing in the dialog options
    const dialogRef = this.dialog.open(NewExpenseDialogComponent, dialogConfig);

    // callback for data recieved from dialog after closing. It will pass the edited expense object and the (potentially edited) categories list
      
      dialogRef.afterClosed().subscribe(result => {
        this.changedExpenseResult = result.expenseBeingEdited;
        this.expenseCategories = result.expenseCategories;
        this.saveEditExpense(result, expense.name);
        console.log(result);
      });
  }

  saveEditExpense(result: any, expenseName: string){
    let editedExpense = result.expenseBeingEdited;
    this.expenseCategories = result.expenseCategories;

    for(let expense of this.expenses){
      if(expense.name == expenseName){
        expense.name = editedExpense.name;
        expense.amount = editedExpense.amount;
        expense.info.category = editedExpense.info.category;
        expense.info.type = editedExpense.info.type;
        expense.info.repeat = editedExpense.info.repeat
      }
    }
  }

  promptDeleteExpense(){
    this.showDeletePrompt = true;

    // todo impliment setTimeout functionality so that delete prompt disappears after certain time?
    //setTimeout(10000);
    //this.showDeletePrompt = false;
  }

  deleteExpense(expense: string){
    this.showDeletePrompt = false;
    for(let exp of this.expenses){
      if(exp.name == expense){

        // remove expense and shift array
        const index = this.expenses.indexOf(exp, 0);
            if (index > -1) {
              this.expenses.splice(index, 1);
            }
      }
    }
  }

}
