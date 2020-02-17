import 'flatpickr/dist/flatpickr.css';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';



@NgModule({
  declarations: [CalendarComponent, UserCalendarComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),

    CalendarModule.forRoot({
      provide:DateAdapter,
      useFactory:adapterFactory
    })
  ]
})
export class DashboardModule { }
