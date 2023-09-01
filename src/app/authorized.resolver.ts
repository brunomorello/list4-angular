import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedResolver implements Resolve<boolean> {
  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    debugger    
    console.log(`AuthorizedResolver`);
    console.log(route);
    console.log(state);

    const code = route.queryParamMap.get('code');    
    console.log(code);

    if (code) {
      this.authService.createToken(code);
    }
    
    return of(true);
  }
}
