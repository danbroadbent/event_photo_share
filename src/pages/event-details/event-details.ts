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

  public afEvent: any;
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
    this.afEvent = this.eventData.getEvent(this.eventId)
    this.currentUserId = (this.authData.getUser() != undefined) ? this.authData.getUser().uid : null
    this.photos = this.photoData.getEventPhotos(this.eventId)
  }

  goToEditEvent(event) {
  this.nav.push(EventEditPage, {
      event: this.afEvent
    });
  }

  deleteEvent(): void {
  this.eventData.deleteEvent(this.eventId)
  this.nav.pop();
  }

  goToPhotoUploader() {
    this.nav.push(PhotoUploaderPage, { 
      afEvent: this.afEvent
    });
  }

  shareEvent(){
    this.nav.push(ShareEventPage, {
      eventId: this.eventId
    });
  }

}