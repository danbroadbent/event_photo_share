import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { PhotoData } from '../../providers/photo-data';
import { ProfileEditPage } from '../profile-edit/profile-edit';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public photos: any;

  constructor(public nav: NavController, public profileData: ProfileData, public photoData: PhotoData) {
    this.userProfile = this.profileData.getUserProfile();
    this.photos = this.photoData.getUserPhotos();
  }

  ionViewDidLoad() {
    console.log('Hello ProfileEditPage Page');
  }

  goToProfileEdit(){
    this.nav.push(ProfileEditPage);
  }

}