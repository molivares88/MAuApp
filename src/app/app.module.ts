import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ScannerComponent } from './scanner/scanner.component';
import {iOSApplication} from "tns-core-modules/application";
import { MapComponent } from './map/map.component';
//import { DialogComponent } from './dialog/dialog.component';
//import { AccountComponent } from './account/account.component';
//import { LoginComponent } from './login/login.component';

declare var GMSServices: any;

if (iOSApplication) { 
    GMSServices.provideAPIKey("AlzaSyD0AXJg6YZxmReZ4PiZwBbzKILCX8sEBuc");
}


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent
        
    
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
