import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  userInfo = {user_id: '', username: '', email: ''};
  isEdit=false;
  username:string;
  email:string;
  password:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dataProvider: DataProvider) {
    this.dataProvider.getCurrentUserInfo().subscribe(data => {
      this.userInfo.user_id = data['user_id'];
      this.userInfo.username = data['username'];
      this.userInfo.email = data['email'];
      this.username = this.userInfo.username;
      this.email = this.userInfo.email;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  updateInfo(){
    this.dataProvider.updateUserInfo({
      username: this.username, 
      password: this.password, 
      email: this.email}).subscribe(data => {
        console.log(data);
        this.userInfo.username = this.username;
        this.userInfo.email = this.email;
      });
      this.isEdit = false;
  }

}
