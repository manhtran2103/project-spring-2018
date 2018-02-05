import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  file_id;
  like_list:any;
  user_id;
  username;
  like_color = 'dark';
  liked;
  i;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public dataProvider: DataProvider) {

    this.file_id = navParams.get('media').file_id;
    console.log(this.file_id);
    this.user_id = JSON.parse(localStorage.getItem('userdata')).user.user_id;
    this.username = JSON.parse(localStorage.getItem('userdata')).user.username;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
    
  }

  // back to previous page and send back some data
  dismiss() {
    let data = { 'liked': this.liked };
    this.viewCtrl.dismiss(data);
  }

  showFavourite(){
    this.dataProvider.getFavouritesInfo(this.file_id).subscribe(data => {
      this.like_list = data;
      this.like_list.map(like => {
        this.dataProvider.getUserInfo(like.user_id).subscribe(data => {
          like.username = data['username'];
        });
      });
      // check favoutite status
      this.liked = false;
      for(let i=0; i<this.like_list.length; i++){
        if(this.user_id == this.like_list[i].user_id){
          this.liked = true; 
          this.like_color = 'primary';
          this.i = i;
         }
       }
    });
   
  }

  // create favourite 
  createFavourite(){
    if(this.liked){
      this.dataProvider.deleteFavourite(this.file_id).subscribe(data => {
        this.like_color = 'dark';
        this.like_list.splice(this.i, 1);
        this.liked = false;
      });
    } else{
      this.dataProvider.createFavourite(this.file_id).subscribe(data => {
        this.like_color = 'primary';
        this.like_list.unshift({username: this.username});
        this.liked = true;
      });
    }
   
  }
 

}
