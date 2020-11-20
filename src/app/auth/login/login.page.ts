import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  private currentUser: any;
  errorWithLogin = false;

  constructor(
    private router: Router, 
    private afAuth: AngularFireAuth,
    private storage: Storage) {
  }


  async ngOnInit() {
    this.currentUser = await this.afAuth.currentUser;
    this.storage.get('user')
    .then(async (val) => {
      await this.router.navigate(['/']);
    });
  }

  async login() {
    const user = await this.afAuth.signInWithEmailAndPassword(
        this.form.get('email').value,
        this.form.get('password').value
    ).catch(
        (error) => this.errorWithLogin = true);
    this.router.navigate(['/']);
  }

}
