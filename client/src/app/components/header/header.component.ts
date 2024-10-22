import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public isLoggedIn: boolean = false;
  public isLoggedInAdmin: boolean = false;

  constructor(private router: Router) {}

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
    // if (token) {
    //   this.isLoggedIn = true;
    //   const tokenDesencripted: any = decodeToken(token);
    //   console.log(tokenDesencripted);
    //   if (tokenDesencripted.user.role == 'admin') {
    //     this.isLoggedInAdmin = true;
    //   }
    // }
  }
}
