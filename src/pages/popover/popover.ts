import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { UpdateMediaPage } from '../update-media/update-media';



@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  file_id;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public dataProvider: DataProvider, 
    public viewCtrl: ViewController) {
    this.file_id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  updateMedia(){
    this.navCtrl.push(UpdateMediaPage);
    this.viewCtrl.dismiss();
  }

  deleteMedia(){
    console.log(this.file_id);
    this.dataProvider.deleteMedia(this.file_id).subscribe(data => {
      this.viewCtrl.dismiss({msg: 'deleted'});
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

}
