import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { DashboardDisplayService } from '../dashboard-display.service'

import { Income } from '../income';
import { Expense } from '../expense';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Chart, ChartType, ChartOptions,  } from 'chart.js';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
  })
  export class DashboardComponent implements OnInit {

    private income: Income[];
    private expenses: Expense[];

    showIncomeView: boolean = false;
    showExpensesView: boolean = true;

    //chart drawing
    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            position: 'top',
        },
        plugins: {
            datalabels: {
                formatter:(value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return label;
                },
            },
        },
    };
    public pieChartLabels: Label [] = [];
    public pieChartData: number [] = [];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    //public pieChartRadius: 10000;
    public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [
    {
        backgroundColor: ['rgba(0,255,0,0.3)','rgba(0,0,255,0.3)','rgba(255,0,0,0.3)']
    },
    ];

    // test chart
    chart2 = new Chart('hat', {
        type: 'line',
          data: {
            labels: this.pieChartLabels,
            datasets: [
              { 
                data: this.pieChartData,
                borderColor: "#3cba9f",
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
    });

    
    constructor(
        private dashboardService: DashboardDisplayService
    ) { }
  
    ngOnInit(): void {
        //this.showIncome("day");
        //this.showExpenses("day");
        this.update();
        this.showExpenses("day");
    }
  
    //getting the layout for the income and expense**
    update() {
        this.income = this.dashboardService.getIncome();
        this.expenses = this.dashboardService.getExpenses();
    }
    

    //inputting the data for the two charts in which we want to inplement (Income and Expenses)
    showIncome(type: string) {
        this.update();

        this.pieChartLabels = [];
        this.pieChartData = [];

        //push values of name and amount graph
        for(let e of this.dashboardService.getIncomeType(type)) {

            this.pieChartLabels.push(e.name); 
            this.pieChartData.push(e.amount);
            
        }
    }

    showExpenses(type: string) {
        this.update();

        this.pieChartLabels = [];
        this.pieChartData = [];

        //push values of name and amount graph
        for(let e of this.dashboardService.getExpensesType(type)) {

            this.pieChartLabels.push(e.name); 
            this.pieChartData.push(e.amount);
            
        }
    }
    clickIncomeView() {
        this.showExpensesView = false;
        this.showIncomeView = true;
        
        this.showIncome("day");
    }

    clickExpensesView() {
        this.showExpensesView = true;
        this.showIncomeView = false;

        this.showExpenses("day");
    }

}