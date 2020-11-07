import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateEventComponent } from './create-event/create-event.component';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {

    constructor(
        private router: Router,
        public modalCtrl: ModalController,
    ) {
    }

    searchForEvent() {
        this.router.navigateByUrl('/add-groups');
    }

    async createEvent() {
        const modal = await this.modalCtrl.create({
            component: CreateEventComponent,
        });

        return await modal.present();

        const {data} = await modal.onWillDismiss();
        console.log('Returned Data', data);
    }
}
