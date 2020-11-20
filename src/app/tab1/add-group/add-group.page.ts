import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Platform} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {Group} from '../../interface/group';
import {Storage} from '@ionic/storage';
import {User} from '../../interface/user';

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

    public user: User;

    constructor(
        public platform: Platform,
        private af: AngularFireDatabase,
        private afs: AngularFirestore,
        private storage: Storage) {
        this.storage.get('user')
            .then((val) => {
                this.user = val;
            });
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
        const searchValue = this.form.get('search').value.toLowerCase();
        const groupQ = this.afs.collection<Group>('groups', ref => ref.where('slug', '==', searchValue).limit(1));
        const groupSnap = await groupQ.get().toPromise();
        if (groupSnap.docs.length) {
            this.addGroup(groupSnap.docs);
        } else {
            if (this.platform.is('cordova')) {
            } else {
                alert('We are not able to locate that group.');
            }
        }
    }

    async addGroup(values) {
        const tester = `/users/${this.user.id}/groups/`;
        console.warn(tester);
        const newuser = `/users/${this.user.id}`;
        const newUser = {
            id: this.user.id,
            fname: this.user.fname,
            lname: this.user.lname,
            email: this.user.email,
            phone: this.user.phone,
            address: this.user.address,
            profession: this.user.profession,
            groups: {
                ...this.user.groups,
                ...values
            }
        }
        const usersGroups = this.afs.collection<Group>(newuser);
        await usersGroups.doc(values.id).set(newUser);
    }
}
