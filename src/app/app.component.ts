import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { SplashPage } from '../pages/splash/splash';

import firebase from 'firebase';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;
  zone: NgZone;

  constructor(platform: Platform) {
    this.zone = new NgZone({});
    firebase.initializeApp({
      apiKey: "AIzaSyA2sP87i8Ae5m78Rm0B-ELnDZHucICx05E",
      authDomain: "event-photo-share.firebaseapp.com",
      databaseURL: "https://event-photo-share.firebaseio.com",
      storageBucket: "event-photo-share.appspot.com",
      messagingSenderId: "38582519137"
    });

    firebase.auth().onAuthStateChanged((user) => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = SplashPage;
        } else { this.rootPage = TabsPage; }
      });     
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}