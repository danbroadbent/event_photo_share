import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { SplashPage } from '../pages/splash/splash';

import { AngularFire } from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, public af: AngularFire) {

    af.auth.subscribe( user => {
      if (user) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = SplashPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}