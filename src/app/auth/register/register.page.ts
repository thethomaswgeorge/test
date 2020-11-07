import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
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
        passone: new FormControl('', [Validators.required]),
        passtwo: new FormControl('', [Validators.required]),
    });
    checkPassword = false;

    constructor(
        private us: UsersService,
        private auth: AngularFireAuth,
        private firestore: AngularFirestore,
        private router: Router,
    ) {
    }

    ngOnInit() {
    }

    submit() {
        if (this.form.valid && (this.form.get('passone').value === this.form.get('passtwo').value)) {
            const userInfo = {
                id: this.firestore.createId(),
                fname: this.form.get('fname').value,
                lname: this.form.get('lname').value,
                email: this.form.get('email').value,
                phone: '',
            };

            this.auth.createUserWithEmailAndPassword(this.form.get('email').value, this.form.get('passone').value).then(async (r) => {
                const userCollections$ = this.firestore.collection('/users');
                await userCollections$.doc(userInfo.id).set(userInfo);
                this.router.navigateByUrl('/');
            }).catch(e => {
                console.log(e);
            });
        } else {
            this.checkPassword = true;
        }
    }
}
