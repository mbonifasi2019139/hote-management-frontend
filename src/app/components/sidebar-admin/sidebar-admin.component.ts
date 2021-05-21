import { Component, OnInit, DoCheck } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit, DoCheck {

  token: String = null;
  role: String = null;
  username: String = null || "";

  constructor(private restUser: RestUserService, private router: Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username')
  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.role = this.restUser.getRole();
    this.username = localStorage.getItem('username')
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('');
    console.log(`token: ${localStorage.getItem('token')}`);
  }


}
