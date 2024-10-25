import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  saveToken(token: string) {  
    localStorage.setItem('token', token);
  }

  getToken() {  
    return localStorage.getItem('token');
  }

 
}
