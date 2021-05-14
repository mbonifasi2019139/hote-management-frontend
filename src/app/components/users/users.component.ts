import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: [] = [];

  constructor(private restUser: RestUserService) { }

  ngOnInit(){
    this.restUser.getUsers().subscribe((resp: any) => {
      console.log(resp);
      this.users = resp.users;
    });
  }

}
