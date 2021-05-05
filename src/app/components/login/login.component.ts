import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User;
  token:string;
  userLogged;

  constructor(private restUser:RestUserService) {
    this.user = new User("", "", "", "", "", "", "", [], [], []);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.restUser.login(this.user, 'true').subscribe((res:any)=>{
      if(!res.token){
        alert(res.message);
      }else{
        this.token = res.token;
        if(this.token.length <= 0){
          alert('El token no se generó o capturó de manera correcta.')
        }else{
          this.userLogged = res.userFinded;
          delete this.userLogged.password;
          localStorage.setItem('token', this.token);
          localStorage.setItem('_id', this.userLogged._id);
          localStorage.setItem('role', this.userLogged.role);
          localStorage.setItem('username', this.userLogged.username);
          alert('Usuario logeado exitosamente.');
        }
      }
    },
    (error:any) => console.log(<any>error)
    )
  }

}
