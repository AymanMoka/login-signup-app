import { Result } from './../../model/result';
import { AuthService } from './../../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

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

  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) {
    
  }
  
  ngOnInit() {
    this.login = new FormGroup({
      'username':new FormControl('',Validators.required),
      'password':new FormControl('',Validators.required),
    })
  }
  loginUser() {
    this.spinner = true;
    this.errorMessage = '';
    this.authService.loginUser(this.login.value).subscribe(
      (data: Result) => {
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
