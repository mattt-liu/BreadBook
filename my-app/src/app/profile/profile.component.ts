import { Component, OnInit, Input } from '@angular/core';

import { report } from 'process';
import { Expense } from '../expense';
import { Income } from '../income';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // temp variables to be fetch from backend later
  incomeData: Income[] = [
    {
      name: "Work",
      amount: 36284.38,
      info: {type: "", repeat: 52}
    },
    {
      name: "Business",
      amount: 230.93,
      info: {type: "", repeat: 1}
    }
  ];

  // ---------------
  @Input() incomes: Income[] = this.incomeData;
  @Input() expenses: Expense[];

  openIncomes: boolean = false;
  openExpenses: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  incomeSummary() {

  }
  showIncomes() {
    this.openIncomes = !this.openIncomes;
  }
  showExpenses() {
    this.openExpenses = !this.openExpenses;
  }
}
