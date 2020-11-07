import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Group } from '../../interface/group';

@Component({
    selector: 'app-add-group',
    templateUrl: './add-group.page.html',
    styleUrls: ['./add-group.page.scss'],
})
export class AddGroupPage implements OnInit {
    groupImage: string | null;
    form = new FormGroup({
        search: new FormControl('', [Validators.required]),
    });

    constructor(
        public platform: Platform,
        private af: AngularFireDatabase,
        private afs: AngularFirestore) {

    }

    ngOnInit() {
    }

    scanQRCode() {
        if (this.platform.is('cordova')) {
        } else {
            alert('You can not use QR Scanner on the web.');
        }
    }

    async search() {
        const groupQ = this.afs.collection<Group>('groups', ref => ref.where('name', '==', this.form.get('search').value).limit(1));
        const groupSnap = await groupQ.get().toPromise();
        console.log('Search ', groupSnap.docs);
        if (groupSnap.docs.length) {

        } else {
            if (this.platform.is('cordova')) {
            } else {
                alert('We are not able to locate that group.');
            }
        }
    }
}
