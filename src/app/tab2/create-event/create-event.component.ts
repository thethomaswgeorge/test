import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
    form = new FormGroup({
        name: new FormControl('', [Validators.required]),
    });

    constructor(
        public modalCtrl: ModalController,
    ) {
    }

    ngOnInit() {
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    submit() {
        alert('This part isn\'t completed yet');
    }
}
