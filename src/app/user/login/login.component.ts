import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:any;
  public password:any;

  constructor(public router:Router, public appService:AppService, public Cookie:CookieService, public toastr:ToastrService) { }

  ngOnInit() {
  }

    goToSignUp(){
      this.router.navigate(['/signup'])
    }


    forgotPassword(){
      this.router.navigate(['/forgotPassword'])
    }

  signInFunction(){

    let data={
      email:this.email,
      password:this.password

    }
    this.appService.loginUser(data).subscribe(
      (apiResponse)=>{
        console.log(apiResponse);
        if(apiResponse.status===200){
          console.log("Login was successful");
          this.Cookie.set('authtoken', apiResponse.data.authToken);
          this.Cookie.set('userId', apiResponse.data.userDetails.userId);
          this.Cookie.set('username', apiResponse.data.userDetails.firstName+' '+apiResponse.data.userDetails.lastName);
          this.appService.setUserInfoToLocalStorage(apiResponse.data.userDetails)
          this.toastr.success('Logged In Successfully')
          if(apiResponse.data.userDetails.auth === 'admin'){
          setTimeout(()=>{
            this.router.navigate(['/dashboard']);
          }, 1000)
        }else{
          setTimeout(()=>{
            console.log(apiResponse.data.userDetails.firstName)
            this.router.navigate(['/user',`${apiResponse.data.userDetails.firstName}${apiResponse.data.userDetails.lastName}`])
          }, 1000)
          
        }
        }
      },
      (err)=>{
        console.log(err);
        if(err.status===500 || err.status === 404){
          console.log("No user details found")
          this.toastr.error("Please enter a valid email id")
        }
        else if(err.status ===400){
          console.log("password didn't match")
          this.toastr.error("Please check your password")
        }
      })
  }

}
