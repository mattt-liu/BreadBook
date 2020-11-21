import { Component, OnInit, Input } from '@angular/core';

import { DashboardDisplayService } from '../dashboard-display.service';

import { report } from 'process';
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

  constructor(
    private dashService: DashboardDisplayService
    ) { }

  ngOnInit(): void {
    this.incomes =  this.dashService.getExpenses();
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
