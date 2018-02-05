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
  file_id;
  listMedia_i;
  like_list:any;
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
            // media.favourites_info.map(favourite => {
            //   this.dataProvider.getUserInfo(favourite.user_id).subscribe(data => {
            //     favourite.username = data['username'];
            //   });
            // });
          });
        });
       console.log(this.listMedia);
      });
    }

  }

 
  presentCommentModel(file_id) {
    let commentModal = this.modalCtrl.create(CommentPage, { file_id: file_id });
    commentModal.onDidDismiss(data => {
      if(data['liked'] == true){
        
        console.log('liked');
      } else{

      }
    });
    commentModal.present();
  }

}
