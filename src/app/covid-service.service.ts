import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CovidServiceService {

  constructor(private http:HttpClient) { }


  getStatusCode(){
    return this.http.get('assets/StateCode.json');
  }

  getCovidDataBasedOnState(){
    const url = "https://data.incovid19.org/v4/min/data.min.json"
  return this.http.get(url);
  }


}
