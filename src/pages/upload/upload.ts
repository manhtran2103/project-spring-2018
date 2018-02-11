import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  src;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.src = '../../assets/imgs/no-img.png';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  getFile(e){
    console.log(e.target.files[0]);
    //this.readUrlInput(e.target);
  }

  readUrlInput(input){
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.src = e.target['result'];
      }
      reader.readAsDataURL(input.files[0]);
    }
    let fileList: FileList = event.target['files'];  
      let file: File = fileList[0];
      console.log(file);
  }

}
