import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    const url = `http://localhost:8000/login?username=${this.username}&password=${this.password}`;

    this.http.post(url, {}).subscribe((data: any) => {
      console.log(data);
      if (data.token) {
        window.alert("Bienvenido");
        localStorage.setItem('token', JSON.stringify(data.token));
        window.location.reload();
        this.router.navigate(['/home/shop']);
      }
    }, error => {
      window.alert("Usuario o contraseña incorrectos");
      console.log(error);
    });
  }
}
