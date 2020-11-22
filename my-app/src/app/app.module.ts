import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule /*, MatSlideToggle*/ } from '@angular/material/slide-toggle';

import { Injectable } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// components

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ExpenseComponent } from './expense/expense.component';
import { NewExpenseDialogComponent } from './new-expense-dialog/new-expense-dialog.component';
import { BudgetComponent } from './budget/budget.component';
import { LuxurySpendingComponent } from './luxury-spending/luxury-spending.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    ExpenseComponent,
    NewExpenseDialogComponent,
    BudgetComponent,
    LuxurySpendingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    ChartsModule,
    MatSlideToggleModule,
    //MatSlideToggle,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})

export class AppModule {}