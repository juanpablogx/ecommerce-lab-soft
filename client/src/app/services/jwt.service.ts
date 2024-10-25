import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

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

  decodeToken(token: string){
    return jwtDecode(token);
  }

 
}
