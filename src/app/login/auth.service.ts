import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NavigationEnd, Router } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import {AUTH_API} from '../app.api'
import {CLIENT_ID} from '../app.api'
import { Token } from './token.model';



@Injectable()
export class AuthService {
    public token: Token;
    private clientId = CLIENT_ID;
    private authApi = AUTH_API;
    private lastPath: string;
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: HttpClient,
                private router: Router) {
        this.router.events.filter(e => e instanceof NavigationEnd)
                          .subscribe((e: NavigationEnd) => {
                              this.lastPath = e.url
                              localStorage.setItem('url', this.lastPath)
                            })
    }

    login(username: string, password: string): Observable<Token> {
         // add authorization header with jwt token
        let headers = new HttpHeaders()
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded')

        let params = new HttpParams().set('client_id', this.clientId)
                                     .set('username', username)
                                     .set('password', password)
                                     .set('grant_type', 'password')

        return this.http.get<Token>(`${AUTH_API}/token`, {headers: headers, params: params})
          .do(token => {
            this.token = token
            localStorage.setItem('t', JSON.stringify(this.token));
          })
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = undefined;
        localStorage.removeItem('t');
    }

    isLoggedIn(): boolean {
      //let valid = this.token !== undefined
      this.token = JSON.parse(localStorage.getItem('t'))
      let valid = this.token !== null

      if (valid) {
        let tokenExpDate = this.jwtHelper.getTokenExpirationDate(this.token.access_token);
        //let tokenExpDate = this.jwtHelper.getTokenExpirationDate(token.access_token);
        
        let sessionExpDate = new Date(tokenExpDate.getTime() + 4*60000);
        console.log('expira em:' + tokenExpDate)
        if (new Date() > sessionExpDate) {
          valid = false
        }
      }

      return valid
    }

    handleLogin(path: string = this.lastPath) {
      this.router.navigate(['/login', btoa(path)])
    }

    getUsername(): string {
      let decode = this.jwtHelper.decodeToken(this.token.access_token)
      return decode.sub
    }

}
