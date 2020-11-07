import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
    ) {
    }

    async logout() {
        try {
            await this.afAuth.signOut().then(_ => {
                this.router.navigate(['/login']);
            });
        } catch (err) {

        }
    }

}
