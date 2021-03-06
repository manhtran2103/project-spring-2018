import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataProvider {
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  // login
  get_login_data(credentials){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl+"login",credentials, {headers: headers});
  }

  // check username
  checkUserName(username){
    return this.http.get(this.baseUrl+'users/username/' + username);
  }

  // register
  register(credentials){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl+'users', credentials, {headers: headers});
  }

  // update User info
  updateUserInfo(credentials){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.put(this.baseUrl+'users', credentials, {headers: headers});
  }

  // get an user info
  getUserInfo(id){
    const headers = new HttpHeaders().set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.get(this.baseUrl+'users/'+id, {headers: headers});
  }

  // get current user info
  getCurrentUserInfo(){
    const headers = new HttpHeaders().set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.get(this.baseUrl+'users/user', {headers: headers});
  }

  // get user list
  getUserList(){
    const headers = new HttpHeaders().set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.get(this.baseUrl+'users', {headers: headers});
  }

  getAllMedia(){
    return this.http.get(this.baseUrl+'media?start=0&limit=5');
  }

  getNumberOfMedia(){
    return this.http.get(this.baseUrl +'media/all');
  }

  getSomeMedia(start, limit){
    return this.http.get(this.baseUrl + `media?start=${start}&limit=${limit}`);
  }

  

  // favourite data
  getFavouritesInfo(id){
    return this.http.get(this.baseUrl+'favourites/file/'+id);
  }

  createFavourite(file_id){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.post(this.baseUrl+'favourites', {file_id: file_id}, {headers:headers});
  }

  deleteFavourite(file_id){
    const headers = new HttpHeaders()
    .set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.delete(this.baseUrl+'favourites/file/' + file_id, {headers:headers});
  }

  // comments data
  getCommentsInfo(id){
    return this.http.get(this.baseUrl+'comments/file/'+id);
  }

  postComment(file_id, comment){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.post(this.baseUrl+'comments', {file_id: file_id, comment: comment}, {headers:headers});
  }

  deleteComment(id){
    const headers = new HttpHeaders()
    .set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.delete(this.baseUrl+'comments/'+id, {headers:headers});
  }

  //rating data
  getRatingsInfo(id){
    return this.http.get(this.baseUrl+'ratings/file/'+id);
  }
  createRating(file_id, rating){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.post(this.baseUrl+'ratings', {file_id: file_id, rating: rating}, {headers:headers});
  }
  deleteRating(file_id){
    const headers = new HttpHeaders()
    .set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.delete(this.baseUrl+'ratings/file/'+file_id, {headers:headers});
  }

  // search media
  searchMedia(name){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.post(this.baseUrl+'media/search', {title: name}, {headers: headers});
  }
  // get your media
  getYourMedia(){
    const headers = new HttpHeaders()
    .set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.get(this.baseUrl + 'media/user', {headers: headers});
  }

  // delete media
  deleteMedia(id){
    const headers = new HttpHeaders()
    .set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.delete(this.baseUrl + 'media/'+ id, {headers: headers});
  }

  //get a media
  getAMedia(id){
    return this.http.get(this.baseUrl + 'media/' + id);
  }

  // update media
  updateMedia(id, data){
    const headers = new HttpHeaders()
    .set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.put(this.baseUrl+'media/'+id, data, {headers: headers});
  }

  // upload media
  uploadMedia(data){
    const headers = new HttpHeaders()
    .set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.post(this.baseUrl+'media', data, {headers:headers});
  }
}
