import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';

const API_ENDPOINT = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${API_ENDPOINT}/products`);
  }
  
  getById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${API_ENDPOINT}/products/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${API_ENDPOINT}/products`, product);
  }
}
