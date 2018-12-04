import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';

import { AuthService } from '../login/auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('interception', request)
        const authService = this.injector.get(AuthService)

        if (authService.isLoggedIn())
        {
            const authRequest = request.clone({
                withCredentials: true,
                setHeaders:{
                    'Authorization': `Bearer ${authService.token.access_token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true',
                    'Cache-Control': 'no-cache'
                }
            })

            return next.handle(authRequest)

        } else {
            return next.handle(request)
        }
    }

}
