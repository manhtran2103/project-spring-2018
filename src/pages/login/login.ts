import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {AlertController} from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
import {Storage} from '@ionic/storage';
import {HomePage} from '../home/home';
import { Events } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http/src/response';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string;
  password:string;
  userdata:any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public dataProvider: DataProvider,
    public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }

  logIn(){
    this.userdata = {
      username: this.username,
      password: this.password
    };
    if(this.username && this.password){
      console.log(this.userdata);
      this.dataProvider.get_login_data(this.userdata).subscribe(data => {
        console.log(data);
        localStorage.setItem('userdata', JSON.stringify(data));
        this.events.publish('logged in', data['user']);
        this.navCtrl.setRoot(HomePage);
      }, (err: HttpErrorResponse) =>{
        if(err.error.message.includes('bad username')){
          this.showAlert_wrongUsername();
        }
        if(err.error.message.includes('bad password')){
          this.showAlert_wrongPassword();
        }
      });
    } else{
      this.showAlert_logIn();
    }
  }

  signUp_page(){
    this.navCtrl.push(SignupPage);
  }

  showAlert_logIn() {
    let alert = this.alertCtrl.create({
      title: 'Invalid info',
      subTitle: 'Check your User Name and Password',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlert_wrongUsername() {
    let alert = this.alertCtrl.create({
      title: 'Wrong user name',
      subTitle: 'Check your User Name',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlert_wrongPassword() {
    let alert = this.alertCtrl.create({
      title: 'Wrong password',
      subTitle: 'Check your Password',
      buttons: ['OK']
    });
    alert.present();
  }

}
