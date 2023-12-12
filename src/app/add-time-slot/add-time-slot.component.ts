import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserUtils} from "../user.utils";

@Component({
  selector: 'app-add-time-slot',
  templateUrl: './add-time-slot.component.html',
  styleUrls: ['./add-time-slot.component.css'],
})
export class AddTimeSlotComponent {
  timeSlot = {
    date: '', // Provide a default date if needed
    time: '',   // Provide a default time if needed
    availability: true,  // Provide a default availability if needed
    doctorId: 0,         // Provide a default doctorId if needed
  };

  constructor(private  http:HttpClient) {}

  addTimeSlot(date:string,time:string) {

    console.log(date);
    console.log(time);
    // var t = this.convertDateFormat(date);

    console.log(UserUtils.userId)

   this.http.post("http://localhost:3000/slots",{
     "doctor_id": UserUtils.userId,
     "date": date,
     "time": time,
     "availability": true
   }).subscribe(
     (data)=>{
       console.log(data)
     }
   );
  }
}
