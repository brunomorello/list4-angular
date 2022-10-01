import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportProductPriceTrend } from '../model/report-product-price-trend';
import { ReportTotalSpentByMonth } from '../model/report-total-spent-by-month';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient: HttpClient) { }

  API_ENDPOINT = environment.baseUrl;

  getTotalSpentByMonthOnYear(year: number): Observable<Array<ReportTotalSpentByMonth>> {
    return this.httpClient.get<Array<ReportTotalSpentByMonth>>(`${this.API_ENDPOINT}/shopping-carts/total-spent-by-year/${year}`);
  }

  getProductsPriceTrentByYear(year: number): Observable<Array<ReportProductPriceTrend>> {
    return this.httpClient.get<Array<ReportProductPriceTrend>>(`${this.API_ENDPOINT}/shopping-carts/products-trend-by-year/${year}`);
  }
}
