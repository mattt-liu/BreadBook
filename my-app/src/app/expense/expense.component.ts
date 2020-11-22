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
  expenseBeingDeleted = "";

  incomeDetails = [];
  expenseDetails = ["Name", "Amount", "Repeats", "Category"];
  expenseCategories;
  incomeCategories;

  // returned objects from dialog component after the user edits or creates an expense
  changedExpenseResult;
  savedExpenseResult;

  constructor(
    private dialog: MatDialog,
    private dashService: DashboardDisplayService
    ) { 
    this.balance = 100.0;

    // todo get caegories
    this.expenseCategories = ["Bills", "Groceries", "Shopping", "Entertainment", "Dining Out"]; 
    this.incomeCategories = ["Work", "Tax Returns", "Money Transfers"];
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

    // assigning category object to type of categories to pass in (income or expense categories)

      let categories;

      if(isIncome){
        categories = this.incomeCategories;
      }
      else{
        categories = this.expenseCategories;
      }

    // dialog options. Data passed in so dialog will be formatted properly
      
      dialogConfig.data = {
        enableNewExpense: true,
        enableEditExpense: false,
        expenseCategories: categories,
        isIncome: isIncome, // telling dialog whether its an income or expense so it can be formatted accordingly
      }

    // opening the dialog and passing in the dialog options
      let dialogRef = this.dialog.open(NewExpenseDialogComponent, dialogConfig);

    // observable callback for data recieved from dialog after closing. It will pass the created expense object and the (potentially edited) categories list
      dialogRef.afterClosed().subscribe(result => {
      
        if(result){ // if they don't close the window (this result object property will be defined)
          // calling method to create the new income or expense (based on passed in parameter to this method)
          this.addExpenseOrIncome(result, isIncome);
        }
        else{
          console.log("Add income/expense window closed");
        }
        
        // update service
        this.dashService.updateExpenses(result);
      });
  }

  addExpenseOrIncome(result: any, isIncome){
    console.log(result);
    // if the expense being added isn't income
      if(!isIncome){
        this.expenseCategories = result.expenseCategories;
        this.expenses.push(result.createdExpense);
      }
    
    // if the expense being added is income
      else{
        this.incomeCategories = result.expenseCategories;
        this.incomes.push(result.createdExpense);
      }
  }

  // edit expense OR INCOME (if isIncome set to true)
  editExpense(expenseName: string, isIncome: boolean){
    let expense;
    let dialogConfig = new MatDialogConfig();

    if(isIncome){

        // find income in income array with matching name 

          for(let inc of this.incomes){
            if(inc.name == expenseName){
              expense = inc;
            }
          }
    }else{

      // find expense in expense array with matching name 
        for(let exp of this.expenses){
          if(exp.name == expenseName){
            expense = exp;
          }
        }
    }

    // dialog properties, passed through open() method when dialog is opened
      dialogConfig = {  // other properties: "id", "title", "height"
        disableClose: false,
        autoFocus: true,
        width: '330px',
      };

    // assigning category object to type of categories to pass in (income or expense categories)

      let categories;

      if(isIncome){
        categories = this.incomeCategories;
      }
      else{
        categories = this.expenseCategories;
      }

    // dialog properties additional data 

    console.log(expense);
      dialogConfig.data = {
        enableNewExpense: false,
        enableEditExpense: true,
        expenseBeingEdited: expense, //could also be an income object (if isIncome is true)
        expenseCategories: categories,
      } 

    // opening the dialog and passing in the dialog options
      const dialogRef = this.dialog.open(NewExpenseDialogComponent, dialogConfig);

    // callback for data recieved from dialog after closing. It will pass the edited expense object and the (potentially edited) categories list
      
      dialogRef.afterClosed().subscribe(result => {
        this.saveEditExpense(result, expense.name, isIncome);
        console.log(result);
      });
  }

  saveEditExpense(result: any, expenseName: string, isIncome: boolean){
    let editedExpense = result.expenseBeingEdited;

      if(!isIncome){
        this.expenseCategories = result.expenseCategories;
        
        // update the expense object (within the 'expenses' array)
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
    
    // if the expense being added is income
      else{
        this.incomeCategories = result.expenseCategories;
        for(let income of this.incomes){
          if(income.name == expenseName){
            income.name = editedExpense.name;
            income.amount = editedExpense.amount;
            income.info.category = editedExpense.info.category;
            income.info.type = editedExpense.info.type;
            income.info.repeat = editedExpense.info.repeat
          } 
        }
      }    
  }

  promptDeleteExpense(expenseName: string){
    this.showDeletePrompt = true;
    this.expenseBeingDeleted = expenseName;
    
    // todo impliment setTimeout functionality so that delete prompt disappears after certain time?
      //setTimeout(10000);
      //this.showDeletePrompt = false;
  }

  deleteExpense(expense: string){
    this.showDeletePrompt = false;

    // tell service to delete expense
      this.dashService.deleteExpense(expense);
      this.update();
  }

  deleteIncome(income: string){
    this.showDeletePrompt = false;

    // tell service to delete expense
      this.dashService.deleteIncome(income);
      this.update();
  }



  update() {
    this.expenses = this.dashService.getExpenses();
    this.incomes = this.dashService.getIncome();
    this.expenseCategories = this.dashService.getExpenseCategories();
    this.incomeCategories = this.dashService.getIncomeCategories();
  }

  ngOnInit(): void {
    this.update();
  }

}
