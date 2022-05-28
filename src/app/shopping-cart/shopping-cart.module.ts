import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { SharedModule } from '../shared/shared/shared.module';
import { CartItemComponent } from './cart-item/cart-item.component';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ShoppingCartModule { }
