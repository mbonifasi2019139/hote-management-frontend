import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeHotelsComponent } from './components/home-hotels/home-hotels.component';
import { HoteladminReservationsComponent } from './components/hoteladmin-reservations/hoteladmin-reservations.component';
import { MyAccountComponent } from './components/myaccount/myaccount.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { HotelServiceComponent } from './components/hotel-service/hotel-service.component';

const routes: Routes = [
  /* {
    path: "", component: HomeComponent,
  }, */
  {
    path: "", redirectTo: "home", pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "register", component: RegisterComponent
  },
  {
    path: "home", component: HomeComponent
  },
  {
    path: 'homeHotels',component: HomeHotelsComponent
  },
  {
    path: "homeAdmin", component: HomeAdminComponent
  },
  {
    path: "users", component: UsersComponent
  },
  {
    path: "rooms", component: RoomsComponent
  },
  {
    path: "reservations", component: HoteladminReservationsComponent
  },
  {
    path: "myaccount", component: MyAccountComponent
  },
  {
    path: "hotelService", component: HotelServiceComponent
  },
  {
    path: "**", component: HomeAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
