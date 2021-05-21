import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


import { RestUserService } from './services/restUser/rest-user.service';
import { FooterComponent } from './components/footer/footer.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeHotelsComponent } from './components/home-hotels/home-hotels.component';
import { HoteladminReservationsComponent } from './components/hoteladmin-reservations/hoteladmin-reservations.component';
import { DatePipe } from '@angular/common';

// Graphics
import { ChartsModule } from 'ng2-charts';
import { BarGraphicComponent } from './components/bar-graphic/bar-graphic.component';
import { PiechartGraphicComponent } from './components/piechart-graphic/piechart-graphic.component';
import { MyAccountComponent } from './components/myaccount/myaccount.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    UsersComponent,
    SidebarAdminComponent,
    HomeAdminComponent,
    HomeHotelsComponent,
    HoteladminReservationsComponent,
    BarGraphicComponent,
    PiechartGraphicComponent,
    MyAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [RestUserService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
