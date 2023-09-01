import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { SelectShoppingCartModalComponent } from 'src/app/shopping-cart/modals/select-shopping-cart-modal/select-shopping-cart-modal.component';
import { ShoppingCartModalComponent } from 'src/app/shopping-cart/modals/shopping-cart-modal/shopping-cart-modal.component';
import { environment } from 'src/environments/environment';

const REDIRECT_URI: string = environment.redirectUri;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
  }

  login(): void {
    const url: string = `${REDIRECT_URI}/authorize?response_type=code&client_id=list4u-dev&scope=openid profile&redirect_uri=http://localhost:4200/authorized`;
    this.router.navigate(['/login-oauth2', { externalUrl: url }])
    .then(() => console.log(`redirected to login page`));
  }

  openShoppingListModal(shoppingList?: ShoppingCart): void {
    this.dialog.open(ShoppingCartModalComponent, { data: shoppingList });
  }

  openSelectShoppingListModal(): void {
    this.dialog.open(SelectShoppingCartModalComponent);
  }

}
