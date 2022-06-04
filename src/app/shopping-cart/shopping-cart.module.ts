import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { SharedModule } from '../shared/shared/shared.module';
import { CartItemComponent } from './cart-item/cart-item.component';
import { RemoveItemComponent } from './cart-item/remove-item/remove-item.component';
import { ShoppingCartModalComponent } from './modals/shopping-cart-modal/shopping-cart-modal.component';
import { SelectShoppingCartModalComponent } from './modals/select-shopping-cart-modal/select-shopping-cart-modal.component';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    CartItemComponent,
    RemoveItemComponent,
    ShoppingCartModalComponent,
    SelectShoppingCartModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ShoppingCartModule { }
