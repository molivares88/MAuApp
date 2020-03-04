import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingIndicator, Mode, OptionsCommon } from '@nstudio/nativescript-loading-indicator';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    email = "";
    psw = ""; 

    loading = false; 

    indicator = new LoadingIndicator();

  constructor( private Authservice: AuthService, private router: RouterExtensions) 
  { 


  }

  ngOnInit() 
  {

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

  fuHideLoader()
  {
    this.indicator.hide();
    this.loading = false;
  }

  fulogin(){
    this.fuShowLoader();
    this.Authservice.login(this.email,this.psw).then((token : string) => 
    {
      this.fuHideLoader();
      console.log(token);

      this.router.navigate(["/home"], { clearHistory: true});
    }).catch((error) => 
    {
      console.log(error);
      this.fuHideLoader();
      alert(error);
    });
  }

}
