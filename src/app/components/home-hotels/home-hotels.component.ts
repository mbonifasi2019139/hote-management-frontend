import { Component, OnInit, DoCheck } from '@angular/core';
import { Country } from 'src/app/interfaces/country';
import { Hotel } from 'src/app/models/hotel';
import { User } from 'src/app/models/user';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Component({
  selector: 'app-home-hotels',
  templateUrl: './home-hotels.component.html',
  styleUrls: ['./home-hotels.component.css']
})
export class HomeHotelsComponent implements OnInit, DoCheck {

  countries: Array<Country> = [];
  user: User;
  hotel: Hotel;
  hotels: Array<Hotel> = [];
  usersManagements: [] = [];
  role: String = null;

  constructor(private restHotel: RestHotelService, private restUser: RestUserService) { 
    this.user = new User("", "", "", "", "", "", "", [], [], []);
    this.hotel = new Hotel("", "", "", "", 0, "", "", [], []);
  }

  ngOnInit(): void {
    this.restHotel.getCountries().subscribe( (resp: any) => {
      resp.forEach(country => {
        this.countries.push(country.name)
      });
    });

    this.restUser.getManagements().subscribe((resp: any)=> {
      this.usersManagements = resp.managements;
    });

    this.restHotel.getHotels().subscribe( (resp:any) => {
      resp.users.forEach(hotel => {
        this.hotels.push(hotel);
      });
    });
    this.role = this.restUser.getRole();
  }
  ngDoCheck(){
    this.role = this.restUser.getRole();
  }

  onSubmit(formCHotel){
    this.restHotel.createHotel(this.hotel).subscribe( (resp: any) => {
      if(resp.hotelSaved){
        alert(resp.message);
        formCHotel.reset();
        this.hotel = resp.hotelSaved;
        localStorage.setItem('hotel', JSON.stringify(this.hotel))
      }else {
        alert(resp.message);
      }
    }
    , err => alert(err.error.message) );
  }



}
