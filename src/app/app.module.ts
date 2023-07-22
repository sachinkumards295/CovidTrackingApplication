import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HttpClient} from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CovidServiceService } from './covid-service.service';
import { CovidChartComponent } from './covid-chart/covid-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CovidChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CovidServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
