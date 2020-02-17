import '../../node_modules/flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool

import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Impoted modules
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { CookieService } from 'ngx-cookie-service';
import { SocketService } from './socket.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotfoundComponent } from './notfound/notfound.component';




@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({preventDuplicates:true}),
    AppRoutingModule,
    CalendarModule.forRoot({

      provide:DateAdapter,
      useFactory:adapterFactory
    }),
    UserModule,
    DashboardModule,
    HttpClientModule
  ],
  providers: [AppService, CookieService, SocketService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
