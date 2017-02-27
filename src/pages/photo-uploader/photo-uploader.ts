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
    var output = document.getElementById("output")
    output.innerHTML = ""
    this.files = event.srcElement.files
    console.log(this.files)
    for(var i = 0; i< this.files.length; i++){
      let file = this.files[i]
      if(file.type.match('image.*')){
        // this.showThumbnail(file)
        this.getExifData(file).then((exifData) => {
          this.rotatePhoto(exifData, file, i)
        })
      } else {
        alert("You can only upload image files.");
      }
    }
    this.addUploadButton()
  }

  // showThumbnail(file) {
  //   var output = document.getElementById("output")
  //   var img = document.createElement("img");
  //   output.appendChild(img)
  //   var reader = new FileReader();
  //   reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
  //   reader.readAsDataURL(file);
  // }

  rotatePhoto(exifData, file, i) {
    var output = document.getElementById("output")
    var orientation = exifData.Orientation;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    var thisImage = new Image;
    thisImage.onload = function() {
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
      // this.images[i] = canvas.toDataURL();
      canvas.toBlob(function(blob) {
        var newImg = document.createElement('img')
        newImg.setAttribute("id", `image${i}`)
        var url = URL.createObjectURL(blob);

        newImg.onload = function() {
          // no longer need to read the blob so it's revoked
          URL.revokeObjectURL(url);
        };

        newImg.src = url;
        output.appendChild(newImg);
      });
    }.bind(this)
    thisImage.src = URL.createObjectURL(file);
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
