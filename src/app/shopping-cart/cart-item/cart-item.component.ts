import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCart } from 'src/app/shared/models/item-cart';
import { Product } from 'src/app/shared/models/product';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  cartItem: ItemCart = {
    id: 0,
    product:  {
      id: 0,
      name: ""
    },
    quantity: 0,
    price: 0,
    picked: false,

  }

  constructor(private shoppingCartService: ShoppingCartService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<CartItemComponent>) {
  }
  
  ngOnInit(): void {
    this.cartItem = this.data.item ? this.data.item : this.cartItem;
  }

  saveItem(): void {
    const shoppingList = this.data.shoppingList;
    const itemCart = this.data.item;
    
    if (this.cartItem.product.id === 0) {
      this.cartItem.product.id 
      shoppingList.items.push(this.cartItem);
    }

    if (itemCart) {
      const pos = this.getCartItemPos(itemCart, shoppingList);
      if (pos >= 0) {
        shoppingList.items[pos] = itemCart;
      }
    }

    this.shoppingCartService.updateShoppingList(shoppingList)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.dialogRef.close()
        },
        error: (err) => console.error(err)
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private getCartItemPos(itemCart: ItemCart, shoppingCart: ShoppingCart): number {
    return shoppingCart.items.findIndex((value: ItemCart) => {
      value.product.id === itemCart.product.id &&
      value.product.name === itemCart.product.name &&
      value.picked === itemCart.picked &&
      value.price === itemCart.price &&
      value.quantity === itemCart.quantity &&
      value.id === itemCart.id
    });
  }

}
