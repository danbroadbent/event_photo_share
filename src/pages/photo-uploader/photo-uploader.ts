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
      for(var i = 0; i< files.length; i++)
      {
          var file = files[i];
          
          //Only pics
          if(!file.type.match('image'))
            continue;
          
          var picReader = new FileReader();
          picReader.onload = function (e : any) {
            var div = document.createElement("div");       
            div.innerHTML = "<img class='thumbnail' src='" + e.target.result + "'" +
                    "title='" + e.target.name + "'/>";
            output.insertBefore(div,null);
        }   
        
          
            //Read the image
          picReader.readAsDataURL(file);
      }   
  }



}
