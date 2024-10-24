import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceService } from '../../services/ecommerce.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient, private ecommerceService: EcommerceService) {}

  onSubmit() {
    this.ecommerceService.login({correo: this.username, password: this.password}).subscribe((data:any) => {
      console.log('Login exitoso:', data);
      window.alert('Login exitoso.');
      this.router.navigate(['/']);
    }
    )
  }
}
