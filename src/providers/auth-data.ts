import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class AuthData {
  public fireAuth: any;
  public userProfile: any;

  constructor(public af: AngularFire) {
    af.auth.subscribe( user => {
      if (user) {
        this.fireAuth = user.auth;
        console.log(user);
      }
    })
    this.userProfile = firebase.database().ref('/users');
    
  }
  getUser(){
    return this.fireAuth;
  }

  loginUser(email: string, password: string): any {
    return this.af.auth.login({ email: email, password: password});
  }

  anonymousLogin(){
    return this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    });
  }

  linkAccount(username, email, password): any {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.fireAuth.link(credential).then( user => {
      this.userProfile.child(user.uid).update({
        username: username,
        email: email
      });
    }, error => {
      console.log("There was an error linking the account", error);
    });
  }

  signupUser(username: string, email: string, password: string): any {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
      this.userProfile.child(newUser.uid).set({
          username: username,
          email: email
      });
    });
  }

  resetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.af.auth.logout().then(() => {
      window.location.reload();
    });
  }

}