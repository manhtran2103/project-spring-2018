import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { YourImagesPage } from '../your-images/your-images';


@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  src;
  file;
  title:string;
  description='';
  photo=false;
  audio=false;
  video=false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dataProvider: DataProvider, 
    public alertCtrl: AlertController) {
    //this.src = '../../assets/imgs/no-img.png';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  getFile(e){
    console.log(e.target.files[0]);
    this.file = e.target.files[0];
    this.readUrlInput(e.target);
    if(this.file.type == 'video/webm' 
    || this.file.type == 'video/mp4'
    || this.file.type == 'video/ogg'){
      this.video = true;
      this.audio = false;
      this.photo = false;
    } else if(this.file.type == 'audio/mp3' 
    || this.file.type == 'audio/ogg'
    || this.file.type == 'audio/wav'){
      this.video = false;
      this.audio = true;
      this.photo = false;
    } else{
      this.video = false;
      this.audio = false;
      this.photo = true;
    }

  }

  upload(){
    let formData = new FormData();
    formData.append('file', this.file);
    formData.append('title', this.title);
    formData.append('description', this.description);
    if(this.file && this.title){
      this.dataProvider.uploadMedia(formData).subscribe(data => {
        console.log(data);
        this.navCtrl.setRoot(YourImagesPage);
      });
    } else{
      this.showAlert();
    }
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

  // show alert
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Invalid Input',
      subTitle: 'Please check your file and the title',
      buttons: ['OK']
    });
    alert.present();
  }

}
