import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EventData {
  currentUser: any; 
  eventList: any; 

  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.eventList = firebase.database().ref('userEvents/' + this.currentUser.uid);
  }

  getEventList(): any {
    return this.eventList;
  }

  createEvent(event: any): any {
    return this.eventList.push({
      name: event.eventName,
      description: event.eventDescription
    }).then( newEvent => {
      this.eventList.child(newEvent.key).child('id').set(newEvent.key);
    });
  }

  editEvent(event: any, eventId: string): any {
    return this.eventList.child(eventId).update({
      name: event.eventName,
      description: event.eventDescription
    })
  }

  deleteEvent(eventId: string): any {
    this.eventList.child(eventId).remove()
  }

}