import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EventData {
  currentUser: any; 
  eventList: any; 
  photoBucket: any;


  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.eventList = firebase.database().ref('userEvents/' + this.currentUser.uid);
    this.photoBucket = firebase.storage().ref('userPhotos/' + this.currentUser.uid);

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

  addEventPhoto(file: any): any {
    let date = new Date().getTime()
    return this.photoBucket.child(date + file.name).put(file).then(function(snapshot){
      console.log("upload successful")
      snapshot.downloadURL;
    }, function(error) {
      alert("Upload Unsuccessful")
      error
    })
    };
  

}