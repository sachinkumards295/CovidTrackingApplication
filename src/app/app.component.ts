import { Component, OnInit } from '@angular/core';
import { CovidServiceService } from './covid-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CovidApplication';
  StatusCodeVariable:any;
  statusCode = {};
  countryData:any;
  countryStateData: any;
 population:any;
 
 totalDetialsCase:any;
 totalOfCasesDistrict:any;
 totalCaseArray:  any[] = [];
  objectToPush:any = {};
  constructor(private covidService: CovidServiceService){

  }
  ngOnInit(): void {
 this.covidService.getStatusCode().subscribe( (res) => {
  console.log(res);
  this.statusCode = res;
 })
  }

  getCovidData(statuscodeValue: any){
    localStorage.setItem("statusCode",statuscodeValue );
    this.totalCaseArray = [];
    this.StatusCodeVariable = statuscodeValue;
    this.covidService.getCovidDataBasedOnState().subscribe( (res) => {
      this.countryData = res;
      console.log(this.countryStateData);
      this.countryStateData = this.countryData[statuscodeValue];
      this.population = this.countryStateData['meta'].population
      this.totalDetialsCase = this.countryStateData['districts'];
      console.log(this.totalDetialsCase);
    })

for (const region in this.totalDetialsCase) {
  console.log(region);
  this.objectToPush = {
    name:region
  }
  this.totalOfCasesDistrict = this.totalDetialsCase[region];

  this.loopNextedObject(this.totalOfCasesDistrict, region);
  this.totalCaseArray.push(this.objectToPush);
}
console.log(this.totalOfCasesDistrict);
console.log(this.totalCaseArray);
  }

  loopNextedObject(totalOfCasesDistrict:any, region:any){

    for(const key in totalOfCasesDistrict){
      if(typeof totalOfCasesDistrict[key] === 'object'){
        this.loopNextedObject(totalOfCasesDistrict[key], region);
      } else {
        this.objectToPush[key] = totalOfCasesDistrict[key];
        // console.log(key, totalOfCasesDistrict[key])
      }
    }
  
  }



}
