import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';



@IonicPage()
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
    this.dataProvider.getUserList().subscribe(data => {
      this.userList = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
  }



}
