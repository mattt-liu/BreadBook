import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewExpenseDialogComponent } from '../new-expense-dialog/new-expense-dialog.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  income = {}; // todo GET income on init
  expenses = {};  // todo GET expenses on init
  columnHeaders = ["Name", "Amount "];

  constructor(private dialog: MatDialog) { 
  }

  ngOnInit(): void {
  }

  newExpense(){
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    /* test properties */
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    this.dialog.open(NewExpenseDialogComponent, dialogConfig);
  }

  newIncome(){

  }

}
