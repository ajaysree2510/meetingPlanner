import { Component, OnInit } from '@angular/core';
declare var $:any;
import { SocketService } from './../../socket.service';
import { Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public email;

  public password;
  public otp;

  constructor(public socket:SocketService, public router:Router, public toastr:ToastrService) { }

  ngOnInit() {
  }

  checkEmail(){
    
    this.socket.checkEmail(this.email);
    this.socket.emailFound().subscribe(
      (response)=>{
        if(response){
          $('.hideshowdata').show();
          $('.not-found').hide();
        }
        else{
          $('.not-found').show();
          $('.hideshowdata').hide();
        }
      }
    )
    
  }

  verifyOTP(){

    this.socket.verifyOTP(this.otp)

    this.socket.otpVerified().subscribe(
      (data)=>{
        if(data){
          console.log('Otp verified');
          $('.otpverified').show();
          $('.otp-error').hide()
          $('.enterpassword').show()
        }
        else{
          $('.otp-error').show()
          $('.enterpassword').hide()
        }
      })

  }

  updatePassword(){

    let data={
      email:this.email,
      password:this.password
    }

    this.socket.updatePassword(data);

    this.socket.updatedPassword().subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          console.log('Password was updated successfully')
          console.log(apiResponse)
          this.toastr.success('Password updated successfully');
          setTimeout(()=>{
            this.router.navigate(['/login']);
          },2000)
        }
        (err)=>{
          console.log(err.message)
        }
      }
    )

  }


goToSignUp(){
  this.router.navigate(['/signup'])
}

goToSignIn(){
  this.router.navigate(['/login'])
}

}
