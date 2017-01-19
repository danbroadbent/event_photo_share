import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-photo-uploader',
  templateUrl: 'photo-uploader.html'
})

export class PhotoUploaderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoUploaderPage');
  }

  addPhotos(event) {
    console.log('onChange');
    var files = event.srcElement.files;
    console.log(files);
    var output = document.getElementById("result");
    output.innerHTML = "";   
    for(var i = 0; i< files.length; i++){
        var file = files[i];
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
}
