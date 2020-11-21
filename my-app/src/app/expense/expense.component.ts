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
  expenses = {};  // todo GET expenses on init
  columnHeaders = ["Name", "Amount", "Repeats"];
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
      // width: 
    };

    this.dialog.open(NewExpenseDialogComponent, dialogConfig);
  }

  newIncome(){

  }

}
