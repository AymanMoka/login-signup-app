import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  register(user: FormData): Observable<Result>{
    return this.http.post<Result>(`${environment.apiUrl}/register`,user)
  }

  loginUser(user: User): Observable<Result>{
    return this.http.post<Result>(`${environment.apiUrl}/login`, user)
  }
}
