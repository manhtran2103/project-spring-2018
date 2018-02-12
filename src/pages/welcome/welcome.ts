import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {SignupPage} from '../signup/signup';
import {HomePage} from '../home/home';
import {Storage} from '@ionic/storage';



@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public storage: Storage) {
  }


  signIn(){
    this.navCtrl.push(LoginPage);
  }

  signUp(){
    this.navCtrl.push(SignupPage);
  }

}
