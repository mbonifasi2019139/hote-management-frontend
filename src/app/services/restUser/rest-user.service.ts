import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {
  public uri:string;
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

}
