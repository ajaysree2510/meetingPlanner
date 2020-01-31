import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:any;
  public password:any;

  constructor(public router:Router) { }

  ngOnInit() {
  }

    goToSignUp(){
      this.router.navigate(['/signup'])
    }

  signInFunction(){

    let data={
      email:this.email,
      password:this.password

    }
    console.log(data);
  }

}
