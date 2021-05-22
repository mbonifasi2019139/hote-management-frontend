import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from 'src/app/models/service';
import { CONNECTION } from '../global'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestHotelServiceService {
  public uri:  string;
  public token: string;

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { 
    this.uri = CONNECTION.URI;
  }

  getToken(){
    let token = localStorage.getItem('token');
    this.token = (token!= undefined || token != null) ? token : null;
    
    return token;
  }

  saveServiceHotel(service, hotelId: string){
    let params = JSON.stringify(service);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    console.log(params);

    return this.http.post(`${this.uri}createService/${hotelId}`, params, {headers}).pipe(map(this.extractData));
  }

}
