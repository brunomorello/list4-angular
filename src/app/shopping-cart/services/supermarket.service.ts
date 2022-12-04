import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supermarket } from 'src/app/shared/models/supermarket';
import { environment } from 'src/environments/environment';

const API_ENDPOINT = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SupermarketService {

  constructor(private httpClient: HttpClient) { }

  createSupermarket(supermarket: Supermarket): Observable<Supermarket> {
    return this.httpClient.post<Supermarket>(`${API_ENDPOINT}/supermarkets`, supermarket);
  }

  getById(id: number): Observable<Supermarket> {
    return this.httpClient.get<Supermarket>(`${API_ENDPOINT}/supermarkets/${id}`);
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${API_ENDPOINT}/supermarkets`);
  }
}
