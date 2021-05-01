import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CONNECTION } from "./../global";

@Injectable({
  providedIn: 'root'
})
export class RestUserService {
  public uri: string;
  public user;
  public token;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http: HttpClient) { 
    this.uri = CONNECTION.URI;
  }

  login(){}

  register(){}

}
