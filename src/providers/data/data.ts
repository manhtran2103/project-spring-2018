import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataProvider {
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  get_login_data(credentials){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl+"login",credentials, {headers: headers});
  }

  getAllMedia(){
    return this.http.get(this.baseUrl+'media');
  }

  getNumberOfMedia(){
    return this.http.get(this.baseUrl +'media/all');
  }

  getUserInfo(id){
    const headers = new HttpHeaders().set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.get(this.baseUrl+'users/'+id, {headers: headers});
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
}
