import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-add-groups',
    templateUrl: './add-groups.component.html',
    styleUrls: ['./add-groups.component.scss'],
})
export class AddGroupsComponent implements OnInit {
    groupImage: string | null;

    constructor( public platform: Platform) {
    }

    ngOnInit() {
    }

    scanQRCode() {
        if (this.platform.is('cordova')) {
        } else {
            alert('You can not use QR Scanner on the web.');
        }
    }
}
