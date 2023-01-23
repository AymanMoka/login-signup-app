import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  removeToken() {
    localStorage.removeItem('token')
  }
  getPayload(){
    const token = this.getToken();
    let payload ;
    if(token){
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
    }
    return payload.user;
  }
}
