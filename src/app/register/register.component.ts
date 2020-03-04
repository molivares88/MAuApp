import { Component, OnInit } from '@angular/core';
import { CFAlertDialog, CFAlertStyle, CFAlertActionStyle, CFAlertActionAlignment, DialogOptions } from 'nativescript-cfalert-dialog';
import { Page } from 'tns-core-modules/ui/page/page';
import { AuthService } from '../services/auth.service';
import { LoadingIndicator, Mode, OptionsCommon } from '@nstudio/nativescript-loading-indicator';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'Register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  email = "";
  psw = ""; 
  first_name = "";
  last_name = "";
  psw_confirmation = "";

  loading = false;

  indicator = new LoadingIndicator();
  niceAlert = new CFAlertDialog();

  constructor(private page: Page, private AuthService: AuthService) { 


  }

  ngOnInit() {
    //this.page.action
    this.page.actionBarHidden = true;
  }

  fuShowLoader()
  {
    this.loading = true;
      const options: OptionsCommon = {
        message: 'Loading...',
        details: 'Waiting for a moment.. ',
        margin: 10,
        dimBackground: true,
        color: '#4B9ED6', // color of indicator and labels
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: 'yellow',
        userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
        hideBezel: true, // default false, can hide the surrounding bezel
        mode: Mode.Indeterminate, // see options below
        android: {
          
          cancelable: true,
          
        },
        ios: {
          square: false
        }
      };
      this.indicator.show(options);
  }

  register() {
    this.fuShowLoader();
    this.AuthService.Register(this.first_name, this.last_name,this.email,this.psw,this.psw_confirmation).then((response : string) =>
    {
        alert(response);
        /*
       const options : DialogOptions = {
          dialogStyle : CFAlertStyle.ALERT,
          title: "REGISTRO DE USUARIO",
          message: response,
          buttons: [{
            text: "CONTINUAR",
            buttonStyle : CFAlertActionStyle.POSITIVE,
            buttonAlignment: CFAlertActionAlignment.END,
            onClick: () =>
            {

            }
          }]
        };
        this.niceAlert.show(options).then(() => {

        });
        */
      }).catch((error) =>
      {
        alert(error);
        /*
        const options : DialogOptions = {
          dialogStyle : CFAlertStyle.ALERT,
          title: "ERROR - REGISTRO DE USUARIO",
          message: error,
          buttons: [{
            text: "ACEPTAR",
            buttonStyle : CFAlertActionStyle.NEGATIVE,
            buttonAlignment: CFAlertActionAlignment.END,
            onClick: () =>
            {

            }
          }]
        }
        */

      });
  }



}
