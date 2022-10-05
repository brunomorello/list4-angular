import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PageableShoppintCart } from 'src/app/shared/models/pageable-shopping-cart';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCartModalComponent } from '../shopping-cart-modal/shopping-cart-modal.component';

@Component({
  selector: 'app-select-shopping-cart-modal',
  templateUrl: './select-shopping-cart-modal.component.html',
  styleUrls: ['./select-shopping-cart-modal.component.css']
})
export class SelectShoppingCartModalComponent implements OnInit {

  listShoppingCart: Array<ShoppingCart> = [];

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<SelectShoppingCartModalComponent>) { }

  ngOnInit(): void {
   this.fetchShoppingLists();
  }

  fetchShoppingLists(): void {
    this.shoppingCartService.getAll()
    .subscribe({
      next: (value: PageableShoppintCart) => this.listShoppingCart = value.content,
      error: (err) => console.error(err),
      complete: () => console.log('completed')
    });
  }

  openList(shoppingCart: ShoppingCart): void {
    this.router.navigate([`./shopping-cart/${shoppingCart.id}`])
      .then((res: boolean) => this.dialogRef.close());
  }

  editList(shoppingCart: ShoppingCart): void {
    this.dialog.open(ShoppingCartModalComponent, { data: shoppingCart });
  }

  deleteList(shoppingCart: ShoppingCart): void {
    this.shoppingCartService.deleteShoppingList(shoppingCart)
      .subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.fetchShoppingLists();
        },
        error: (err) => console.error(err)
      });
  }

}
