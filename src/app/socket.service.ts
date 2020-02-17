import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url:'http://localhost:3000';

  private socket;


  constructor(public http:HttpClient) { 
    //connection is being created
    // that handshake

    console.log("socket is active")

   this.socket = io('http://localhost:3000');
  }

  // events to be listened
public verifyUser = () => {

    return Observable.create((observer)=>{
      this.socket.on('verifyUser', (data)=>{
        observer.next(data)
      });//end socket
    });
}

public emailFound = ()=>{
  return Observable.create((observer)=>{
    this.socket.on('email-found', (emailFound)=>{
      observer.next(emailFound);
    });
  });
}

  public updatedEvent = ()=>{
    return Observable.create((observer)=>{
      this.socket.on('updated-event', (updatedEvent)=>{
        observer.next(updatedEvent)
      })
    })
  }



public allUserLists = ()=>{
  
  return Observable.create((observer)=>{
    this.socket.on('all-user-list', (userList)=>{
      observer.next(userList);
    });
  });
}

public getEventsByUserId = () =>{

    return Observable.create((observer)=>{

      this.socket.on('user-events', (userEvents)=>{
        observer.next(userEvents);
      })
    })
}


public updatedPassword = ()=>{

  return Observable.create((observer)=>{

    this.socket.on('passUpdated', (userData)=>{
      observer.next(userData);
    })
  })
}

public otpVerified = ()=>{

  return Observable.create((observer)=>{
    this.socket.on('otp-verified', (otpp)=>{
      observer.next(otpp)
  })
 
  
  })
}
public disconnectSocket = ()=>{

    return Observable.create((observer)=> {
      
      this.socket.on("disconnect", ()=> {
        observer.next();
      });
    });
}

/*===================================================================================================
  ===================================================================================================
  -=================================================================================================*/
  //events to be emitted
public updatePassword = (data)=>{

  this.socket.emit('updatePass', data)
}

  public verifyOTP = (otp)=>{

    this.socket.emit('verify-otp', otp);
  }


  public setUser = (authToken)=>{

    this.socket.emit("set-user", authToken);

  }

  public deleteEvent = (data)=>{

    this.socket.emit('delete-event', data)
  }

  public setActiveUser = (activeUser)=>{
    this.socket.emit('active-userid', activeUser)
    
  }

  public editEvent = (data)=>{

    this.socket.emit('edit-event', data)
  }

  public checkEmail = (email)=>{
    this.socket.emit('check-email', email)
  }
  private handleError(err:HttpErrorResponse) {
    let errorMessage = '';

    if(err.error instanceof Error) {
      
      errorMessage = `An error occured : ${err.error.message}`;
    } else {

      errorMessage = `Server reurned code: ${err.status}, error message is: ${err.error.message}`;
    }

    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }

  public exitSocket = () =>{


    this.socket.disconnect();
  
  
  }
}



