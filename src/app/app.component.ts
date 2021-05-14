import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'hotel-management';

  role = localStorage.getItem('role');

  ngDoCheck(){
    this.role = localStorage.getItem('role');
  }

}
