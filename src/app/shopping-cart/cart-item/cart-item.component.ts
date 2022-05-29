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
      @Inject(MAT_DIALOG_DATA) public data: ShoppingCart,
      public dialogRef: MatDialogRef<CartItemComponent>) {
  }
  
  ngOnInit(): void {
  }

  saveItem(): void {
    this.shoppingCartService.addCartItem(this.data, this.cartItem)
      .subscribe({
        next: (res) => this.dialogRef.close(),
        error: (err) => console.error(err)
      });
  }

}
