import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCart } from '../shared/models/item-cart';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[];
  nonFinishedShoppingCart!: ShoppingCart

  constructor(private activatedRoute: ActivatedRoute) {
    this.displayedColumns = [
      'product', 'quantity', 'price', 'picked'
    ];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.nonFinishedShoppingCart = this.activatedRoute.snapshot.data['shoppingCart'];
      console.log(this.nonFinishedShoppingCart);
    });
  }

  public pickUpItem(cartItem: ItemCart) {
    console.log(cartItem);
  }
}
