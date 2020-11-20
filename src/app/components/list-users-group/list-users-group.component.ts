import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../interface/group';
import {Storage} from '@ionic/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-list-users-group',
    templateUrl: './list-users-group.component.html',
    styleUrls: ['./list-users-group.component.scss'],
})
export class ListUsersGroupComponent implements OnInit {

    constructor(
        private storage: Storage,
        private afs: AngularFirestore,
        private route: ActivatedRoute,
    ) {
        console.log('YES');
        this.route.params.subscribe(val => {
            this.generateInfo(val.id);
        });
        // const groupQ = this.afs.collection<Group>('groups', ref => ref.where('id', '==', ).limit(1));
        //const groupSnap = await groupQ.get().toPromise();
        //return groupSnap.docs.length;
    }

    public user;
    public group;

    async generateInfo(id) {
        this.storage.get('user')
            .then((val) => {
                this.user = val;
            });


        const groupQ = this.afs.collection<Group>('groups', ref => ref.where('id', '==', id).limit(1));
        const groupSnap = await groupQ.get().toPromise();

        console.warn(groupSnap.docs[0].data());
        this.group = groupSnap.docs[0].data();
    }

    ngOnInit() {
        console.warn('Test');
    }

}
