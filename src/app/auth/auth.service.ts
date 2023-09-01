import { Injectable } from '@angular/core';
import { Token } from './token';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const TOKEN_KEY: string = 'TOKEN_KEY';
const AUTH_CODE: string = 'AUTH_CODE';
const AUTH_SERVER_URL: string = environment.tokenhUrl;
const REDIRECT_URI: string = environment.redirectUri;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private saveSessionToken(token: Token): void {
    window.sessionStorage.removeItem(TOKEN_KEY);

    token.generated_at = new Date();
    window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  private saveAuthorizationCode(code: string): void {
    window.sessionStorage.removeItem(AUTH_CODE);

    window.sessionStorage.setItem(AUTH_CODE, code);
  }

  public isAuthenticated(): boolean {
    const token: Token | null = this.getSessionToken();
    if ((token !== null && token !== undefined) || !this.isTokenExpired(token)) {
      return true
    }
    return false;
  }

  public createToken(code: string): void {
    debugger
    this.saveAuthorizationCode(code);
    if (code) {
      const headers: HttpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

      const body: HttpParams = new HttpParams()
        .set('grant_type', 'authorization_code')
        .set('client_id', 'list4u-dev')
        .set('client_secret', 'myClientSecretValue')
        .set('code', code)
        .set('redirect_uri', `${REDIRECT_URI}/authorized`);

      this.httpClient.post<Token>(`${AUTH_SERVER_URL}/oauth2/token`, body, { headers: headers })
        .subscribe({
          next: token => this.saveSessionToken(token),
          error: (err) => {
            console.error(`error to create token!`);
            console.error(err);
          }
        });
    }
  }

  public refreshToken(): void {
    const token: Token | null = this.getSessionToken();
    if (this.isTokenExpired(token)) {
      
      const headers: HttpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

      const body: HttpParams = new HttpParams()
        .set('grant_type', 'refresh_token')
        .set('client_id', 'list4u-dev')
        .set('client_secret', 'myClientSecretValue')
        .set('refresh_token', token?.refresh_token ?? '');
      this.httpClient.post<Token>(`${AUTH_SERVER_URL}/oauth2/token`, body, { headers: headers })
        .subscribe({
          next: token => this.saveSessionToken(token),
          error: (err) => {
            console.error(`error to refresh token!`);
            console.error(err);
          }
        });
    }
  }

  public getSessionToken(): Token | null {
    const tokenStr: string | null = window.sessionStorage.getItem(TOKEN_KEY) ?? null;
    return tokenStr ? <Token> JSON.parse(tokenStr) : null;
  }

  public getAuthCode(): string | null { 
    return window.sessionStorage.getItem(AUTH_CODE);
  }

  private isTokenExpired(token: Token | null): boolean {
    const expireDate: Date = token?.generated_at ?? new Date();
    expireDate.setSeconds(token?.expires_in ?? 0);
    return new Date().getMilliseconds() > expireDate.getMilliseconds(); 
  }

}
