import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ItemCart } from '../shared/models/item-cart';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { CartItemComponent } from './cart-item/cart-item.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[];
  nonFinishedShoppingCart!: ShoppingCart

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog) {
    this.displayedColumns = [
      'product', 'quantity', 'price', 'picked'
    ];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.nonFinishedShoppingCart = this.activatedRoute.snapshot.data['shoppingCart'];
      console.log(this.nonFinishedShoppingCart);
    });
  }

  public pickUpItem(cartItem: ItemCart) {
    console.log(cartItem);
    console.log(this.nonFinishedShoppingCart);
    
  }

  openDialog(shoppingCart: ShoppingCart) {
    const dialogRef = this.dialog.open(CartItemComponent, { data: shoppingCart });
  }

  allItemsPickedUp() {
    return !this.nonFinishedShoppingCart.items.
      find((item: ItemCart) => item.picked == false);
  }
}
