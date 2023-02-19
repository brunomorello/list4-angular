import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ItemCart } from '../shared/models/item-cart';
import { PageableShoppintCart } from '../shared/models/pageable-shopping-cart';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartItemDialogDto } from './cart-item/model/cart-item-dialog-dto';
import { RemoveItemComponent } from './cart-item/remove-item/remove-item.component';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[];
  listShoppingCart: Array<ShoppingCart> = [];
  showPending: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private shoppingCartService: ShoppingCartService,
              private productService: ProductService,) {
    this.displayedColumns = [
      'checkbox', 'product', 'quantity', 'price', 'picked', 'actions'
    ];
    this.showPending = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['shoppingListId']) {
        this.shoppingCartService.getById(param['shoppingListId'])
          .subscribe({
            next: (value: ShoppingCart) => {
              this.listShoppingCart = [value];
            },
            error: (err) => console.error(err)
          });
      } else {
        let resolverResp = <PageableShoppintCart> this.activatedRoute.snapshot.data['shoppingCart'];
        this.listShoppingCart = resolverResp.content;
      }
    });
    console.log(this.listShoppingCart);
  }

  public pickUpItem(cartItem: ItemCart, shoppingCart: ShoppingCart): void {
    const itemPos = shoppingCart.items.indexOf(cartItem)
    if (~itemPos) {
      cartItem.picked = !cartItem.picked;
      shoppingCart.items[itemPos] = cartItem;
      const data: CartItemDialogDto = {
        shoppingList: shoppingCart,
        item: cartItem,
        action: 'EDIT',
        checkoutItem: true
      };

      const dialogRef = this.dialog.open(CartItemComponent, { data });

      dialogRef.afterClosed().subscribe((resp: CartItemDialogDto) => {
        if (resp) {
          console.log(`item checked out`);
          console.log(resp);

          this.shoppingCartService.updateShoppingList(resp.shoppingList)
            .subscribe({
              next: (val: ShoppingCart) => console.log(`updated`),
              error: (err) => console.error(err)
            });
        } else {
          // Modal closed without action
          console.log(`Modal closed without action - undo check`);
          console.log(data.checkoutItem);
          // Undo check
          cartItem.picked = !cartItem.picked;
          shoppingCart.items[itemPos] = cartItem;
        } 
      });
    }    
  }

  public removeItem(cartItem: ItemCart, shoppingCart: ShoppingCart): void {
    const data: CartItemDialogDto = {
      shoppingList: shoppingCart,
      item: cartItem,
      action: 'REMOVE',
      checkoutItem: false
    }
    this.dialog.open(RemoveItemComponent, { data });
  }

  public addItem(shoppingCart: ShoppingCart): void {

    this.productService.getAll()
    .subscribe({
      next: (res: any) => {
        console.log(res);
        const data: any = {
          shoppingList: shoppingCart,
          item: null,
          action: 'ADD',
          checkoutItem: false,
          productsList: res
        };
        this.dialog.open(CartItemComponent, { data });
      },
      error: (err) => console.error(err)
    });

  }

  public editItem(cartItem: ItemCart, shoppingCart: ShoppingCart): void {
    const data: CartItemDialogDto = {
      shoppingList: shoppingCart,
      item: cartItem,
      action: 'EDIT',
      checkoutItem: false
    };
    this.dialog.open(CartItemComponent, { data });
  }

  public allItemsPickedUp(shoppingCart: ShoppingCart): boolean {
    return !shoppingCart.items.
      find((item: ItemCart) => item.picked === false);
  }

  public finishShoppingList(shoppingCart: ShoppingCart): void {
    shoppingCart.finished = true;
    this.shoppingCartService.updateShoppingList(shoppingCart)
      .subscribe({
        next: (value: ShoppingCart) => alert(`List ${value.name} finished`),
        error: (err) => console.error(err)
      });
  }

  public showOnlyPending(shoppingCart: ShoppingCart): void {
    const pos = this.listShoppingCart.indexOf(shoppingCart);
    this.listShoppingCart[pos].items = this.listShoppingCart[pos].items
      .filter((value: ItemCart) => value.picked === false);
  }

  public refreshItem(shoppingCart: ShoppingCart): void {
    const pos = this.listShoppingCart.indexOf(shoppingCart);
    this.shoppingCartService.getById(shoppingCart.id)
      .subscribe({
        next: (value: ShoppingCart) => this.listShoppingCart[pos] = value,
        error: (err) => console.error(err)
      });
  }

  public totalPriceCart(shoppingCart: ShoppingCart): number {
    let total = 0;
    shoppingCart.items.forEach((itemCart: ItemCart) => total += (itemCart.price * itemCart.quantity))
    return total;
  }

  public isCartOpened(shoppingCart: ShoppingCart): boolean {
    return !shoppingCart.finished;
  }
}
