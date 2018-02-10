import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { UpdateMediaPage } from '../update-media/update-media';
import { YourImagesPage } from '../your-images/your-images';



@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  file_id;
  msg_from_update;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public dataProvider: DataProvider, 
    public viewCtrl: ViewController, 
    public modalCtrl: ModalController) {
    this.file_id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  updateMedia(){
    this.presentCommentModel(this.file_id);
  }

  deleteMedia(){
    console.log(this.file_id);
    this.dataProvider.deleteMedia(this.file_id).subscribe(data => {
      this.viewCtrl.dismiss({'msg': 'deleted'});
    });
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Delete this media?',
      message: 'Are you sure for deleting this media?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteMedia();
          }
        }
      ]
    });
    confirm.present();
  }

  // comment Model
  presentCommentModel(id) {
    let commentModal = this.modalCtrl.create(UpdateMediaPage, {id: id});
    commentModal.onDidDismiss(data => {
      if(data['msg'] == 'updated'){
        this.viewCtrl.dismiss({'msg':'updated'});
      } else{
        this.viewCtrl.dismiss();
      }
    });
    commentModal.present();
  }

}
