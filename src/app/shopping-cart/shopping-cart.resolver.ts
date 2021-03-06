import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PageableShoppintCart } from '../shared/models/pageable-shopping-cart';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { ShoppingCartService } from './services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartResolver implements Resolve<PageableShoppintCart> {

  constructor(private shoppingCartService: ShoppingCartService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageableShoppintCart> {
    return this.shoppingCartService.getNonFinished();
  }
}
