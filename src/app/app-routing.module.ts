import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartResolver } from './shopping-cart/shopping-cart.resolver';

const routes: Routes = [
  { path: 'shopping-cart', component: ShoppingCartComponent,
    resolve: {
      shoppingCart: ShoppingCartResolver
    } 
  },
  {
    path: 'shopping-cart/:shoppingListId',
    component: ShoppingCartComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
