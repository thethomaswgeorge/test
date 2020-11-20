import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateEventComponent } from './create-event/create-event.component';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import {CreateGroupPage} from '../create-group/create-group.page';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {

    constructor(
        private router: Router,
        public modalCtrl: ModalController,
        private auth: AngularFireAuth,
        private storage: Storage,
    ) {
        this.storage.get('user')
        .then(val => console.error(val));
    }

    searchForEvent() {
        this.router.navigateByUrl('/add-groups');
    }

    async createEvent() {
        this.router.navigateByUrl('create-group');
    }
}
