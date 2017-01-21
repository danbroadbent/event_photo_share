import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EventData {
  currentUser: any; 
  events: any; 

  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.events = firebase.database().ref('events/');
  }

  getEventList(): any {
    return this.events;
  }

  createEvent(event: any): any {
    return this.events.push({
      name: event.eventName,
      description: event.eventDescription,
      host: this.currentUser.uid,
    });
  }

  editEvent(event: any, eventId: string): any {
    return this.events.child(eventId).update({
      name: event.eventName,
      description: event.eventDescription
    })
  }

  deleteEvent(eventId: string): any {
    this.events.child(eventId).remove()
  }

}