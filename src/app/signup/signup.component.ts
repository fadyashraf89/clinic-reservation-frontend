import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserModel} from '../models/user';
import {UserUtils} from "../user.utils";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user = {
    username: '',
    password: '',
    role: 'patient', // Default role
  };

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {
  }

  signUp(name: string, password: string, role: string) {
    this.http.post<UserModel>("http://localhost:3000/signup", this.user).subscribe(
      (data) => {
        console.log('Sign-up successful', data);
        UserUtils.userId = data.id;
        UserUtils.userName = data.username;
        UserUtils.role = data.role;
        console.log(UserUtils.userId)
        // Check the selected role and navigate accordingly
        this.navigateBasedOnRole();
      },
      (error: HttpErrorResponse) => {
        console.error('Sign-up error:', error);

        // Handle specific error cases, e.g., user already exists
        if (error.status === 409) {
          console.log('User already exists');
          // Display an appropriate message to the user
        } else {
          console.log('An unexpected error occurred. Please try again later.');
          // Display a generic error message to the user
        }
      }
    );
  }

  navigateBasedOnRole() {
    if (this.user.role === 'patient') {
      this.router.navigate(['/appointment']); // Route to sign in for patients
    } else if (this.user.role === 'doctor') {
      this.router.navigate(['/timeslot']); // Route to add slot for doctors
    }
  }
}
