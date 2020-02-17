import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { CalendarComponent } from './dashboard/calendar/calendar.component';
import { UserCalendarComponent } from './dashboard/user-calendar/user-calendar.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'signup', component:SignupComponent },
  { path:'dashboard', component:CalendarComponent },
  { path:'user/:firstName', component:UserCalendarComponent},
  { path:'forgotPassword', component:ForgotPasswordComponent},
 // { path:'*', component:LoginComponent },
  { path:'', redirectTo:'/login', pathMatch:'full' },
  { path:'**', component:LoginComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
