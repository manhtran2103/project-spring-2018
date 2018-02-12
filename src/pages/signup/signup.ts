import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  username:string;
  password:string;
  email:string;
  userdata:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    public storage: Storage, 
    public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.storage.get('userdata').then(val => {
      let data = JSON.parse(val);
      console.log(data.token);
    }).catch(err => {
      console.log(err);
    });
  }

  logIn_page(){
    this.navCtrl.push(LoginPage);
  }

  signUp_submit(){
    this.userdata = {
      username: this.username,
      password: this.password,
      email: this.email
    }
   if(this.username && this.password && this.email){
    console.log(this.userdata);
    this.dataProvider.register(this.userdata).subscribe(data => {
        this.navCtrl.setRoot(LoginPage);
    }, (err:HttpErrorResponse) => {
        console.log(err);
        if(err.error.error.includes('Duplicate')){
          this.showAlert_username();
        }
    });
   } else{
     this.showAlert_signUp();
   }
  }

  showAlert_signUp() {
    let alert = this.alertCtrl.create({
      title: 'Invalid info',
      subTitle: 'Check your User Name, Password and E-Mail',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlert_username() {
    let alert = this.alertCtrl.create({
      title: 'Existed User Name',
      subTitle: 'Please try another user name!',
      buttons: ['OK']
    });
    alert.present();
  }
}
