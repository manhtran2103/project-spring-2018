import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CommentPage } from '../comment/comment';

/**
 * Generated class for the YourImagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-your-images',
  templateUrl: 'your-images.html',
})
export class YourImagesPage {
   listMedia:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dataProvider: DataProvider, 
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YourImagesPage');
    this.dataProvider.getYourMedia().subscribe(data => {
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
    });
  }

   // comment Model
   presentCommentModel(media, type) {
    console.log(media);
    let commentModal = this.modalCtrl.create(CommentPage, { media: media, type: type});
    commentModal.onDidDismiss(data => {
     if(data){
      media.like_number = data['like_number'];
      media.comment_number = data['comment_number'];
     }
    });
    commentModal.present();
  }

}
