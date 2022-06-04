import { HttpClient, HttpParams } from '@angular/common/http';
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

  getNonFinished(): Observable<Array<ShoppingCart>> {
    const params = new HttpParams()
      .set("finished", "false");
    return this.httpClient.get<Array<ShoppingCart>>(`${API_ENDPOINT}/shoppingCart/`, { params: params });
  }

  getAll(): Observable<Array<ShoppingCart>> {
    return this.httpClient.get<Array<ShoppingCart>>(`${API_ENDPOINT}/shoppingCart`);
  }

  getById(id: number): Observable<ShoppingCart> {
    return this.httpClient.get<ShoppingCart>(`${API_ENDPOINT}/shoppingCart/${id}`);
  }

  createShoppingList(shoppingCart: ShoppingCart): Observable<ShoppingCart> {
    return this.httpClient.post<ShoppingCart>(`${API_ENDPOINT}/shoppingCart`, shoppingCart);
  }

  updateShoppingList(shoppingCart: ShoppingCart): Observable<ShoppingCart> {
    shoppingCart.items = shoppingCart.items.map(this.setItemCartId);
    return this.httpClient.put<ShoppingCart>(`${API_ENDPOINT}/shoppingCart/${shoppingCart.id}`, shoppingCart);
  }

  // TODO - use backend to handle this
  private setItemCartId(itemCart: ItemCart): ItemCart {
    itemCart.id = itemCart.id === 0 ? Date.now() : itemCart.id;
    itemCart.product.id = itemCart.product.id === 0 ? Date.now() : itemCart.product.id;
    return itemCart;
  }

}
