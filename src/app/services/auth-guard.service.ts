import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth) {
    }

    isLoggedIn() {
        return this.afAuth.authState.pipe(first()).toPromise();
    }

    async canActivate(route: ActivatedRouteSnapshot) {


        const user = await this.isLoggedIn();

        const authInfo = {
            authenticated: false,
        };

        if (user) {
            authInfo.authenticated = true;
        }

        if (!authInfo.authenticated) {
            this.router.navigate(['login']);
            return false;
        }

        return true;
    }
}
