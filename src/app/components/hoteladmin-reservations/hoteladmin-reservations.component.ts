import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { Reservation } from 'src/app/models/reservation';
import { Room } from 'src/app/models/room';
import { User } from 'src/app/models/user';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestReservationService } from 'src/app/services/restReservation/rest-reservation.service';
import { RestRoomService } from 'src/app/services/restRoom/rest-room.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-hoteladmin-reservations',
  templateUrl: './hoteladmin-reservations.component.html',
  styleUrls: ['./hoteladmin-reservations.component.css']
})
export class HoteladminReservationsComponent implements OnInit {

  reservation: Reservation;
  hotel: Hotel;
  room: Room;
  user: User;
  users: Array<User> = [];
  reservations: Array<Reservation> = [];

  constructor(private restReservation: RestReservationService, private restHotel: RestHotelService, private restUser: RestUserService,
    private datepipe: DatePipe, private restRoom: RestRoomService) { 
    this.user = new User("","","","","","","",[],[],[]);
    this.reservation = new Reservation("","","","",null,null,null,null,[],[]);
    this.hotel = new Hotel("", "", "", "", null, "", "", [], []);
    this.room = new Room("","",null,null);
  }

  ngOnInit(): void {
     this.restHotel.getHotelByHotelAdmin().subscribe((resp: any)=>{
      this.hotel = resp.hotel;
      console.log(resp);
     });
    this.restReservation.getReservations().subscribe((resp:any)=>{
      resp.reservations.forEach(element => {
        var roomId = element.room;
        var userId = element.user;
        this.restRoom.getRoom(roomId).subscribe((resp:any)=>{
          this.room = resp.rooms;
        });
        this.restUser.getUserByHotelAdmin(userId).subscribe((resp:any)=>{
          this.users.push(resp.user);
        });
        this.reservations.push(element);
      });
    })
  }

  showDateInFormat(date): Date{
    date = this.datepipe.transform(date, "dd/MM/yyyy");
    return date;
  }

  setReservationInfo(reservation: Reservation){
    this.reservation = reservation;
    this.restUser.getUserByHotelAdmin(reservation.user).subscribe((resp:any)=>{
      this.user = resp.user;
    })
    this.restRoom.getRoom(reservation.room).subscribe((resp:any)=>{
      this.room = resp.rooms;
    })
  }

  showUsername(id:string){
    var username;
    this.users.forEach(element =>{
      if(element._id == id){
        username = element.username;
      }
    })
    return username;
  }

}
