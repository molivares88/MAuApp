import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import * as geolocation from 'nativescript-geolocation';
import { Accuracy } from 'tns-core-modules/ui/enums';
import * as camera from 'nativescript-camera';
import { isAndroid, isIOS } from 'tns-core-modules/platform';


@Component({
  selector: 'ns-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  scanner = new BarcodeScanner();
  scannerText = ""; 
  imageSrc = "";

  constructor()  { 
  }

  ngOnInit() {
  }

  fuTakePicture()
  {
    camera.requestPermissions().then(() =>
    {
      const options: camera.CameraOptions = {width: 100, height: 100, cameraFacing: "rear", keepAspectRatio: true, saveToGallery: true};
      camera.takePicture(options).then((image) =>
      {
        console.log(image);
        if (isAndroid)
        {
          this.imageSrc = image.android;
        }
        else if (isIOS)
        {
          this.imageSrc = image.ios;
        }
      }).catch((error) => 
      {
        console.log(error);
      });
    }).catch((error) =>
    {
      console.log(error);
    });

  }

  fuGetLocation()
  {
    geolocation.enableLocationRequest(true).then(() =>
    {
      const options = {desiredAccuracy: Accuracy.high, maximunAge: 500, timeout: 20000};
      geolocation.getCurrentLocation(options).then((response) => 
      {
        console.log(response);
      
      }).catch((error) =>
      {
        console.log(error);
      });
    }).catch((error) =>
    {
      console.log(error);
    });
  }



  fuScanning()
  {
    this.scanner.available().then(() =>
    {
      this.scanner.hasCameraPermission().then((result) =>
      {
        if (result)
        {
          this.scanner.scan({
            formats: "QR_CODE",
            cancelLabel: "Cancel",
            message: "Scanning QR",
            preferFrontCamera: false,
            showFlipCameraButton: true,
            showTorchButton: true,
            torchOn: false,
          }).then((scanResult) =>
          {
            console.log("Formato: " + scanResult.format);
            this.scannerText = scanResult.text;
          }).catch((error) => 
          {
            console.log(error);
          });
        }else 
        {
          this.scanner.requestCameraPermission().then((result) => 
          {
            this.scanner.scan({
              formats: "QR_CODE",
              cancelLabel: "Cancel",
              message: "Scanning QR",
              preferFrontCamera: false,
              showFlipCameraButton: true,
              showTorchButton: true,
              torchOn: false,
            }).then((scanResult) =>
            {
              console.log(scanResult);
            }).catch((error) => 
            {
              console.log(error);
            });
          }).catch((error) => 
          {
            console.log(error);
          });
        }
      }).catch((error) => 
      {
        console.log(error);
      });
    }).catch((error) => 
    {
      console.log(error);
    });
  }

}
