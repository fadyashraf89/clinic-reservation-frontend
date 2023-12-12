import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { AddTimeSlotComponent } from './add-time-slot/add-time-slot.component';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component'; // Import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    AddTimeSlotComponent,
    PatientAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
