import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartResolver } from './shopping-cart/shopping-cart.resolver';

const routes: Routes = [
  { path: '', component: ShoppingCartComponent,
    resolve: {
      shoppingCart: ShoppingCartResolver
    } }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
