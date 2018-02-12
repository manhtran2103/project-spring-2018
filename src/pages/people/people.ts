import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { WelcomePage } from '../welcome/welcome';



@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {
  userList:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dataProvider: DataProvider) {
    if(localStorage.getItem('userdata') == null){
      this.navCtrl.setRoot(WelcomePage);
    } else{
      this.dataProvider.getUserList().subscribe(data => {
        this.userList = data;
      });
    }
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
   
  }

  getMediaOfAUser(user_id){
    
  }

}
