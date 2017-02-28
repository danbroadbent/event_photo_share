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

  files: any;
  eventId: any;
  blobs = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public photoData: PhotoData, public loadingCtrl: LoadingController) {
    this.eventId = this.navParams.get('eventId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoUploaderPage');
  }

  addPhotos(event) {
    let loader = this.loadingCtrl.create({
      content: "Pre-processing photos..."
    });
    loader.present();
    var output = document.getElementById("output")
    output.innerHTML = ""
    this.files = event.srcElement.files
    console.log(this.files)
    for(var i = 0; i< this.files.length; i++){
      let file = this.files[i]
      if(file.type.match('image.*')){
        if( i == this.files.length - 1){
          this.getExifData(file)
          .then((exifData) => {
            this.rotatePhoto(exifData, file).then(() => {
              this.addUploadButton()
              loader.dismiss()
            })
          })
        } else {
            this.getExifData(file).then((exifData) => {
            this.rotatePhoto(exifData, file)
          })}
      } else {
        alert("You can only upload image files.");
      }
    }
    
  }

  rotatePhoto(exifData, file) {
    return new Promise((resolve, reject) => {
    var output = document.getElementById("output")
    var orientation = exifData.Orientation;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    var thisImage = new Image;
    thisImage.onload = () => {
      canvas.width  = thisImage.width;
      canvas.height = thisImage.height;
      ctx.save();
      var width  = canvas.width;  var styleWidth  = canvas.style.width;
      var height = canvas.height; var styleHeight = canvas.style.height;
      if (orientation) {
        if (orientation > 4) {
          canvas.width  = height; canvas.style.width  = styleHeight;
          canvas.height = width;  canvas.style.height = styleWidth;
        }
        switch (orientation) {
        case 2: ctx.translate(width, 0);     ctx.scale(-1,1); break;
        case 3: ctx.translate(width,height); ctx.rotate(Math.PI); break;
        case 4: ctx.translate(0,height);     ctx.scale(1,-1); break;
        case 5: ctx.rotate(0.5 * Math.PI);   ctx.scale(1,-1); break;
        case 6: ctx.rotate(0.5 * Math.PI);   ctx.translate(0,-height); break;
        case 7: ctx.rotate(0.5 * Math.PI);   ctx.translate(width,-height); ctx.scale(-1,1); break;
        case 8: ctx.rotate(-0.5 * Math.PI);  ctx.translate(-width,0); break;
        }
      }

      ctx.drawImage(thisImage,0,0);
      ctx.restore();
      canvas.toBlob((blob) => {
        var newImg = document.createElement('img')
        var url = URL.createObjectURL(blob);
        newImg.onload = function() {
          URL.revokeObjectURL(url);
        };
        newImg.src = url;
        output.appendChild(newImg);
        this.blobs.push(blob)
        resolve(newImg)
      }, 'image/jpeg');
    }
    thisImage.src = URL.createObjectURL(file)
    })
  }

  getExifData(file) {
    return new Promise(function(resolve, reject) {
        EXIF.getData(file, function() {
          var exifData = EXIF.getAllTags(this);
          resolve(exifData);
        });
    });
  }

  addUploadButton() {
    document.getElementById("uploadButton").removeAttribute("hidden")
  }

  uploadPhotos() {
    let loader = this.loadingCtrl.create({
      content: "Photos Uploading..."
      });
    loader.present();
    for(var i = 0; i< this.blobs.length; i++){
      var blob = this.blobs[i];
      if( i == this.blobs.length - 1){
        this.photoData.uploadPhoto(blob, this.eventId).then((result) => {
          loader.dismiss()
          this.navCtrl.pop()
        })
      } else {
        this.photoData.uploadPhoto(blob, this.eventId) 
      }
    }
  }

}
