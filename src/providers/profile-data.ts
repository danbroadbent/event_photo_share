import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class ProfileData {
  fireAuth: any; 
  userProfile: FirebaseObjectObservable<any>;
  verifyPassword: any;

  constructor(public af: AngularFire, public alertCtrl: AlertController) {
    af.auth.subscribe( user => {
      if (user) {
        this.fireAuth = user.auth;
      }
    })
    this.userProfile = af.database.object(`/users/${this.fireAuth.uid}`);
  }

  getUserProfile(): any {
    return this.userProfile;
  }

  updateUsername(username: string): any {
    return this.userProfile.update({
      username: username
    });
  }

  reauthenticate(parameter): any{
    let alert = this.alertCtrl.create({
      title: "Verify Current Password",
      subTitle: "To Authorize Change",
      inputs: [
          {
            name: 'password',
            placeholder: 'Your current password',
          }
        ],
        buttons: [
          {
            text: 'Cancel',
          },
          {
            text: 'Verify',
            handler: data => {
              const credential = firebase.auth.EmailAuthProvider.credential(
                this.fireAuth.email, 
                data.password
              );
              this.fireAuth.reauthenticate(credential);
              if (parameter == "email") {
                this.updateEmail();
              } else {
                this.updatePassword();
              }
            }
          }
        ]
      });
      alert.present()
  }

    updateEmail(): any {
      let alert = this.alertCtrl.create({
        title: "Enter New Email",
        inputs: [
          {
            name: 'newEmail',
            placeholder: 'Your new email',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
          },
          {
            text: 'Save',
            handler: data => {
              this.fireAuth.updateEmail(data.newEmail).then(() => {
                  this.userProfile.update({email: data.newEmail});
                }, (error) => {
                  console.log(error)
                });;
            }
          }
        ]
      });
      alert.present();
  }

  updatePassword(): any {
    let alert = this.alertCtrl.create({
      title: "Enter Your New Password",
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Your new password',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.fireAuth.updatePassword(data.newPassword)
          }
        }
      ]
    });
    alert.present();
  }
}