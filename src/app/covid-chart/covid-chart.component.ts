import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { CovidServiceService } from '../covid-service.service';
Chart.register(...registerables);

@Component({
  selector: 'app-covid-chart',
  templateUrl: './covid-chart.component.html',
  styleUrls: ['./covid-chart.component.css']
})
export class CovidChartComponent implements OnInit, DoCheck{

  @Input() statusCode: any;
  @Input() poPulation:any

statusCodeVariable :any
population:any;
totalCaseOfEachState:any;
totalCaseOfEachStateValue:any;
DataTotal:any;
  constructor(private covidService:CovidServiceService) { }
  ngDoCheck(): void {
    this.statusCodeVariable =   localStorage.getItem("statusCode");
  }

  ngOnInit(): void {
    console.log("gffdgfg", this.statusCode)
   this.statusCodeVariable =   localStorage.getItem("statusCode");
   this.population = this.poPulation;
    this.covidService.getCovidDataBasedOnState().subscribe( (res) => {
      console.log(res);
    this.DataTotal = res;
      this.totalCaseOfEachState = this.DataTotal[this.statusCodeVariable];
      this.poPulation = this.totalCaseOfEachState['meta'].population;
      this.totalCaseOfEachStateValue = this.totalCaseOfEachState['total'];
      console.log(this.totalCaseOfEachStateValue);
      this.RenderScatterchart(this.poPulation);
    });
  }


  RenderScatterchart(poPulation:any){
    const data = {
      datasets: [{
        label: 'Vaccination Coverage',
        data: [ {
          x: 0,
          y: poPulation
        }, {
          x: poPulation,
          y: 0
        }, {
          x: 10,
          y: 5
        }, {
          x: 0.5,
          y: 5.5
        }],
        backgroundColor: 'rgb(0,0,0)'
      }],
    };
    const myChart = new Chart('scchart', {
      type: 'scatter',
      data: data,
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }
    });
  }


}
