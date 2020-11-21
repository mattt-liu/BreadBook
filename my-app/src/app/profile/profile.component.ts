import { Component, OnInit, Input } from '@angular/core';

import { DashboardDisplayService } from '../dashboard-display.service';

//import { report } from 'process';
import { Expense } from '../expense';
import { Income } from '../income';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {


  // ---------------
  @Input() incomes: Income[];
  @Input() expenses: Expense[];

  openIncomes: boolean = false;
  openExpenses: boolean = false;

  types: string[] = ["year", "month", "week","day"];

  constructor(
    private dashService: DashboardDisplayService
    ) { }

  ngOnInit(): void {
    this.getExpenses();
    this.getIncome();
  }

  getIncome() {
    this.incomes =  this.dashService.getIncome();
  }

  getExpenses() {
    this.expenses = this.dashService.getExpenses();
  }

  showIncomes() {
    this.openIncomes = !this.openIncomes;
  }
  showExpenses() {
    this.openExpenses = !this.openExpenses;
  }

  saveExpenses() {
    console.log(this.expenses);

    this.dashService.updateExpenses(this.expenses);
  }
  saveIncome() {
    console.log(this.incomes);

    this.dashService.updateIncome(this.incomes);
  }
}
