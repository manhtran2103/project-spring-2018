import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import {MomentModule} from 'angular2-moment';



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
  // variables for comment task
  comment_list:any;
  comment = '';
  comment_number;
  //varibales for rating task
  rating_list:any;
  myRating;

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
    this.showRating();
    this.function = this.navParams.get('type');
    
  }

  // back to previous page and send back some data
  dismiss() {
    this.like_number = this.like_list.length;
    this.comment_number = this.comment_list.length;
    let data = { 
      'like_number': this.like_number, 
      'comment_number': this.comment_number };
    this.viewCtrl.dismiss(data);
    
  }

  //show favourite
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
    //  this.like_number = this.like_list.length;
    });
   
  }

  // show comment
  showComment(){
    this.dataProvider.getCommentsInfo(this.file_id).subscribe(data => {
      this.comment_list = data;
      // this.comment_number = this.comment_list.length;
      this.comment_list.map(comment => {
        this.dataProvider.getUserInfo(comment.user_id).subscribe(data => {
          comment.username = data['username'];
        });
      });
    });
   
  }

  // show rating
  showRating(){
    this.dataProvider.getRatingsInfo(this.file_id).subscribe(data => {
        this.rating_list = data;
        this.rating_list.map(rating => {
          this.dataProvider.getUserInfo(rating.user_id).subscribe(data => {
            rating.username = data['username'];
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
        // this.like_number = this.like_list.length;
      });
    } else{
      this.dataProvider.createFavourite(this.file_id).subscribe(data => {
        this.like_color = 'primary';
        this.like_list.unshift({username: this.username});
        this.liked = true;
        // setting like-number back to homepage
        // this.like_number = this.like_list.length;
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
 // show alert comment
  showAlert_comment() {
    let alert = this.alertCtrl.create({
      title: 'Empty comment',
      subTitle: 'Please enter your comment',
      buttons: ['OK']
    });
    alert.present();
  }
  // show alert rating
  showAlert_rating() {
    let alert = this.alertCtrl.create({
      title: 'Empty Rate',
      subTitle: 'Please enter your rating',
      buttons: ['OK']
    });
    alert.present();
  }
  // show alert rating - (rating already)
  showAlert_rating_already() {
    let alert = this.alertCtrl.create({
      title: 'Thank you',
      subTitle: 'You rated already',
      buttons: ['OK']
    });
    alert.present();
  }

  // create Rating
  createRating(){
    if(this.myRating == null){
      this.showAlert_rating();
    } else{
      this.dataProvider.createRating(this.file_id, this.myRating).subscribe(data=> {
        this.rating_list.push({
          rating:this.myRating, 
          username: this.username, 
          file_id: this.file_id,
          user_id: this.user_id});
      }, (err: HttpErrorResponse) => {
          console.log(err);
          if(err.error.reason.includes('Duplicate')){
            this.showAlert_rating_already();
          }
      });
    }
  }

  // delete rate
  deleteRating(){
    this.dataProvider.deleteRating(this.file_id).subscribe(data => {
      for(let i=0; i<this.rating_list.length; i++){
        if(this.user_id == this.rating_list[i].user_id){
          this.rating_list.splice(i, 1);
        }
      }
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

}
