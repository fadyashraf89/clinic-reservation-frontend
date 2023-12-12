//signin.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {UserUtils} from "../user.utils";
import {UserModel} from "../models/user";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  user = {
    email: '',
    password: '',
    role: 'patient'
  };

  constructor(private authService: AuthService, private router: Router, private http:HttpClient) {}

  signIn(name:string,password:string) {
    console.log(name);
    console.log(password);
    this.http.post<UserModel>("http://localhost:3000/signin",{
      "username": name,
      "password": password
    }).subscribe((data)=>{
      console.log(data);
      UserUtils.userId = data.id;
      UserUtils.userName = name;
      UserUtils.role = data.role;
      this.navigateBasedOnRole(data.role);
      console.log(UserUtils.userId)
    },(err)=>{
      console.log(err);
    });

  }
  navigateBasedOnRole(role:string) {
    if (role === 'patient') {
      this.router.navigate(['/appointment']); // Route to sign in for patients
    } else if (role === 'doctor') {
      this.router.navigate(['/timeslot']); // Route to add slot for doctors
    }
  }
}
