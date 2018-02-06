import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome';
import { DataProvider } from '../../providers/data/data';
import { HttpErrorResponse } from '@angular/common/http';
import { CommentPage } from '../comment/comment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listMedia:any;
  moreData = true;
  listMedia_more:any;
  totalMedia:number;
  constructor(
    public navCtrl: NavController, 
    public storage: Storage, 
    public dataProvider: DataProvider, 
    public modalCtrl: ModalController, 
    public toastCtrl: ToastController) {
    
      this.dataProvider.getNumberOfMedia().subscribe(data => {
        console.log(data['file_count']['total']);
        this.totalMedia = data['file_count']['total'];
      });
    
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
          this.dataProvider.getFavouritesInfo(media.file_id).subscribe(data => {
            media.favourites_info = data;
            media.like_number =  media.favourites_info.length;
          });
          this.dataProvider.getCommentsInfo(media.file_id).subscribe(data => {
            media.comments_info = data;
            media.comment_number =  media.comments_info.length;
          });
          this.dataProvider.getRatingsInfo(media.file_id).subscribe(data => {
            media.ratings_info = data;
            let sumRate = 0, avrRate;
            media.ratings_info.map(rate => {
              sumRate += parseInt(rate.rating);
            });
            avrRate = (sumRate/media.ratings_info.length).toFixed(1);
            media.rate = (isNaN(avrRate) ? '' : avrRate);
          });
        });
       console.log(this.listMedia);
      });
    }

  }

  presentCommentModel(media, type) {
    console.log(media);
    let commentModal = this.modalCtrl.create(CommentPage, { media: media, type: type});
    commentModal.onDidDismiss(data => {
     media.like_number = data['like_number'];
     media.comment_number = data['comment_number'];
    });
    commentModal.present();
  }

  doInfinite(infiniteScroll){
    setTimeout(() => {
      this.dataProvider.getSomeMedia(this.listMedia.length, 3).subscribe(data => {
        this.listMedia_more = data;
        this.listMedia_more.map(media => {
          media.url = this.dataProvider.baseUrl+'uploads/' + media.filename;
          this.dataProvider.getUserInfo(media.user_id).subscribe(data => {
            media.username = data['username'];
          });
          this.dataProvider.getFavouritesInfo(media.file_id).subscribe(data => {
            media.favourites_info = data;
            media.like_number =  media.favourites_info.length;
          });
          this.dataProvider.getCommentsInfo(media.file_id).subscribe(data => {
            media.comments_info = data;
            media.comment_number =  media.comments_info.length;
          });
          this.dataProvider.getRatingsInfo(media.file_id).subscribe(data => {
            media.ratings_info = data;
            let sumRate = 0, avrRate;
            media.ratings_info.map(rate => {
              sumRate += parseInt(rate.rating);
            });
            avrRate = (sumRate/media.ratings_info.length).toFixed(1);
            media.rate = (isNaN(avrRate) ? '' : avrRate);
          });
        });
        for(let i=0; i < 3; i++){
          this.listMedia.push(this.listMedia_more[i]);
          if(this.listMedia.length == this.totalMedia){
            this.moreData = false;
            this.presentToast_NoMoreData();
            break;
          }
        }
      });
      infiniteScroll.complete();
    }, 200);
  }

  presentToast_NoMoreData() {
    let toast = this.toastCtrl.create({
      message: 'No more data',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
