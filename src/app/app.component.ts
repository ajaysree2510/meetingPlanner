import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 /*  styleUrls: ['./app.component.css'], */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
}
