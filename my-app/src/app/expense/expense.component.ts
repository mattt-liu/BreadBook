import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

// matdialog module
import { NewExpenseDialogComponent } from '../new-expense-dialog/new-expense-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  income = []; // todo GET income on init
  expenses = [// todo GET expenses on init
    { 
      name: "pHubPremium",
      amount: 10,
      repeats: "monthly",
      category: "subscription"      
    }
  ];  
  balance;
  showDeletePrompt = false;

  incomeDetails = [];
  expenseDetails = ["name", "amount", "repeats", "category"];
  expenseCategories;

  // returned objects from dialog component after the user edits or creates an expense
  changedExpenseResult;
  savedExpenseResult;
  //categories; // categories array if user creates new categories

  constructor(private dialog: MatDialog) { 
    this.balance = 100.0;
    this.expenseCategories = ["category1"];
  }

  ngOnInit(): void {
  }

  newExpense(){
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    // dialog properties; passed through open() method when dialog is opened
      dialogConfig.data = {
        id: 1,
        title: 'Angular For Beginners',
        disableClose: false,
        autoFocus: true,
        // height:
        width: 5
      };

    // dialog options. Data passed in so dialog will be formatted properly
      dialogConfig.data = {
        enableNewExpense: true,
        enableEditExpense: false,
        expenseCategories: this.expenseCategories,
      }

    // opening the dialog and passing in the dialog options
    let dialogRef = this.dialog.open(NewExpenseDialogComponent, dialogConfig);

    // callback for data recieved from dialog after closing. It will pass the created expense object and the (potentially edited) categories list
    dialogRef.afterClosed().subscribe(result => {
      this.expenseCategories = result.expenseCategories;
      this.expenses.push(result.createdExpense);
    });
  }

  newIncome(){

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
        expense.category = editedExpense.category;
        expense.repeats = editedExpense.repeats;
      }
    }
  }

  promptDeleteExpense(){
    this.showDeletePrompt = true;
  }

  deleteExpense(expense: string){
    for(let exp of this.expenses){
      if(exp.name == expense){

        // remove expense and shift array
        const index = this.expenses.indexOf(exp, 0);
            if (index > -1) {
              this.expenses.splice(index, 1);
            }
      }
      console.log(this.expenses);
    }
  }

}
