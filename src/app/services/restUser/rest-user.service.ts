import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {
  public uri:string;
  public user;
  public token;
  public role;
  public username;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI;
  }

  testService(){
    return 'Mensaje enviado desde el servicio.'
  }

  // Helper methods
  getToken(){
    let token = localStorage.getItem('token');
    this.token = (token!= undefined || token != null) ? token : null;
    
    return token;
  }

  getRole(){
    let role = localStorage.getItem('role');
    this.role = (role != undefined || role != null) ? role : null;

    return role;
  }

  getUsername(){
    let username = localStorage.getItem('username');
    this.username = (username != undefined || username != null) ? username : null;
    return username;
  }

  // Queries to the API Rest
  register(user){
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'register',params, this.httpOptions)
    .pipe(map(this.extractData));
  }

  login(user, token){
    user.gettoken = token;
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'login',params,this.httpOptions)
    .pipe(map(this.extractData));
  }

  getUsers(){
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": this.getToken()
    });

    return this.http.get(`${this.uri}getUsers/`, {headers}).pipe(map(this.extractData))
  }

  saveUserByAdmin(user){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": this.getToken()
    });

    return this.http.post(`${this.uri}createUserByAdmin`, params, {headers}).pipe(map(this.extractData));
  }

}
