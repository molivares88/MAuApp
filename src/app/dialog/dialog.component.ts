import { Component, OnInit } from '@angular/core';
import { prompt, login, action, confirm, capitalizationType, inputType, LoginOptions, PromptOptions, LoginResult, PromptResult } from 'tns-core-modules/ui/dialogs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ns-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    constructor(private Authservice: AuthService ) 
    { 

    }

    ngOnInit() 
    {

    }

    SimpleDialog()
    {
        alert("Hola");
    }

    Dialog(value: boolean = false)
    {
        const options = {
            title: "Alerta",
            message: " " + value,
            okButtonText: "Ok"
        };

        alert(options);
    }

    ActionDialog()
    {
        const options = {
          title: "ACtion Dialog",
          message: "Choose one side..",
          //okButtonText: "Yes",
          cancelButtonText: "Cancel",
          actions: ["DArk side", "Light side"]
      };  
      
      action(options).then((result: string) =>
      {
          
        this.ConfirmDialog(result);
      });
    }

    ConfirmDialog(value: string)
    {
        const options = {
          title: "Confirm Dialog",
          message: "You choose " + value + " Are you sure ?",
          okButtonText: "Yes",
          cancelButtonText: "No"
          //neutralButtonText: "Cancel"
        };  

        confirm(options).then((result: boolean) =>
        {
            if (result) {
              this.Dialog(result);
            } 
        });
        
    }

    LoginDialog()
    {
      const options: LoginOptions = {
        title: "Login Dialog",
        message: "Write your name and email. ",
        okButtonText: "Login",
        cancelButtonText: "Cancel",
        userNameHint: "Email",
        passwordHint: "Password"
        //neutralButtonText: "Cancel"
      };  

      login(options).then((result: LoginResult) => 
      {
        if(result.result)
        {
          this.Authservice.login(result.userName, result.password).then((response: string) =>
          {
              alert(response);
          }).catch((error) =>
          {
            alert(error);
          });
        }
      });
    }

    PromptDialog() {
      const options: PromptOptions = {
        title: "Prompt Dialog",
        message: "Write your email. ",
        okButtonText: "OK",
        cancelButtonText: "Cancel",
        cancelable: true,
        inputType: inputType.email,
        capitalizationType: capitalizationType.none
      }; 

      prompt(options).then((result:PromptResult) => 
      {
        if(result.result)
        {
          this.Authservice.forgot(result.text).then((response: string) =>
          {
            alert(response);
          }).catch((error) =>
          {
            alert(error);
          });
           
        }
      });
    }
}
