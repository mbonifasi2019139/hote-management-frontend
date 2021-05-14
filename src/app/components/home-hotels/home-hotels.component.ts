import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Component({
  selector: 'app-home-hotels',
  templateUrl: './home-hotels.component.html',
  styleUrls: ['./home-hotels.component.css']
})
export class HomeHotelsComponent implements OnInit {

  users: [] = [];

  constructor(private userService: RestUserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe( (resp:any) => {
      this.users = resp.users;
    });
  }

  showUsers(){
    
  }

}
