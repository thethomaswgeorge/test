import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Group } from '../interface/group';
import {AngularFirestore} from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public created = [];
  public joined: Group[] = [];

  constructor(
      private af: AngularFireAuth,
      private firestore: AngularFirestore,
      private storage: Storage,
  ) {
    this.getInfo();
  }

  async getInfo() {
    this.storage.get('user')
        .then(async (user) => {
          console.warn(user);
          const currentEventsQuery = this.firestore.collection<Group>('groups', ref => ref.where('userId', '==', user.id));
          const currentEventsSnapshot = await currentEventsQuery.get().toPromise();
          currentEventsSnapshot.forEach((event) => {
            this.created.push(event.data());
          });
        });
  }


}
