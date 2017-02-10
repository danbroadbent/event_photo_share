import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EventData {
  currentUser: any; 
  events: any; 
  userEvents: any;

  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.events = firebase.database().ref('events/');
    this.userEvents = firebase.database().ref('userEvents/')
  }

  getEventList(): any {
    return this.userEvents.child(this.currentUser.uid)
  }

  getEvent(eventId): any {
    return this.events.child(eventId)
  }

  createEvent(event: any): any {
    var fullEventData = {
      name: event.eventName,
      description: event.eventDescription,
      host: this.currentUser.uid,
    }
    var userEventData = {
      name: event.eventName,
      host: true
    }
    var newEventKey = this.events.push().key
    var updates = {};
    updates['/events/' + newEventKey] = fullEventData;
    updates['/userEvents/' + this.currentUser.uid + '/' + newEventKey] = userEventData;

    return firebase.database().ref().update(updates);
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