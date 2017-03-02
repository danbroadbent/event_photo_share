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
      description: event.eventDescription,
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
    this.getEventPhotoIds(eventId).then((photoIds: Array<string>) => {
      var updates = {};
      for(var i = 0; i < photoIds.length; i++){
        updates[`/photos/${photoIds[i]}/event`] = null;
      }
      return updates
    }).then((updates) => {
      updates[`/events/${eventId}`] = null;
      updates[`/userEvents/${this.userId}/${eventId}`] = null;
      firebase.database().ref().update(updates);
    })    
  }

  getEventPhotoIds(eventId) {
    return new Promise((resolve, reject) => {
      let photos
      let photoIds = []
      firebase.database().ref('/photos').orderByChild("event").equalTo(eventId).once('value').then((snapshot) => {
        photos = snapshot.val()
        for (var key in photos) {
          if (photos.hasOwnProperty(key)) {
            photoIds.push(key);
          }
        }
      })
      resolve(photoIds)
    })
  }

}