import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';

@Component({
    selector: 'app-add-groups',
    templateUrl: './add-groups.component.html',
    styleUrls: ['./add-groups.component.scss'],
})
export class AddGroupsComponent implements OnInit {
    groupImage: string | null;
    private scannedData: BarcodeScanResult;

    constructor(private barcodeScanner: BarcodeScanner, public platform: Platform) {
    }

    ngOnInit() {
    }

    scanQRCode() {
        if (this.platform.is('cordova')) {
            const options: BarcodeScannerOptions = {
                preferFrontCamera: false,
                showFlipCameraButton: true,
                showTorchButton: true,
                torchOn: false,
                prompt: 'Place a barcode inside the scan area',
                resultDisplayDuration: 500,
                formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
                orientation: 'portrait',
            };

            this.barcodeScanner.scan(options).then(barcodeData => {
                console.log('Barcode data', barcodeData);
                this.scannedData = barcodeData;

            }).catch(err => {
                console.log('Error', err);
            });
        } else {
            alert('You can not use QR Scanner on the web.');
        }
    }
}
