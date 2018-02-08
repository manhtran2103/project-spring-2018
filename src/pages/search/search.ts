import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CommentPage } from '../comment/comment';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
    listMedia:any;
    numberOfAllMedia;
    show_result = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public dataProvider: DataProvider, 
    public modalCtrl: ModalController ) {
    this.dataProvider.getNumberOfMedia().subscribe(data => {
      this.numberOfAllMedia = data['file_count']['total'];
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  getMedia(e:any){
   this.show_result = false;
   let val = e.target.value;
   if(val && val.trim() != ''){
    this.dataProvider.getSomeMedia(0, this.numberOfAllMedia-1).subscribe(data => {
      this.listMedia = data;
      this.listMedia = this.listMedia.filter((media) => {
        return (media.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      console.log(this.listMedia);
      if(this.listMedia.length == 0){
       this.listMedia[0]= {title: 'No Item Found'};
      }
    }); 
   }
  }

  showSearchedMedia(name){
    this.show_result = true;
    console.log(name);
    this.dataProvider.searchMedia(name).subscribe(data => {
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
