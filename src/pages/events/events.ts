import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { EventDetailsPage } from '../event-details/event-details';
import { EventCreatePage } from '../event-create/event-create';
import { EventData } from '../../providers/event-data';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  public userEvents: any;

  constructor(public nav: NavController, public eventData: EventData, public platform: Platform) {
    this.userEvents = this.eventData.getEventList();
    }

  goToCreateEvent(){
    this.nav.push(EventCreatePage);
  }

  viewEvent(eventId): void {
    this.nav.push(EventDetailsPage, {
      'eventId': eventId
    });
  }
}