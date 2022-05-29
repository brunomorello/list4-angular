import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCart } from 'src/app/shared/models/item-cart';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-remove-item',
  templateUrl: './remove-item.component.html',
  styleUrls: ['./remove-item.component.css']
})
export class RemoveItemComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RemoveItemComponent>) { }

  ngOnInit(): void {
  }

  removeItem(): void {
    const shoppingList: ShoppingCart = this.data.shoppingList;
    const cartItem: ItemCart = this.data.item;

    const itemPos = shoppingList.items.indexOf(cartItem);
    shoppingList.items.splice(itemPos, 1);

    this.shoppingCartService.updateShoppingList(shoppingList)
      .subscribe({
        next: (res) => this.dialogRef.close(),
        error: (err) => console.error(err)
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
