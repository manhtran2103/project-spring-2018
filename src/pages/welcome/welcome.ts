import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {SignupPage} from '../signup/signup';
import {HomePage} from '../home/home';
import {Storage} from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public storage: Storage) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad WelcomePage');
  //   this.storage.get('userdata').then(val => {
  //     if(val !=null){
  //         this.navCtrl.setRoot(HomePage);
  //         // this.navCtrl.push(HomePage);
  //     }
  //   }).catch(err => {
  //     console.log(err);
  //   });

  // }

  signIn(){
    this.navCtrl.push(LoginPage);
  }

  signUp(){
    this.navCtrl.push(SignupPage);
  }

}
