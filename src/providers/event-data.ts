import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class EventData {
  events: any; 
  userEvents: FirebaseListObservable<any>;
  eventDetail: FirebaseObjectObservable<any>;
  userId: string;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.userEvents = af.database.list(`/userEvents/${auth.uid}`);
        this.userId = auth.uid
      }
    })

    this.events = firebase.database().ref('events/');
  }

  getEventList() {
    return this.userEvents
  }

  getEvent(eventId: string) {
    return this.af.database.object(`/events/${eventId}`)
  }

  createEvent(event: any): any {
    var fullEventData = {
      name: event.eventName,
      description: event.eventDescription,
      host: this.userId,
    }
    var userEventData = {
      name: event.eventName,
      host: true
    }
    var newEventKey = this.events.push().key
    var updates = {};
    updates[`/events/${newEventKey}`] = fullEventData;
    updates[`/userEvents/${this.userId}/${newEventKey}`] = userEventData;

    return firebase.database().ref().update(updates);
  }

  editEvent(event: any, eventId: string): any {
    var updates = {};
    updates[`/events/${eventId}/name`] = event.eventName
    updates[`/events/${eventId}/description`] = event.eventName
    updates[`/userEvents/${this.userId}/${eventId}/name`] = event.eventName

    return this.af.database.object('/').update(updates);
  }

  deleteEvent(eventId: string): any {
    var updates = {};
    updates[`/events/${eventId}`] = null;
    updates[`/userEvents/${this.userId}/${eventId}`] = null;
    firebase.database().ref().update(updates);
  }

}