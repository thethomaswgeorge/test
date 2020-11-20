import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Storage} from '@ionic/storage';
import {User} from '../../interface/user';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
    form = new FormGroup({
        fname: new FormControl('', [Validators.required]),
        lname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        profession: new FormControl(''),
        phone: new FormControl(''),
        passone: new FormControl('', [Validators.required]),
        passtwo: new FormControl('', [Validators.required]),
    });

    public user: User;

    constructor(
        private storage: Storage
    ) {
        this.storage.get('user')
            .then(val => {
                this.user = val;
                this.form.patchValue(this.user);
            });
    }

    ngOnInit() {
    }

    update() {

    }
}
