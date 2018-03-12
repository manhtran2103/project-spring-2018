import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {
  LoadingController, NavController, NavParams,
  Platform,
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

  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      private camera: Camera,
      private loadingCtrl: LoadingController,
      private dataProvider: DataProvider, private geolocation: Geolocation,
      public sanitizer: DomSanitizer, private file: File,
      private platform: Platform,
      public editorProvider: EditorProvider, private renderer: Renderer2) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
    // select element here, when it's ready
    this.canvas = this.canvasRef.nativeElement;
  }

}