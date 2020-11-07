import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: AngularFirestore) { }

  add(user: User) {
    // convert object of type user to JSON object
    // because Firestore understand JSON
    const userObject = {...user};
    return this.firestore.collection('users').add(userObject).then(val => val);
  }

  // this method returns list of user document,
  // fetched from Firestore database collection
  get() {
    return this.firestore.collection('users').snapshotChanges();
  }

  checkEmail(email: string) {
    return this.firestore.collection('users', ref => ref.where('visibility', '==', 'false')).snapshotChanges();
  }

  // this method takes an user object and
  // update an object of user to the Firestore document
  update(user: User) {
    // convert object of type user to JSON object
    // because Firestore understand JSON
    const employeeObject = {...user};
    this.firestore.doc('users/' + user.id).update(employeeObject);
  }

  // this method takes an user Id and
  // delete an user document from the Firestore collection
  delete(userId: string) {
    this.firestore.doc('users/' + userId).delete();
  }
}
