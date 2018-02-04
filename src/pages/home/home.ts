import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listMedia:any;

  constructor(
    public navCtrl: NavController, 
    public storage: Storage, 
    public dataProvider: DataProvider) {
    
  }
  
  ionViewDidLoad() {
    if(localStorage.getItem('userdata') == null){
      this.navCtrl.setRoot(WelcomePage);
    } else{
      this.dataProvider.getAllMedia().subscribe(data => {
        this.listMedia = data;
        this.listMedia.map(media => {
          media.url = this.dataProvider.baseUrl+'uploads/' + media.filename;
          this.dataProvider.getUserInfo(media.user_id).subscribe(data => {
            media.username = data['username'];
          });
        });
       console.log(this.listMedia);
      });
    }

  }

}
