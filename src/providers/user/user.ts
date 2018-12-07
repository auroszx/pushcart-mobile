import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private endpointUrl: string;

  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
    // this.endpointUrl = 'http://'+ window.location.hostname + ':3000';
    this.endpointUrl = 'http://192.168.43.139:3000';
    console.log(this.endpointUrl);
  }

  login(username, password) {

    const httpOptions = {
      headers: new HttpHeaders({
        //Authorization: token,
        'Content-Type':'application/json'
      })
    };

    let data = {
        username: username,
        password: password
    };

    return this.http.post(this.endpointUrl+'/user/login', JSON.stringify(data), httpOptions);
  }

  signup(username, fullname, email,password) {

    const httpOptions = {
      headers: new HttpHeaders({
        //Authorization: token,
        'Content-Type':'application/json'
      })
    };

    let data = {
        username: username,
        fullname: fullname,
        email: email,
        password: password
    };

    return this.http.post(this.endpointUrl+'/user/create', JSON.stringify(data), httpOptions);
  }

  async getUserData() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': await this.nativeStorage.getItem("token"),
        'Content-Type':'application/json'
      })
    };

    return this.http.get(this.endpointUrl+'/user/me', httpOptions);
  }

  async getOtherUser(user_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': await this.nativeStorage.getItem("token"),
        'Content-Type':'application/json'
      })
    };

    return this.http.get(this.endpointUrl+'/user/'+user_id, httpOptions);
  }

  async deleteUser() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': await this.nativeStorage.getItem("token"),
        'Content-Type':'application/json'
      })
    };

    return this.http.delete(this.endpointUrl+'/user/delete', httpOptions);

  }

  async updateUser(username, fullname, email, password) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': await this.nativeStorage.getItem("token"),
        'Content-Type':'application/json'
      })
    };

    let data = {
        username: username,
        fullname: fullname,
        email: email,
        password: password
    };

    return this.http.put(this.endpointUrl+'/user/update', JSON.stringify(data), httpOptions);
  }


}
