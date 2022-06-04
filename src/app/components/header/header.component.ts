import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { SelectShoppingCartModalComponent } from 'src/app/shopping-cart/modals/select-shopping-cart-modal/select-shopping-cart-modal.component';
import { ShoppingCartModalComponent } from 'src/app/shopping-cart/modals/shopping-cart-modal/shopping-cart-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openShoppingListModal(shoppingList?: ShoppingCart): void {
    this.dialog.open(ShoppingCartModalComponent, { data: shoppingList });
  }

  openSelectShoppingListModal(): void {
    this.dialog.open(SelectShoppingCartModalComponent);
  }

}
