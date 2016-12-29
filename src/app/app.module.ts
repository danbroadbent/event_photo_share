import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AuthData } from '../providers/auth-data';
import { EventData } from '../providers/event-data';
import { ProfileData } from '../providers/profile-data';

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
    ProfileEditPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    ProfileEditPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthData, EventData, ProfileData]
})
export class AppModule {}
