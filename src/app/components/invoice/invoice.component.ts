import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { Invoice } from 'src/app/models/invoice';
import { Room } from 'src/app/models/room';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { RestHotelServiceService } from 'src/app/services/restHotelService/rest-hotel-service.service';
import { RestInvoiceService } from 'src/app/services/restInvoice/rest-invoice.service';
import { RestRoomService } from 'src/app/services/restRoom/rest-room.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  hotel: Hotel;
  room: Room;
  user: User;
  invoice: Invoice;
  role;
  services: Array<Service> = [];
  invoices: Array<Invoice> = [];

  constructor(private restInvoice: RestInvoiceService, private datepipe: DatePipe, private restUser: RestUserService,
    private restRoom: RestRoomService, private restService: RestHotelServiceService) { 
    this.hotel = new Hotel("", "", "", "", null, "", "", [], []);
    this.room = new Room("","",null,null,null,"");
    this.invoice = new Invoice("",null,null,null,"","","",[],"");
    this.user = new User("","","","","","","",[],[],[]);
  }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    console.log(this.role);
    this.invoices = [];
    this.services = [];
    if(this.role == "ROLE_HOTEL"){
      this.hotel = JSON.parse(localStorage.getItem("hotel"));

      this.restInvoice.getInvoicesByHotelAdmin().subscribe((resp:any)=>{
        resp.invoices.forEach(element => {
          this.invoices.push(element);
        });
      })
    }else if(this.role == "ROLE_CLIENT"){
      this.restInvoice.getInvoicesByUser().subscribe((resp:any)=>{
        this.restInvoice.getInvoicesByHotelAdmin().subscribe((resp:any)=>{
          resp.invoices.forEach(element => {
            this.invoices.push(element);
          });
        })
      })
    }
  }

  showDateInFormat(date): Date{
    date = this.datepipe.transform(date, "dd/MM/yyyy");
    return date;
  }

  setInvoiceInfo(invoice: Invoice){
    this.services = [];
    this.invoice = invoice;
    if(this.role == "ROLE_HOTEL"){
      this.restUser.getUserByHotelAdmin(invoice.user).subscribe((resp:any)=>{
        this.user = resp.user;
      })
      this.restRoom.getRoom(invoice.room).subscribe((resp:any)=>{
        this.room = resp.rooms;
      })
      this.restInvoice.getInvoice(invoice._id).subscribe((resp:any)=>{
        resp.invoice.services.forEach(element => {
          this.services.push(element);
        });
      })
    }else if(this.role == "ROLE_CLIENT"){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.restRoom.getRoomByUser(invoice.room).subscribe((resp:any)=>{
        this.room = resp.rooms;
      })
    }
  }

}
