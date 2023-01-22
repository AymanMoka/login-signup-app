import { AuthService } from './../../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login!: FormGroup;
  errorMessage: string = '';
  spinner: boolean = false;

  constructor(private authService:AuthService) {
    
  }
  
  ngOnInit() {
    this.login = new FormGroup({
      'username':new FormControl('',Validators.required),
      'password':new FormControl('',Validators.required),
    })
  }
  loginUser() {
    this.spinner = true;
    this.authService.loginUser(this.login.value).subscribe(
      data => {
        this.spinner = false;
        console.log(data);
      }, err => {
        this.spinner = false;
        this.errorMessage = err.error.message;
        console.log(err);
      }
    )
}

}
