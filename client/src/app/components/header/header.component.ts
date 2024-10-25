import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public isLoggedIn: boolean = false;
  public isLoggedInAdmin: boolean = false;

  constructor(private router: Router, private jwtService: JwtService) {}

  public logoutPress(): void {
    localStorage.removeItem('token');
    window.location.reload();
  }

  navigate(page: string) {
    this.router.navigate([`/home/${page}`]);
  }

  isLinkActive(page: string): boolean {
    return this.router.url.includes(`/home/${page}`);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      const tokenDesencripted: any = this.jwtService.decodeToken(token);
      console.log(tokenDesencripted);
      if (tokenDesencripted.rol_usuario == 'admin') {
        this.isLoggedInAdmin = true;
      }
    }
  }
}
