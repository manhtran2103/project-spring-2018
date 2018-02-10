import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-update-media',
  templateUrl: 'update-media.html',
})
export class UpdateMediaPage {
  title:string;
  description:string;
  file_id;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public dataProvider: DataProvider) {
    this.file_id = navParams.get('id');
    console.log(this.file_id);
    this.dataProvider.getAMedia(this.file_id).subscribe(data => {
      this.title = data['title'];
      this.description = data['description'];
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateMediaPage');
  }

  updateInfo(){
    this.dataProvider
    .updateMedia(this.file_id,{title: this.title, description: this.description})
    .subscribe(data => {
      this.viewCtrl.dismiss({'msg':'updated'});
    });
  }

  back(){
    this.viewCtrl.dismiss();
  }

}
