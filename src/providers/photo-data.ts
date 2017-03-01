import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class PhotoData {
    currentUser: any;
    photoBucket: any;
    photos: any;

  constructor(public af: AngularFire) {
    this.currentUser = firebase.auth().currentUser;
    this.photoBucket = firebase.storage().ref('userPhotos/');
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
    let currentUser = this.currentUser.uid
    this.photos.push({
      url: downloadURL,
      event: eventId,
      user: currentUser
    })
  }
}
