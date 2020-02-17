import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'


@Injectable({
  providedIn: 'root'
})
export class AppService {

  public code;
  

  private _url = "http://localhost:3000";

  constructor(private http:HttpClient, public cookie:CookieService) { }

   countryCodes(){
    
    return('./../countryCodes.json');

  } 

  createNewUser(data):Observable<any>{

    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)
      .set('auth', data.auth)
    
    return this.http.post(`${this._url}`+'/signup', params)

  }// end of create user function

  loginUser(data):Observable<any>{

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)

    return this.http.post(`${this._url}`+'/login', params)
  }

  public getUserInfoFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));
  }// end getUSerFromInfoLocalStorage

  public setUserInfoToLocalStorage = (data)=>{

    localStorage.setItem('userinfo', JSON.stringify(data));
  
  }

  public getAllUserLists():any{

    let response= this.http.get(`${this._url}`+'/allUsers');
    return response;
  }

  public createNewEvent(data):Observable<any>{

    const params = new HttpParams()
      .set('userId', data.userId)
      .set('title', data.title)
      .set('description', data.description)
      .set('start', data.start)
      .set('end', data.end)
      .set('createdBy', data.createdBy)

      return this.http.post(`${this._url}`+'/createEvent', params)
  }


  public getEventsByUserID(userId):any{

    let myResponse=this.http.get(this._url+'/geteventByUserId/'+userId);
    return myResponse;
  }
  
  public logout(userId):any{
    const params =new HttpParams()
    .set('authToken', this.cookie.get('authtoken'))
    .set('userId', userId)

    return this.http.post(`${this._url}/logout`, params)
  }
}
