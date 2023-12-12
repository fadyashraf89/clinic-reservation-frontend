import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = 'http://localhost:3000'; // Your Go Lang backend URL

  constructor(private http: HttpClient) {}

  getAvailableSlots(doctorId: number): Observable<any[]> {
    const url = `${this.baseUrl}/slots?doctor_id=${doctorId}`;
    return this.http.get<any[]>(url);
  }

  scheduleAppointment(doctorId: number, slotId: number): Observable<any> {
    const url = `${this.baseUrl}/appointments`;
    const appointmentData = {
      date: '', // Add your date logic here
      time: '', // Add your time logic here
      patient: '', // Add your patient logic here
      slot_id: slotId,
    };
    return this.http.post<any>(url, appointmentData);
  }

  getAppointmentDetails(appointmentId: number): Observable<any> {
    const url = `${this.baseUrl}/appointments/${appointmentId}`;
    return this.http.get<any>(url);
  }

  updateAppointment(appointmentId: number, updatedData: any): Observable<any> {
    const url = `${this.baseUrl}/appointments/${appointmentId}`;
    return this.http.put<any>(url, updatedData);
  }

  cancelAppointment(appointmentId: number): Observable<any> {
    const url = `${this.baseUrl}/appointments/${appointmentId}`;
    return this.http.delete<any>(url);
  }

  getPatientReservations(): Observable<any[]> {
    const url = `${this.baseUrl}/appointments`;
    return this.http.get<any[]>(url);
  }

}
