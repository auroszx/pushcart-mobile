import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private endpointUrl: string;

  constructor(public http: HttpClient) {
    this.endpointUrl = 'http://'+ window.location.hostname + ':3000';
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

  getUserData() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem("token"),
        'Content-Type':'application/json'
      })
    };

    return this.http.get(this.endpointUrl+'/user/me', httpOptions);
  }

  getOtherUser(user_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem("token"),
        'Content-Type':'application/json'
      })
    };

    return this.http.get(this.endpointUrl+'/user/'+user_id, httpOptions);
  }

  deleteUser() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem("token"),
        'Content-Type':'application/json'
      })
    };

    return this.http.delete(this.endpointUrl+'/user/delete', httpOptions);

  }

  updateUser(username, fullname, email, password) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem("token"),
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
