import { InjectionToken, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartResolver } from './shopping-cart/shopping-cart.resolver';
import { AuthGuard } from './auth.guard';
import { AuthorizedResolver } from './authorized.resolver';
import { DummyComponent } from './components/dummy/dummy.component';

const externalLoginOAuth2 = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  {
    path: 'login-oauth2',
    resolve: {
      url: externalLoginOAuth2,
    },
    component: DummyComponent
  },
  {
    path: 'authorized',
    resolve: {
      authorized: AuthorizedResolver
    },
    component: DummyComponent
  },
  { path: 'shopping-cart', component: ShoppingCartComponent,
    resolve: {
      shoppingCart: ShoppingCartResolver
    },
    canActivate: [ AuthGuard ] 
  },
  {
    path: 'shopping-cart/:shoppingListId',
    component: ShoppingCartComponent,
    canActivate: [ AuthGuard ] 
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [ AuthGuard ] 
  }
];

@NgModule({
  providers: [
    {
      provide: externalLoginOAuth2,
      useValue: (route: ActivatedRouteSnapshot) => {
        const externalUrl: string = route.paramMap?.get('externalUrl') ?? '';
        console.log(`Routing Module for ${externalUrl}`);
        console.log(route.paramMap);
        window.open(externalUrl, '_self');
      }
    }
  ],
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
