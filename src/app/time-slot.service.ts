import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeSlotService {
  private baseUrl = 'http://localhost:3000'; // Your Go Lang backend URL

  constructor(private http: HttpClient) {}

  // Function to add a new time slot
  addTimeSlot(date: string, time: string, availability: boolean, doctorId: number): Observable<any> {
    const url = `${this.baseUrl}/slots`; // Adjust the URL to match your API endpoint
    const timeSlotData = {
      date: date, // Replace with your date logic
      time: time, // Replace with your time logic
      availability: availability,
      doctor_id: doctorId,
    };
    return this.http.post(url, timeSlotData);
  }
}
