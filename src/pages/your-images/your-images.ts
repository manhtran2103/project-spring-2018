import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CommentPage } from '../comment/comment';
import { PopoverPage } from '../popover/popover';
import { UploadPage } from '../upload/upload';

@IonicPage()
@Component({
  selector: 'page-your-images',
  templateUrl: 'your-images.html',
})
export class YourImagesPage {
   listMedia:any;
   display_more = false;
   edit_status = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dataProvider: DataProvider, 
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YourImagesPage');
    this.dataProvider.getYourMedia().subscribe(data => {
      this.listMedia = data;
      this.listMedia.reverse();
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

  // show popover
  presentPopover(myEvent, id) {
    let popover = this.popoverCtrl.create(PopoverPage, {id: id});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      if(data){
        if(data['msg'] == 'deleted'){
          for(let i=0; i < this.listMedia.length; i++){
            if(id == this.listMedia[i].file_id){
              this.listMedia.splice(i, 1);
            }
          }
        } if(data['msg'] == 'updated'){
          for(let i=0; i < this.listMedia.length; i++){
            if(id == this.listMedia[i].file_id){
              this.dataProvider.getAMedia(id).subscribe(data => {
                this.listMedia[i]['title'] = data['title'];
                this.listMedia[i]['description'] = data['description'];
              });
            }
          }
        }
      }
    });
  }

  upload(){
    this.navCtrl.push(UploadPage);
  }

}
