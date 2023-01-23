import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from "../../services/token.service";
import { User } from "../../model/user";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser !: User;
  constructor(private tokenService: TokenService, private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.tokenService.getPayload();
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['']);
  }

}
