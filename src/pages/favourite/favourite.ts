import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';


@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html',
})
export class FavouritePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(localStorage.getItem('userdata') == null){
      this.navCtrl.setRoot(WelcomePage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritePage');
    
  }

}
