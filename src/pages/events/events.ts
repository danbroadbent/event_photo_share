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

  events: any = [];

  constructor(public nav: NavController, public eventData: EventData, public platform: Platform) {
  
  this.eventData = eventData;
  this.nav = nav;

  this.eventData.getEventList().on('value', snapshot => {
        let rawList = [];
        snapshot.forEach( snap => {
          rawList.push({
            id: snap.key,
            name: snap.val().name,
            description: snap.val().description,
          });
        });
        this.events = rawList;
      });
    }

  goToCreateEvent(){
    this.nav.push(EventCreatePage);
  }

  viewEvent(event): void {
    this.nav.push(EventDetailsPage, {
      event: event
    });
  }
}