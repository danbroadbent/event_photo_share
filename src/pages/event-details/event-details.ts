import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventEditPage } from '../event-edit/event-edit';
import { EventData } from '../../providers/event-data';
import { PhotoData } from '../../providers/photo-data';
import { PhotoUploaderPage } from '../photo-uploader/photo-uploader'

@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html'
})
export class EventDetailsPage {

  eventId: any;
  event: {};
  photos: any;

  constructor(public nav: NavController, public navParams: NavParams, private eventData: EventData, public photoData: PhotoData) {
    this.eventId = this.navParams.get('eventId');
    this.event = {}
    this.eventData.getEvent(this.eventId)
    .on('value', snapshot => {
        this.event = snapshot.val()
      })
    
    this.photoData.getEventPhotos(this.eventId)
    .on('value', snapshot => {
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
  this.eventData.deleteEvent(this.eventId)
  this.nav.pop();
  }

  goToPhotoUploader() {
    this.nav.push(PhotoUploaderPage, { 
      eventId: this.eventId
    });
  }

}