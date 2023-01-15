import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { ItemCart } from 'src/app/shared/models/item-cart';
import { Product } from 'src/app/shared/models/product';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { SupermarketService } from '../services/supermarket.service';
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

  myControl = new FormControl('');
  supermarkets: any[] = [];
  products: any[] = [];
  filteredOptions: Observable<any[]> | undefined;
  filteredProducts: Observable<any[]> | undefined;

  constructor(private shoppingCartService: ShoppingCartService,
      private supermarketService: SupermarketService,
      private productService: ProductService,
      @Inject(MAT_DIALOG_DATA) public data: CartItemDialogDto,
      public dialogRef: MatDialogRef<CartItemComponent>) {
  }
  
  ngOnInit(): void {

    this.productService.getAll()
    .subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;
      },
      error: (err) => console.error(err)
    });

    this.filteredProducts = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    if (this.data.action === 'EDIT') {
      this.cartItemDTO = this.data;

      this.supermarketService.getAll()
      .subscribe({
        next: (res: any) => {
          this.supermarkets = res.content;
        },
        error: (err) => console.error(err)
      });

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
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

  private _filter(value: string | object): string[] {
    const filterValue = value.toString().toLowerCase();

    return this.supermarkets.filter(supermarket => supermarket.name.toLowerCase().includes(filterValue));
  }

}
