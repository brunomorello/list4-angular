import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-modal',
  templateUrl: './shopping-cart-modal.component.html',
  styleUrls: ['./shopping-cart-modal.component.css']
})
export class ShoppingCartModalComponent implements OnInit {

  shoppingList: ShoppingCart = {
    id: 0,
    name: "",
    items: [],
    createdAt: new Date(),
    country: "",
    finished: false
  }

  constructor(private shoppingCartService: ShoppingCartService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ShoppingCartModalComponent>) { }

  ngOnInit(): void {
    this.shoppingCartService = this.data ? this.data : this.shoppingCartService;
  }

  saveList(): void {
    this.shoppingCartService.createShoppingList(this.shoppingList)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.dialogRef.close();
        },
        error: (err) => console.error(err),
        complete: () => console.log('completed')
      });
  }

}
