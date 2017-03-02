import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class PhotoData {
    currentUserId: any;
    photoBucket: any;
    photos: any;
    user: any;
    event: any;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.currentUserId = auth.uid
      }
    })
    firebase.database().ref(`users/${this.currentUserId}`).once('value').then((snapshot) => {
      this.user = snapshot.val()
    })
    this.photoBucket = firebase.storage().ref('userPhotos/');
    this.photos = firebase.database().ref('photos/')
  }


  getEventPhotos(eventId): any {
    return this.af.database.list(`/eventPhotos/${eventId}`)
  }


  uploadPhoto(blob: any, afEvent: any): any {
    let date = new Date().getTime().toString()
    return this.photoBucket.child(date + blob.size).put(blob).then((snapshot) => {
      console.log("upload successful")
      return snapshot.downloadURL;
    }, function(error) {
      alert("Upload Unsuccessful" + error)
    }).then( (downloadURL) => {
      this.addPhoto(downloadURL, afEvent)
    })
    };

  addPhoto(downloadURL, afEvent) {
    afEvent.subscribe( snapshot => {
      this.event = snapshot
    });
    let fullPhotoData = { url: downloadURL, event: this.event.$key, eventName: this.event.name, user: this.currentUserId, username: this.user.username }
    let eventPhotoData = { url: downloadURL, event: this.event.$key, eventName: this.event.name, user: this.currentUserId, username: this.user.username }
    let userPhotoData = { url: downloadURL, event: this.event.$key, eventName: this.event.name, user: this.currentUserId, username: this.user.username }
    let newPhotoKey = this.photos.push().key
    let updates = {}
    updates[`/photos/${newPhotoKey}`] = fullPhotoData
    updates[`/eventPhotos/${this.event.$key}/${newPhotoKey}`] = eventPhotoData
    updates[`/userPhotos/${this.currentUserId}/${newPhotoKey}`] = userPhotoData
    return firebase.database().ref().update(updates)
  }
}
