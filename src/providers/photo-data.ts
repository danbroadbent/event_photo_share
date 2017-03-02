import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class PhotoData {
    currentUserId: any;
    photoBucket: any;
    photos: any;
    user: any;

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
    return this.af.database.list('/photos', {
    query: {
      orderByChild: 'event',
      equalTo: `${eventId}` 
      }
    })
  }


  uploadPhoto(blob: any, eventId: string): any {
    let date = new Date().getTime().toString()
    return this.photoBucket.child(date + blob.size).put(blob).then((snapshot) => {
      console.log("upload successful")
      return snapshot.downloadURL;
    }, function(error) {
      alert("Upload Unsuccessful" + error)
    }).then( (downloadURL) => {
      this.addPhoto(downloadURL, eventId)
    })
    };

  addPhoto(downloadURL, eventId) {
    this.photos.push({
      url: downloadURL,
      event: eventId,
      user: this.currentUserId,
      username: this.user.username
    })
  }
}
