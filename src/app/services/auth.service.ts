import { Injectable } from '@angular/core';
import { User } from '../classes/User';
import { request } from "tns-core-modules/http";
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  user = new User();
  bizURL = "http://auth.bizbox.mx/api/";
  loginURL : "auth/login";
  registerURL : "auth/register";

  constructor() { 

  }
  
  login(email: string, psw: string): Promise<string>{
    return new Promise<string>( (resolve, reject) => 
    {
      request({
        url: this.bizURL + this.loginURL,
        headers: {"Content-Type": "application/json" },
        method: "POST",
        content: JSON.stringify( {
          email, 
          psw
        })
      }).then( (response ) => 
      {
          const result = response.content.toJSON();
          resolve(result);
      }).catch((error) => 
      {
        reject(error);
      });
    });
  }

  Register(first_name: string, last_name: string, email: string, password: string, password_confirmation : string): Promise<string>{
    return new Promise<string>( (resolve, reject) => 
    {
      request({
        url: this.bizURL + this.loginURL,
        headers: {"Content-Type": "application/json" },
        method: "POST",
        content: JSON.stringify( {
          first_name,
          last_name,
          email, 
          password,
          password_confirmation
        })
      }).then( (response ) => 
      {
          const result = response.content.toJSON();
          console.log(result);
          
          if(result.access_token)
          {
            this.user.firstName = result.user.first_name;
            this.user.lastName = result.user.last_name;
            this.user.email = result.user.email;
            this.user.uuid = result.user.uuid;
            this.user.id = result.user.id;
            this.user.token = result.user.access_token;

            

            resolve(result.access_token);

          }else{
            reject(result.error);
        
          }

      }).catch((error) => 
      {
        reject(error);
      });
    });
  }

}
