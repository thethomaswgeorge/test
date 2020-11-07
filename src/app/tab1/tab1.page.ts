import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Group } from '../interface/group';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public created: Group[] = [];
  public joined: Group[] = [];

  constructor(
      private af: AngularFireAuth
  ) {
  }


}
