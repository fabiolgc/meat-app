import { Injectable } from '@angular/core';
import { Route, CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../login/auth.service'

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

    constructor(private authService: AuthService) { }

    canLoad(route: Route) {
        return this.checkAuthentication(route.path)
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }

    checkAuthentication(path: string) {
        let loggedIn = this.authService.isLoggedIn();

        if (!loggedIn) {
            this.authService.handleLogin(`${path}`)
        }

        return loggedIn
    }
}
