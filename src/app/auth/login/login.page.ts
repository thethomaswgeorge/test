import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

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

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }


  async ngOnInit() {
    this.currentUser = await this.afAuth.currentUser;

    if (this.currentUser !== null) {
      await this.router.navigate(['dashboard']);
    }
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
