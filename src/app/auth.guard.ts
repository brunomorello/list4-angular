import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      debugger
      if (this.authService.isAuthenticated()) {
        return true;
      }

      const url: string = `http://auth-server:8082/oauth2/authorize?response_type=code&client_id=list4u-dev&scope=openid profile&redirect_uri=http://localhost:4200/authorized`;
      this.router.navigate(['/login-oauth2', { externalUrl: url }])
      .then(() => console.log(`redirected to login page`));

      return false;
  }
  
}
