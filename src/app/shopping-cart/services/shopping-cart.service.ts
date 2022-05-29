import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCart } from 'src/app/shared/models/item-cart';
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

  updateShoppingList(shoppingCart: ShoppingCart): Observable<ShoppingCart> {
    return this.httpClient.put<ShoppingCart>(`${API_ENDPOINT}/shoppingCart/${shoppingCart.id}`, shoppingCart);
  }

  addCartItem(shoppingCart: ShoppingCart, item: ItemCart): Observable<ShoppingCart> {
    console.log(shoppingCart);
    shoppingCart.items.push(item);
    return this.updateShoppingList(shoppingCart);
  }
}
