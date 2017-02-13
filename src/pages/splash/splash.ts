import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { AuthData } from  '../../providers/auth-data'

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {

  constructor(public navCtrl: NavController,
              public authData: AuthData,
              public loadCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }

  goToRoot(){
    this.authData.anonymousLogin().then( () => {
      loading.dismiss().then( () => {
        this.navCtrl.setRoot(TabsPage);
      });
    })

    const loading = this.loadCtrl.create();
    loading.present();
  }

}
