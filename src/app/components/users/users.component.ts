import { Component, OnInit, DoCheck } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, DoCheck {
  user: User;

  users: [] = [];
  roles: Array<String> = ["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_HOTEL"];
  usernameCurrentUser: String = null;

  username: String = null;
  name: String = null;
  lastname: String = null;
  role: String = null

  constructor(private restUser: RestUserService) { 
    this.user = new User("", "", "", "", "", "", "", [], [], []);
  }

  ngOnInit(){
    this.restUser.getUsers().subscribe((resp: any) => {
      console.log(resp);
      this.users = resp.users;
    });
    this.usernameCurrentUser = localStorage.getItem('username');
  }

  ngDoCheck(){
    this.usernameCurrentUser = this.restUser.getUsername();
  }

  setUserDetail(user:any){
    this.username = user.username;
    this.name = user.name;
    this.lastname = user.lastname;
    this.role = user.role;
  }

  onSubmit(saveUserByAdminForm){
    this.restUser.saveUserByAdmin(this.user).subscribe( (resp:any) => {
      if(resp.userSaved){
        alert(resp.message);
        saveUserByAdminForm.reset();
        console.log(resp);
        this.user = resp.userSaved;
        localStorage.setItem('user', JSON.stringify(this.user))
        // this.user = resp.userSaved;
      }else {
        alert(resp.message);
      }
    }, 
    err => alert(err.error.message));
  }

}
