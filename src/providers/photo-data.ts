import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class PhotoData {
    currentUser: any;
    photoBucket: any;
    photos: any;

  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.photoBucket = firebase.storage().ref('userPhotos/');
    this.photos = firebase.database().ref('photos/')
  }


  getEventPhotos(eventId): any {
    return this.photos.orderByChild("event").equalTo(eventId)
  }


  uploadPhoto(file: any, eventId: string): any {
    let date = new Date().getTime()
    return this.photoBucket.child(date + file.name).put(file).then(function(snapshot){
      console.log("upload successful")
      return snapshot.downloadURL;
    }, function(error) {
      alert("Upload Unsuccessful" + error)
    }).then( downloadURL => {
      this.addPhoto(downloadURL, eventId)
    })
    };

  addPhoto(downloadURL, eventId) {
    let currentUser = this.currentUser.uid
    this.photos.push({
      url: downloadURL,
      event: eventId,
      user: currentUser
    })
  }
}
