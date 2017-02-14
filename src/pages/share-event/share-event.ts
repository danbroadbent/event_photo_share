import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.eventId = navParams.data.eventId
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareEventPage');
  }

}
