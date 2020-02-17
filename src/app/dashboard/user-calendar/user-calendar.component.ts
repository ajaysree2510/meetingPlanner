import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject, from } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  collapseAnimation
} from 'angular-calendar';


import { Router } from '@angular/router';
import { AppService} from '../../app.service';
import { SocketService } from '../../socket.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};



@Component({
  selector: 'app-user-calendar',
 // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css'],
  animations: [collapseAnimation],
 // providers:[SocketService]
})
export class UserCalendarComponent implements OnInit{

  public eventDescription:string;
  public eventTitle:string;
  public startDate:Date;
  public endDate:Date;
  public allUserList;
  
   //all users that have signed up

  public authToken:any;
  public userInfo:any;
  public userList:any=[];
  public disconnectedSocket:boolean;

  constructor(private modal:NgbModal, public appService:AppService, public socketService:SocketService, public router:Router, public Cookie:CookieService, public toastr:ToastrService) {  }

  ngOnInit() {
    
    
    this.authToken = this.Cookie.get('authtoken');

    this.checkStatus();

    this.verifyUserConfirmation();
    this.getEventsByUserId()

    
  }
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] =[];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
 
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'xl' });
  }

  /* addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }
 */
  

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  public checkStatus:any =()=>{
    if(this.Cookie.get('authtoken')=== undefined || this.Cookie.get('authtoken') === ''|| this.Cookie.get('authtoken') === null){
      
      this.router.navigate(['/']);

      return false;
    } else {

        return true;
    }
  }// end of checkstatus
  

  public verifyUserConfirmation=()=>{

    this.socketService.verifyUser().subscribe(
      (data)=>{
        this.disconnectedSocket = false;
        
        this.socketService.setUser(this.authToken);

      })
  }
  

  public getEventsByUserId=()=>{
    this.events=[ ];
    let activeUserId =this.Cookie.get('userId')
    this.socketService.setActiveUser(activeUserId);

    this.socketService.getEventsByUserId().subscribe(
      (data)=>{
        console.log(data);
        this.events=data.data;
        this.events.forEach(event => {
          event.start = new Date(event.start);
          event.end = new Date(event.end)
        });
      },
      (err)=>{
        console.log('Some error occured'+err)
      }
    )
    /* this.appService.getEventsByUserID(this.activeUser).subscribe(
      (apiResposne)=>{
        console.log("Start"+this.events);
        console.log(apiResposne)
        this.events = apiResposne.data;
        console.log(this.events)
        this.events.forEach(event => {
          event.start = new Date(event.start);
          event.end = new Date(event.end)
        });
      },
      (err)=>{
        console.log("Some error occured"+err);
      }
    ) */
  }

  openScrollableContent(longContent) {
    this.modal.open(longContent, { scrollable: true });
  }
  
  logout=()=>{
    this.appService.logout(this.Cookie.get('userId')).subscribe((apiResponse)=>{
      if(apiResponse.status===200){
        console.log("Logout Called");
        this.Cookie.delete('userid');
        this.Cookie.delete('authtoken');
        this.Cookie.delete('username');

        this.socketService.exitSocket()
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
        
      }else{
        this.toastr.error(apiResponse.message)
      } 
    }, (err)=>{
      this.toastr.error('Some error occured')
    })
  }
  
}

