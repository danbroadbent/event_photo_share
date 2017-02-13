import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class EventData {
  // currentUser: any; 
  // events: any; 
  // userEvents: any;
  userEventList: FirebaseListObservable<any>;
  eventDetail: FirebaseObjectObservable<any>;
  userId: string;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.userEventList = af.database.list(`/userEvents/${auth.uid}`);
        this.userId = auth.uid
      }
    })

    // this.currentUser = firebase.auth().currentUser;
    // this.events = firebase.database().ref('events/');
    // this.userEvents = firebase.database().ref('userEvents/')
  }

  getEventList() {
    return this.userEventList
  }

  getEvent(eventId: string) {
    return this.af.database.object(`/events/${eventId}`)
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
    var updates = {};
    updates['/events/' + eventId] = null;
    updates['/userEvents/' + this.currentUser.uid + '/' + eventId] = null;
    firebase.database().ref().update(updates);
  }

}