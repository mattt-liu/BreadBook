import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';

// matdialog module
import { NewExpenseDialogComponent } from '../new-expense-dialog/new-expense-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  income = {}; // todo GET income on init
  expenses = [// todo GET expenses on init
    { name: "pHubPremium",
      amount: 10,
      repeats: "monthly",
      type: "subscription"      
    }
  ];  
  showDeletePrompt = false;

  incomeDetails = [];
  expenseDetails = ["name", "amount", "repeats", "type"];
  expenseCategories = [];

  constructor(private dialog: MatDialog) { 
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

    dialogConfig.data = {
      enableNewExpense: true,
      enablEditExpense: false,
    }

    this.dialog.open(NewExpenseDialogComponent, dialogConfig);
  }

  newIncome(){

  }

  editExpense(expenseName: string){
    let expense;
    let dialogConfig = new MatDialogConfig();

    // find expense in expense array with matching name 
    for(let exp of this.expenses){
      if(exp.name == expense){
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
      enablEditExpense: true,
      expenseBeingEdited: expenseName,
    } // data (property) passed along with dialogConfig

    this.dialog.open(NewExpenseDialogComponent, dialogConfig);
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
