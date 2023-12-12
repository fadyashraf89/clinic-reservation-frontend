// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AddTimeSlotComponent } from './add-time-slot/add-time-slot.component';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  {path : 'signup', component:SignupComponent},
  { path: 'signin', component: SigninComponent },
  { path: 'timeslot', component: AddTimeSlotComponent },
  { path: 'appointment', component: PatientAppointmentComponent },
  // Update the dynamic route for handling user role during sign-up
  { path: 'signup/:role', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
