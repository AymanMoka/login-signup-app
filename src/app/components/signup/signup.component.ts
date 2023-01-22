import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signup!: FormGroup;
  errorMessage: string = '';
  spinner: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.formInit();
  }
  formInit() {
    this.signup = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'repeatPassword': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
    });
  }

  register() {
    this.spinner = true;
    this.authService.register(this.signup.value).subscribe(
      (data) => {
        this.spinner = false;
        console.log(data);
      }, err => {
        this.spinner = false;
        this.errorMessage = err.error.message;
        console.log(err);
      }
    )
    console.log(this.signup.value);
  }
}
