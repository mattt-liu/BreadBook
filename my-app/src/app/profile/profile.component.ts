import { Component, OnInit } from '@angular/core';
import { Expense } from '../expense';
import { Income } from '../income';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // temp variables to be fetch from backend later
  income: Income[];
  expenses: Expense[];

  constructor() { }

  ngOnInit(): void {
  }


}
