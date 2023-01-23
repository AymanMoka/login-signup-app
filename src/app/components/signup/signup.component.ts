import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {TokenService} from "../../services/token.service";
import { Result } from 'src/app/model/result';

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

  constructor(private authService: AuthService, private router:Router , private  tokenService:TokenService) { }

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
      'photo': new FormControl(''),
    });
  }

  imageUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.signup.get('photo')?.setValue(file);
    }
  }

  register() {
    this.spinner = true;
    const signupFormData = new FormData();
    Object.keys(this.signup.controls).forEach((k => {
      signupFormData.append(k, this.signup.get(k)?.value);
    }))
    this.authService.register(signupFormData).subscribe(
      (data:Result) => {
        this.spinner = false;
        this.tokenService.setToken(data.token);
        this.router.navigate(['/home'])
      }, err => {
        this.spinner = false;
        this.errorMessage = err.error.message;
        console.log(err);
      }
    )
  }
}
