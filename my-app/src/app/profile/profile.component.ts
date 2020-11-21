import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // temp variables to be fetch from backend later
  income: number[];
  expenses: number[];

  constructor() { }

  ngOnInit(): void {
  }

  
}
