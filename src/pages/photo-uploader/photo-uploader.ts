import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PhotoData } from '../../providers/photo-data';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-photo-uploader',
  templateUrl: 'photo-uploader.html'
})

export class PhotoUploaderPage {

  files: any = {};
  eventId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public photoData: PhotoData, public loadingCtrl: LoadingController) {
    this.eventId = this.navParams.get('eventId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoUploaderPage');
  }

  addPhotos(event) {
    console.log('onChange');
    this.files = event.srcElement.files;
    console.log(this.files);
    var output = document.getElementById("result");
    output.innerHTML = "";   
    for(var i = 0; i< this.files.length; i++){
        var file = this.files[i];
        if(file.type.match('image.*')){
          var picReader = new FileReader();
          picReader.onload = function (e : any) {
          var div = document.createElement("div");       
          div.innerHTML = "<img class='thumbnail' src='" + e.target.result + "'" +
                  "title='" + e.target.name + "'/>";
          output.insertBefore(div,null);
        }   
        picReader.readAsDataURL(file);
        this.addUploadButton()
      }  else {
      alert("You can only upload image files.");
      }
    }
  }

  addUploadButton() {
    document.getElementById("uploadButton").removeAttribute("hidden")
  }

  uploadPhotos() {
    let loader = this.loadingCtrl.create({
      content: "Photos Uploading..."
      });
    loader.present();
    for(var i = 0; i< this.files.length; i++){
      var file = this.files[i];
      if( i == this.files.length - 1){
        this.photoData.uploadPhoto(file, this.eventId).then((result) => {
          loader.dismiss()
          this.navCtrl.pop()
        })
      } else {
        this.photoData.uploadPhoto(file, this.eventId) 
      }
    }
  }

}
