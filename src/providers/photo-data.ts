import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class PhotoData {
    currentUser: any;
    eventPhotos: any;
    userPhotos: any;
    photoBucket: any;

  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.photoBucket = firebase.storage().ref('userPhotos/');
    this.eventPhotos = firebase.database().ref('eventPhotos/')
    this.userPhotos = firebase.database().ref('userPhotos/')
  }


  getEventPhotos(eventId): any {
    return this.eventPhotos.child(eventId).child('photos/');
  }

  uploadPhoto(file: any, eventId: string): any {
    let date = new Date().getTime()
    return this.photoBucket.child(date + file.name).put(file).then(function(snapshot){
      console.log("upload successful")
      return snapshot.downloadURL;
    }, function(error) {
      alert("Upload Unsuccessful" + error)
    }).then( downloadURL => {
      this.addEventPhoto(downloadURL, eventId)
    })
    };

    addEventPhoto(downloadURL, eventId) {
      this.eventPhotos.child(eventId).child('photos/').push({
        url: downloadURL,
        owner: this.currentUser.uid,
      })
    }

}
