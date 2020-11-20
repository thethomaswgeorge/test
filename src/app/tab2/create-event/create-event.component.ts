import { User } from './../../interface/user';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
    form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        slug: new FormControl('', [Validators.required]),
    });

    public user: User;
    group = {};

    constructor(
        public modalCtrl: ModalController,
        private storage: Storage,
        private firestore: AngularFirestore,
        private router: Router,
    ) {
        this.storage.get('user')
        .then((val) => {
            this.user = val;
        })
    }

    ngOnInit() {
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    async submit() {
        const groupInfo = {
            id: this.firestore.createId(),
            name: this.form.get('name').value,
            slug: this.form.get('slug').value,
            userId: this.user.id,
        };
        console.warn(groupInfo);
        console.warn(this.group);
        // const groupCollection$ = this.firestore.collection('/groups');
        // await groupCollection$.doc(groupInfo.id).set(groupInfo);
        // console.log(this.user);
        // this.router.navigateByUrl('/');
        // this.modalCtrl.dismiss();
    }
}
