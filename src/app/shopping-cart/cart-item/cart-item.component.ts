import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCart } from 'src/app/shared/models/item-cart';
import { Product } from 'src/app/shared/models/product';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartItemDialogDto } from './model/cart-item-dialog-dto';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  cartItemDTO: CartItemDialogDto = {
    shoppingList: {
      id: 0,
      name: "",
      items: [],
      country: "",
      createdAt: new Date,
      finished: false
    },
    item: {
      id: 0,
      product: {
        id: 0,
        name: ""
      },
      quantity: 0,
      price: 0,
      picked: false,
      supermarketName: ""
    },
    action: "ADD",
    checkoutItem: false
  }

  constructor(private shoppingCartService: ShoppingCartService,
      @Inject(MAT_DIALOG_DATA) public data: CartItemDialogDto,
      public dialogRef: MatDialogRef<CartItemComponent>) {
  }
  
  ngOnInit(): void {
    if (this.data.action === 'EDIT') {
      this.cartItemDTO = this.data;
    }
    if (this.data.action === 'ADD') {
      this.cartItemDTO.shoppingList = this.data.shoppingList;
    }
  }

  saveItem(): void {
    const shoppingList = this.data.shoppingList;
    const itemCart = this.data.item;
    console.log(this.data);
    
    if (this.data.action === 'ADD') {
      shoppingList.items.push(this.cartItemDTO.item);
    }
    
    if (this.data.action === 'EDIT' && itemCart) {
      const pos = this.getCartItemPos(itemCart, shoppingList);
      if (pos >= 0) {
        shoppingList.items[pos] = itemCart;
      }
    }
  
    this.shoppingCartService.updateShoppingList(shoppingList)
      .subscribe({
        next: (res: ShoppingCart) => {
          console.log(`updateShoppingList`);
          console.log(res);
          this.closeDialog();
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
      value.id === itemCart.id &&
      value.supermarketName === itemCart.supermarketName
    });
  }

}
