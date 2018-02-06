import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, AlertController } from 'ionic-angular';
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
  liked = false;
  like_number;
  i;
  function:string;
  // variable for comment task
  comment_list:any;
  comment = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public dataProvider: DataProvider,
    public alertCtrl: AlertController) {

    this.file_id = navParams.get('media').file_id;
    console.log(this.file_id);
    
    this.user_id = JSON.parse(localStorage.getItem('userdata')).user.user_id;
    this.username = JSON.parse(localStorage.getItem('userdata')).user.username;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
    this.showFavourite();
    this.showComment();
    this.function = this.navParams.get('type');
    
  }

  // back to previous page and send back some data
  dismiss() {
    let data = { 'like_number': this.like_number };
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
      //this.liked = false;
      for(let i=0; i<this.like_list.length; i++){
        if(this.user_id == this.like_list[i].user_id){
          this.liked = true; 
          this.like_color = 'primary';
          this.i = i;
         }
       }
     // setting like-number back to homepage
     this.like_number = this.like_list.length;
    });
   
  }

  showComment(){
    this.dataProvider.getCommentsInfo(this.file_id).subscribe(data => {
      this.comment_list = data;
      this.comment_list.map(comment => {
        this.dataProvider.getUserInfo(comment.user_id).subscribe(data => {
          comment.username = data['username'];
        });
      });
    });
  }

  // create favourite 
  createFavourite(){
    if(this.liked){
      this.dataProvider.deleteFavourite(this.file_id).subscribe(data => {
        this.like_color = 'dark';
        this.like_list.splice(this.i, 1);
        this.liked = false;
        // setting like-number back to homepage
        this.like_number = this.like_list.length;
      });
    } else{
      this.dataProvider.createFavourite(this.file_id).subscribe(data => {
        this.like_color = 'primary';
        this.like_list.unshift({username: this.username});
        this.liked = true;
        // setting like-number back to homepage
        this.like_number = this.like_list.length;
      });
    }
  
  }

  // create a comment
  createComment(){
    if(!this.comment.trim()){
      this.showAlert_comment();
    } else{
      this.dataProvider.postComment(this.file_id, this.comment).subscribe(data => {
        this.comment_list.push({username: this.username, comment: this.comment, user_id: this.user_id});
        this.comment = '';
      });
    }

  }

  //delete comment 
  deleteComment(comment_id){
    this.dataProvider.deleteComment(comment_id).subscribe(data => {
      for(let i=0; i<this.comment_list.length; i++){
        if(comment_id == this.comment_list[i].comment_id){
          this.comment_list.splice(i, 1);
        }
      }
    });
  }
 
  showAlert_comment() {
    let alert = this.alertCtrl.create({
      title: 'Empty comment',
      subTitle: 'Please enter your comment',
      buttons: ['OK']
    });
    alert.present();
  }

}
