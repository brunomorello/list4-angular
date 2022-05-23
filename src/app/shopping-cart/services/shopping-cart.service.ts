import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { environment } from 'src/environments/environment';

const API_ENDPOINT = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private httpClient: HttpClient) { }

  getNonFinished(): Observable<ShoppingCart> {
    return this.httpClient.get<ShoppingCart>(`${API_ENDPOINT}/shoppingCart/1`);
  }

  getAll(): Observable<Array<ShoppingCart>> {
    return this.httpClient.get<Array<ShoppingCart>>(`${API_ENDPOINT}/shoppingCart`);
  }
}
