import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './components/header/header.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { HomeModule } from './home/home.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReportsComponent } from './reports/reports.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ReportProductPriceTrendComponent } from './reports/components/report-product-price-trend/report-product-price-trend.component';
import { ReportTotalByMonthPieChartComponent } from './reports/components/report-total-by-month-pie-chart/report-total-by-month-pie-chart.component';
import { AppHttpInterceptor } from './config/http.interceptor';
import { DummyComponent } from './components/dummy/dummy.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    ReportProductPriceTrendComponent,
    ReportTotalByMonthPieChartComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderModule,
    HomeModule,
    ShoppingCartModule,
    HttpClientModule,
    NgApexchartsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
