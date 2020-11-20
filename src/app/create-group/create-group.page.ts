import {User} from './../interface/user';
import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Group} from '../interface/group';

@Component({
    selector: 'app-create-group',
    templateUrl: './create-group.page.html',
    styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {

    form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        slug: new FormControl('', [Validators.required]),
        desc: new FormControl(''),
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
            });
    }

    ngOnInit() {
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    async submit() {
        const slug = await this.checkForGroupSlug(this.form.get('slug').value);
        if (!slug) {
            const groupInfo = {
                id: this.firestore.createId(),
                name: this.form.get('name').value,
                slug: this.form.get('slug').value.toLowerCase(),
                users: {},
                userId: this.user.id,
            };
            const groupCollection$ = this.firestore.collection('/groups');
            await groupCollection$.doc(groupInfo.id).set(groupInfo);
            this.router.navigateByUrl('/');
        }
    }

    async checkForGroupSlug(value) {
        const searchValue = this.form.get('slug').value.toLowerCase();
        const groupQ = this.firestore.collection<Group>('groups', ref => ref.where('slug', '==', searchValue).limit(1));
        const groupSnap = await groupQ.get().toPromise();
        return groupSnap.docs.length;
    }
}
