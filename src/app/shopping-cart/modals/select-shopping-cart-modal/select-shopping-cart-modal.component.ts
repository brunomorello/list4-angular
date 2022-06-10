import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-select-shopping-cart-modal',
  templateUrl: './select-shopping-cart-modal.component.html',
  styleUrls: ['./select-shopping-cart-modal.component.css']
})
export class SelectShoppingCartModalComponent implements OnInit {

  listShoppingCart: Array<ShoppingCart> = [];

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router,
              private dialogRef: MatDialogRef<SelectShoppingCartModalComponent>) { }

  ngOnInit(): void {
    this.shoppingCartService.getAll()
      .subscribe({
        next: (value: Array<ShoppingCart>) => this.listShoppingCart = value,
        error: (err) => console.error(err),
        complete: () => console.log('completed')
      });
  }

  openList(shoppingCart: ShoppingCart): void {
    this.router.navigate([`./${shoppingCart.id}`])
      .then((res: boolean) => this.dialogRef.close());
  }

}
