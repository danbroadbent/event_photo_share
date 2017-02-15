import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data';

/*
  Generated class for the ShareEvent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-share-event',
  templateUrl: 'share-event.html'
})
export class ShareEventPage {

  eventId: any;
  emailCopy: string;
  currentUsername: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public profileData: ProfileData) {
    this.eventId = navParams.data.eventId
    profileData.getUserProfile().subscribe(data => {
      this.currentUsername = data.username
    })
    this.emailCopy = `mailto:?to=&body=You've been invited!%0D%0A%0D%0ACheck out all the event photos here:%0D%0Ahttps://event-photo-share.firebaseapp.com/#/event/${this.eventId}&subject=Event Invitation`
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareEventPage');
  }

}
