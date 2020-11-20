import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    form = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        profession: new FormControl(''),
        phone: new FormControl(''),
        passone: new FormControl('', [Validators.required]),
        passtwo: new FormControl('', [Validators.required]),
    });
    checkPassword = false;
    weak = false;

    constructor(
        private us: UsersService,
        private auth: AngularFireAuth,
        private firestore: AngularFirestore,
        private storage: Storage,
        private router: Router,
    ) {
    }

    ngOnInit() {
    }

    submit() {
        if (this.form.valid && (this.form.get('passone').value === this.form.get('passtwo').value)) {
            const userInfo = {
                id: this.firestore.createId(),
                fname: this.form.get('firstName').value,
                lname: this.form.get('lastName').value,
                profession: this.form.get('profession').value,
                phone: this.form.get('phone').value,
                groups: {},
                email: this.form.get('email').value,
            };

            this.auth.createUserWithEmailAndPassword(this.form.get('email').value, this.form.get('passone').value).then(async (r) => {
                const userCollections$ = this.firestore.collection('/users');
                await userCollections$.doc(userInfo.id).set(userInfo);

                this.storage.set('user', userInfo);
                this.router.navigateByUrl('/');
            }).catch(e => {
                (e.code === "auth/weak-password") ? (this.weak = true) : '';
            });
        } else {
            this.checkPassword = true;
        }
    }
}
