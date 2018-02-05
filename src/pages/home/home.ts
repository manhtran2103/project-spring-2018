import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome';
import { DataProvider } from '../../providers/data/data';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { CommentPage } from '../comment/comment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listMedia:any;
  // display = true; 
  // display_like_list = false;
  // display_comment_list = false;
  constructor(
    public navCtrl: NavController, 
    public storage: Storage, 
    public dataProvider: DataProvider, 
    public modalCtrl: ModalController) {
    
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
    });
    commentModal.present();
  }

}
