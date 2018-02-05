import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {
  items = [];
  stop = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for (var i = 0; i < 20; i++) {
      this.items.push( this.items.length );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
  }


  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        this.items.push( this.items.length );
        if(this.items.length == 97){
         this.stop = false;
         break;
        }
      }
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
