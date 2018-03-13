import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {
  LoadingController, NavController, NavParams,
  Platform,AlertController
} from 'ionic-angular';


import {HttpErrorResponse} from '@angular/common/http';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {Geolocation} from '@ionic-native/geolocation';
import {DomSanitizer} from '@angular/platform-browser';
import {File, FileEntry} from '@ionic-native/file';
import {EditorProvider} from '../../providers/editor/editor';
import { DataProvider } from '../../providers/data/data';
import { YourImagesPage } from '../your-images/your-images';


@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  @ViewChild('myCanvas') canvasRef: ElementRef;
  debug: string;
  imageData: string;
  url: string;
  latLon: any;
  image = this.renderer.createElement('img');
  canvas: any;
  isCanvasEmpty = true;

  loading = this.loadingCtrl.create({
    content: 'Uploading, please wait...',
  });
  title = 'HC title';
  description = 'HC description';
  cameraPic=true;

  src;
  filePic;
  photo=false;
  audio=false;
  video=false;
  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      private camera: Camera,
      private loadingCtrl: LoadingController,
      private dataProvider: DataProvider, private geolocation: Geolocation,
      public sanitizer: DomSanitizer, private file: File,
      private platform: Platform,
      public editorProvider: EditorProvider, private renderer: Renderer2,
      public alertCtrl: AlertController) {
  }

  captureImage() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      /*if (this.platform.is('ios')) {
        this.url = imageData.replace(/^file:\/\//, '');
      } else {
        this.url = imageData;
      }*/
      // show selected image:
      // console.log(this.image);
      this.editorProvider.setElements(this.canvas, this.image);
      this.imageData = imageData;
      this.editorProvider.setFile(this.imageData);

      // get location

     //if image capture success
      this.isCanvasEmpty = false;
    }, (err) => {
      // canvas remains empty
      this.isCanvasEmpty = true;
      // Handle error
      console.error(err);
    });
  }

  upload() {
    //this.loading.present();
    // convert canvas to blob and upload
    this.canvas.toBlob(blob => {
      // create FormData-object
      let formData = new FormData();
      formData.append('file', blob);
      // add title and description to FormData object
      formData.append('title', this.title);
      formData.append('description', this.description);
      // send FormData object to API
      this.dataProvider.uploadMedia(formData).
          subscribe(response => {
            this.navCtrl.setRoot(YourImagesPage);
            console.log(response);
            const fileId = response['file_id'];
            const tagContent = {
              name: 'latLon',
              value: this.latLon,
            };
            const tagAsString = JSON.stringify(tagContent);
            const tag = {
              file_id: fileId,
              tag: tagAsString,

            };
            // this.mediaProvider.postTag(tag, localStorage.getItem('token')).
            //     subscribe(response => {
            //       setTimeout(() => {
            //         this.loading.dismiss();
            //         this.navCtrl.setRoot(FrontPage);
            //       }, 2000);
            //     }, (tagError: HttpErrorResponse) => {
            //       console.log(tagError);
            //       this.loading.dismiss();
            //     });
           
          }, (error: HttpErrorResponse) => {
            console.log(error);
            this.loading.dismiss();
          });
    }, 'image/jpeg', 0.5);

  }


  getFile(e){
    console.log(e.target.files[0]);
    this.filePic = e.target.files[0];
    this.readUrlInput(e.target);
    if(this.filePic.type == 'video/webm' 
    || this.filePic.type == 'video/mp4'
    || this.filePic.type == 'video/ogg'){
      this.video = true;
      this.audio = false;
      this.photo = false;
    } else if(this.filePic.type == 'audio/mp3' 
    || this.filePic.type == 'audio/ogg'
    || this.filePic.type == 'audio/wav'){
      this.video = false;
      this.audio = true;
      this.photo = false;
    } else{
      this.video = false;
      this.audio = false;
      this.photo = true;
    }

  }

  uploadFile(){
    let formData = new FormData();
    formData.append('file', this.filePic);
    formData.append('title', this.title);
    formData.append('description', this.description);
    if(this.filePic && this.title){
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
    // let fileList: FileList = event.target['files'];  
    //   let file1: File = fileList[0];
    //   console.log(file1);
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
    // select element here, when it's ready
    this.canvas = this.canvasRef.nativeElement;
  }

}