import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  register(user: FormData): Observable<User>{
    return this.http.post<User>(`${environment.apiUrl}/register`,user)
  }

  loginUser(user: User): Observable<User>{
    return this.http.post<User>(`${environment.apiUrl}/login`, user)
  }
}
