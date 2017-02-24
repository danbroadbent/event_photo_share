import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PhotoData } from '../../providers/photo-data';
import { LoadingController } from 'ionic-angular';
import EXIF from 'exif-js';

@Component({
  selector: 'page-photo-uploader',
  templateUrl: 'photo-uploader.html'
})

export class PhotoUploaderPage {

  files: any = {};
  eventId: any;
  images= [];
  metaData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public photoData: PhotoData, public loadingCtrl: LoadingController) {
    this.eventId = this.navParams.get('eventId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoUploaderPage');
  }

  addPhotos(event) {
    this.files = event.srcElement.files
    console.log(this.files)
    this.loadPhotos()
    // this.getMetaData()
    // drawPhotosToCanvas()
  }

  loadPhotos() {
    var output = document.getElementById("output")
    output.innerHTML = ""
    for(var i = 0; i< this.files.length; i++){
      var file = this.files[i];
      if(file.type.match('image.*')){
        var img = document.createElement("img");
        output.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
        this.images[i] = img
        EXIF.getData(file, function () {
        var data = EXIF.getAllTags(this);
        console.log(data)
      })
      }
    }
    console.log(this.images)
  }

  // getMetaData() {
  //       debugger
  //   for(var i = 0; i < this.images.length; i++){
  //     var image = this.images[i]
      
  //   }
  // }

  // addPhotosOld(event) {
  //   this.files = event.srcElement.files;
  //   console.log(this.files);
  //   for(var i = 0; i< this.files.length; i++){
  //     var file = this.files[i];
  //     if(file.type.match('image.*')){
  //       var picReader = new FileReader();
  //       var img = document.createElement("img");
  //       img.classList.add("obj");
  //       img.file = file
  //       picReader.onload = function (e : any) {
  //         img.src = e.target.result
  //         }   
  //       picReader.readAsDataURL(file);
  //       this.addUploadButton()
  //     } else {
  //     alert("You can only upload image files.");
  //     }
  //   }
  // }

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
