import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  constructor(public navCtrl: NavController, public app: App, public storage: Storage) {
    
  }
  
  ionViewDidLoad() {
    if(localStorage.getItem('userdata') == null){
      this.navCtrl.setRoot(WelcomePage);
    }

  }

}
