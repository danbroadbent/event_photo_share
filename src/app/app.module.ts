import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AuthData } from '../providers/auth-data';
import { EventData } from '../providers/event-data';
import { ProfileData } from '../providers/profile-data';
import { PhotoData } from '../providers/photo-data';

import { SplashPage } from '../pages/splash/splash';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { EventsPage } from '../pages/events/events';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { EventCreatePage } from '../pages/event-create/event-create';
import { EventEditPage } from '../pages/event-edit/event-edit';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { PhotoUploaderPage } from '../pages/photo-uploader/photo-uploader';

import { AngularFireModule , AuthProviders, AuthMethods } from 'angularfire2';

const firebaseConfig = {
  apiKey: "AIzaSyA2sP87i8Ae5m78Rm0B-ELnDZHucICx05E",
  authDomain: "event-photo-share.firebaseapp.com",
  databaseURL: "https://event-photo-share.firebaseio.com",
  storageBucket: "event-photo-share.appspot.com",
  messagingSenderId: "38582519137"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    SplashPage,
    SignupPage,
    LoginPage,
    TabsPage,
    EventsPage,
    ProfilePage,
    ResetPasswordPage,
    EventCreatePage,
    EventEditPage,
    EventDetailsPage,
    ProfileEditPage,
    PhotoUploaderPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {}, {
      links: [
      { component: TabsPage, segment: 'tabs', name: 'Tabs' },
      { component: EventDetailsPage, segment: 'event/:eventId', name: 'Event', defaultHistory: [TabsPage]}
     ]
    }), AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SplashPage,
    SignupPage,
    LoginPage,
    TabsPage,
    EventsPage,
    ProfilePage,
    ResetPasswordPage,
    EventCreatePage,
    EventEditPage,
    EventDetailsPage,
    ProfileEditPage,
    PhotoUploaderPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthData, EventData, ProfileData, PhotoData]
})
export class AppModule {}
