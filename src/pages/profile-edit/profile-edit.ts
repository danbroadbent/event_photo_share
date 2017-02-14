import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';

@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html'
})
export class ProfileEditPage {
  public userProfile: any;

  constructor(public nav: NavController, 
              public profileData: ProfileData,
              public authData: AuthData, 
              public alertCtrl: AlertController) {
    this.userProfile = this.profileData.getUserProfile();
  }

  logOut(){
      this.authData.logoutUser();
    }

  updateName(){
    let alert = this.alertCtrl.create({
      message: "Username",
      inputs: [
        {
          name: 'username',
          placeholder: 'Your username',
          value: this.userProfile.username
        }
      ],
      buttons: [
        { text: 'Cancel' },
        { text: 'Save',
          handler: data => {
            this.profileData.updateUsername(data.username);
            }
          }
        ]
       });
      alert.present();
     }

  updateEmail(){
    this.profileData.reauthenticate("email")
  }

  updatePassword(){
    this.profileData.reauthenticate("password")
  }  
}
