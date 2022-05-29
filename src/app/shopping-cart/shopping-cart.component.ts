import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ItemCart } from '../shared/models/item-cart';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { CartItemComponent } from './cart-item/cart-item.component';
import { RemoveItemComponent } from './cart-item/remove-item/remove-item.component';
import { ShoppingCartService } from './services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[];
  nonFinishedShoppingCart!: ShoppingCart

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private shoppingCartService: ShoppingCartService) {
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

  public pickUpItem(cartItem: ItemCart): void {
    const itemPos = this.nonFinishedShoppingCart.items.indexOf(cartItem)
    if (~itemPos) {
      cartItem.picked = !cartItem.picked;
      this.nonFinishedShoppingCart.items[itemPos] = cartItem;
      this.shoppingCartService.updateShoppingList(this.nonFinishedShoppingCart)
        .subscribe({
          next: (res) => console.log(res),
          error: (err) => console.error(err),
          complete: () => console.log('completed')
        });
    }    
  }

  public removeItem(cartItem: ItemCart): void {
    const data = {
      shoppingList: this.nonFinishedShoppingCart,
      item: cartItem
    };
    this.dialog.open(RemoveItemComponent, { data });
  }

  public openDialog(shoppingCart: ShoppingCart): void {
    const dialogRef = this.dialog.open(CartItemComponent, { data: shoppingCart });
  }

  public allItemsPickedUp(): boolean {
    return !this.nonFinishedShoppingCart.items.
      find((item: ItemCart) => item.picked == false);
  }
}
