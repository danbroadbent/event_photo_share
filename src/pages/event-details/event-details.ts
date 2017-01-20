import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventEditPage } from '../event-edit/event-edit';
import { EventData } from '../../providers/event-data';
import { PhotoUploaderPage } from '../photo-uploader/photo-uploader'

@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html'
})
export class EventDetailsPage {

  event: any;
  photos: any;

  constructor(public nav: NavController, public navParams: NavParams, private eventData: EventData) {
    this.event = this.navParams.get('event');
    this.eventData.getPhotos(this.event.id).on('value', snapshot => {
        let rawList = [];
        snapshot.forEach( snap => {
          rawList.push({
            id: snap.key,
            url: snap.val().url,
            owner: snap.val().owner,
          });
        });
        this.photos = rawList;
      });
  }

  ionViewDidLoad() {
    console.log('Hello EventDetailsPage Page');
  }

  goToEditEvent(event) {
  this.nav.push(EventEditPage, {
      event: this.event
    });
  }

  deleteEvent(): void {
  this.eventData.deleteEvent(this.event.id)
  this.nav.pop();
  }

  goToPhotoUploader() {
    this.nav.push(PhotoUploaderPage, { 
      event: this.event
    });
  }

}