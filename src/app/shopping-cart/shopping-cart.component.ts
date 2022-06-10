import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ItemCart } from '../shared/models/item-cart';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartItemDialogDto } from './cart-item/model/cart-item-dialog-dto';
import { RemoveItemComponent } from './cart-item/remove-item/remove-item.component';
import { ShoppingCartService } from './services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[];
  listShoppingCart: Array<ShoppingCart> = [];

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private shoppingCartService: ShoppingCartService) {
    this.displayedColumns = [
      'product', 'quantity', 'price', 'picked'
    ];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['shoppingListId']) {
        this.shoppingCartService.getById(param['shoppingListId'])
          .subscribe({
            next: (value: ShoppingCart) => this.listShoppingCart = [value],
            error: (err) => console.error(err)
          });
      } else {
        this.listShoppingCart = this.activatedRoute.snapshot.data['shoppingCart'];
      }
    });
    console.log(this.listShoppingCart);
  }

  public pickUpItem(cartItem: ItemCart, shoppingCart: ShoppingCart): void {
    const itemPos = shoppingCart.items.indexOf(cartItem)
    if (~itemPos) {
      cartItem.picked = !cartItem.picked;
      shoppingCart.items[itemPos] = cartItem;
      this.shoppingCartService.updateShoppingList(shoppingCart)
        .subscribe({
          next: (res) => console.log(res),
          error: (err) => console.error(err),
          complete: () => console.log('completed')
        });
    }    
  }

  public removeItem(cartItem: ItemCart, shoppingCart: ShoppingCart): void {
    const data: CartItemDialogDto = {
      shoppingList: shoppingCart,
      item: cartItem
      
    }
    this.dialog.open(RemoveItemComponent, { data });
  }

  public addItem(shoppingCart: ShoppingCart): void {
    const data: CartItemDialogDto = {
      shoppingList: shoppingCart
    };
    this.dialog.open(CartItemComponent, { data });
  }

  public editItem(cartItem: ItemCart, shoppingCart: ShoppingCart): void {
    const data: CartItemDialogDto = {
      shoppingList: shoppingCart,
      item: cartItem
    };
    this.dialog.open(CartItemComponent, { data });
  }

  public allItemsPickedUp(shoppingCart: ShoppingCart): boolean {
    return !shoppingCart.items.
      find((item: ItemCart) => item.picked == false);
  }

  public finishShoppingList(shoppingCart: ShoppingCart): void {
    shoppingCart.finished = true;
    this.shoppingCartService.updateShoppingList(shoppingCart)
      .subscribe({
        next: (value: ShoppingCart) => alert(`List ${value.name} finished`),
        error: (err) => console.error(err)
      })
  }
}
