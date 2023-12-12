import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { UserUtils } from '../user.utils';
import { HttpClient } from '@angular/common/http';
import { Doctors } from '../models/doctors';
import { Slot, Slots } from '../models/slots';
import * as moment from 'moment';
import { Appointments } from '../models/appointments';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css'],
})
export class PatientAppointmentComponent implements OnInit {
  selectedDoctor: number = 0;
  selectedAppointment: number = 0;
  doctors: any[] = [

  ];

  curDocId ="-1"
  availableSlots: any[] = [];
  patientAppointments: any[] = [];
  mySlots:Appointments[] = []
  appointmentDetails: any;
  updatedData: any; // Replace with actual data for updating appointments

  constructor(private appointmentService: AppointmentService, private http: HttpClient) { }

  ngOnInit() {
    this.getAllDoctors(); // Fetch patient's reservations when the component initializes
    this.getMySlots()
  }

  getAvailableSlots(doctor: string) {
    this.curDocId = doctor;
    console.log(doctor);

    this.http.get<Slots>("http://localhost:3000/doctors/" + doctor + "/slots").subscribe(
      (data) => {
        this.availableSlots = data;

      }
    )

  }

  chooseSlot(slot: Slot) {
    console.log("slot: " + slot.id);
    console.log(UserUtils.userId);

    this.http.post<any>("http://localhost:3000/appointments", {
      slot_id: slot.id,
      patient_id: UserUtils.userId
    }).subscribe(
      (data) => {
        console.log(data);
        this.availableSlots = []
        this.doctors=[]

        this.getAllDoctors()
        this.getAvailableSlots(this.curDocId)
        this.getMySlots()
      },
    )

  }

  formatDate(date: string, format: string) {

    let formattedDate = (moment(date)).format(format)

    console.log(formattedDate);

    return formattedDate;

  }
  getAppointmentDetails() {
    if (this.selectedAppointment) {
      this.appointmentService.getAppointmentDetails(this.selectedAppointment).subscribe(
        (details) => {
          this.appointmentDetails = details;
        },
        (error) => {
          // Handle error
          console.error(error);
        }
      );
    }
  }

  updateAppointment() {
    if (this.selectedAppointment && this.updatedData) {
      this.appointmentService.updateAppointment(this.selectedAppointment, this.updatedData).subscribe(
        (response) => {
          // Handle success
          console.log('Appointment updated:', response);
          this.getAppointmentDetails(); // Update appointment details after the change
        },
        (error) => {
          // Handle error
          console.error(error);
        }
      );
    }
  }

  cancelAppointment(appId:number) {
  this.http.delete("http://localhost:3000/appointments/"+appId).subscribe(
    (data)=>{
      console.log(data);
      this.availableSlots = []
      this.doctors=[]
      this.mySlots=[]
      this.getAllDoctors()
      this.getAvailableSlots(this.curDocId)
      this.getMySlots()
    }
  )
  }

  getMySlots() {
   this.http.get<Appointments[]>("http://localhost:3000/appointments/"+UserUtils.userId).subscribe(
    (data)=>{
      this.mySlots = data
      console.log(data);
    }
   )
  }

  getAllDoctors() {
    this.http.get<Doctors>("http://localhost:3000/doctors").subscribe(
      (data) => {
        this.doctors = data
      }
    );
  }
}
