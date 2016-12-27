import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { SplashPage } from '../pages/splash/splash';
import { TabsPage } from '../pages/tabs/tabs';

import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform) {
    const config = {
      apiKey: "AIzaSyA2sP87i8Ae5m78Rm0B-ELnDZHucICx05E",
      authDomain: "event-photo-share.firebaseapp.com",
      databaseURL: "https://event-photo-share.firebaseio.com",
      storageBucket: "event-photo-share.appspot.com",
      messagingSenderId: "38582519137"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged( user => {
      if (!user) {
        this.rootPage = SplashPage;
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
