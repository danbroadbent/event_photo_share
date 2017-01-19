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

  constructor(public nav: NavController, public navParams: NavParams, private eventData: EventData) {
    this.event = this.navParams.get('event');
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