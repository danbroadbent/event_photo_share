import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { TabsPage } from '../tabs/tabs';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(public nav: NavController, 
              public authData: AuthData, 
              public formBuilder: FormBuilder, 
              public alertCtrl: AlertController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  loginUser(){

    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( () => {
        console.log("successful login")
      }, error => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();          
      });
    }
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }

}
