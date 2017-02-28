import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventEditPage } from '../event-edit/event-edit';
import { EventData } from '../../providers/event-data';
import { PhotoData } from '../../providers/photo-data';
import { AuthData } from '../../providers/auth-data';
import { PhotoUploaderPage } from '../photo-uploader/photo-uploader';
import { ShareEventPage } from '../share-event/share-event';

@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html'
})
export class EventDetailsPage {

  public event: any;
  public eventId: any;
  public photos: any;
  public currentUserId: any;
  
  constructor(public nav: NavController, 
              public navParams: NavParams, 
              private eventData: EventData, 
              public photoData: PhotoData,
              public authData: AuthData) {}

  ionViewDidLoad() {
    this.eventId = this.navParams.get('eventId');
    this.event = this.eventData.getEvent(this.eventId)
    this.currentUserId = this.authData.getUser().uid || null
    this.photoData.getEventPhotos(this.eventId).on('value', snapshot => {
        let rawList = [];
        snapshot.forEach( snap => {
          rawList.push({
            id: snap.key,
            url: snap.val().url,
            owner: snap.val().owner,
          });
        });
        this.photos = rawList;
      });  }

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

  shareEvent(){
    this.nav.push(ShareEventPage, {
      eventId: this.eventId
    });
  }

}