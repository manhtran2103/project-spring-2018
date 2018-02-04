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

  getUserInfo(id){
    const headers = new HttpHeaders().set('x-access-token', `${JSON.parse(localStorage.getItem('userdata'))['token']}`);
    return this.http.get(this.baseUrl+'users/'+id, {headers: headers});
  }
}
