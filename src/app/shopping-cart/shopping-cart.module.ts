import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { SharedModule } from '../shared/shared/shared.module';
import { CartItemComponent } from './cart-item/cart-item.component';
import { RemoveItemComponent } from './cart-item/remove-item/remove-item.component';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    CartItemComponent,
    RemoveItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ShoppingCartModule { }
