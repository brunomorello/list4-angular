import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { SelectShoppingCartModalComponent } from 'src/app/shopping-cart/modals/select-shopping-cart-modal/select-shopping-cart-modal.component';
import { ShoppingCartModalComponent } from 'src/app/shopping-cart/modals/shopping-cart-modal/shopping-cart-modal.component';
import { environment } from 'src/environments/environment';

const AUTH_SERVER_URL: string = environment.authUrl;

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
    const url: string = `${AUTH_SERVER_URL}/authorize?response_type=code&client_id=list4u-dev&scope=openid profile&redirect_uri=http://localhost:4200/authorized`;
    window.open(url, '_self');
    // this.router.navigate(['/login-oauth2', { externalUrl: url }])
    // .then(() => console.log(`redirected to login page`));
  }

  openShoppingListModal(shoppingList?: ShoppingCart): void {
    this.dialog.open(ShoppingCartModalComponent, { data: shoppingList });
  }

  openSelectShoppingListModal(): void {
    this.dialog.open(SelectShoppingCartModalComponent);
  }

}
