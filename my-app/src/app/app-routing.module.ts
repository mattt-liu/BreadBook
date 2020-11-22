import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './expense/expense.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';


    

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},

  { path: 'dashboard', component: DashboardComponent },
  { path: 'expenses-and-income', component: ExpenseComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}