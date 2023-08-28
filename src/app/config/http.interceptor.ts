import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { Token } from "../auth/token";
import { catchError, map } from "rxjs";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService) { } 
    
    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        debugger
        const token: Token | null = this.authService.getSessionToken(); 
        if (this.authService.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token?.access_token}`
                }
            })
        }

        return next.handle(req)
        .pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log(`httpResponseEvent --> `, event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('http interceptor error');
                console.error(error);
                throw error;
            })
        );
    }
}