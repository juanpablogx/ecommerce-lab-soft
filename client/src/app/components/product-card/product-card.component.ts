import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: any;
  @Input() edit: boolean = false;
  public isLoggedIn: boolean = false;
  public isLoggedInAdmin: boolean = false;
  
  constructor(private router: Router, private http: HttpClient) {}

  showMore() {
    this.router.navigate([`/product-details/${this.product.id_producto}`]);
  }

  editProduct() {
    this.router.navigate([`admin/product-edit/${this.product.id_producto}`]);
  }

  userID() {
    // const token:any = localStorage.getItem('token');
    // if (!token) {
    //   return null;
    // }
    // const tokenDesencripted:any  = decodeToken(token)
    // return tokenDesencripted.user.userID;
    return 1;
  }

  addToCart() {
    const user_id = this.userID();
    if (!user_id) {
      this.router.navigate(['/login']);
      return;
    }
    const productID = this.product.productID;
    const quantity = 1;
    this.http.post<any>(`http://localhost:8000/cart/newProduct/${user_id}?productID=${productID}&quantity=${quantity}`, {})
      .subscribe(
        (response) => {
          console.log('Producto añadido al carrito:', response);
          this.router.navigate([`/cart`]);
        },
        error => {
          console.error('Error al añadir el producto al carrito:', error);
          
        }
      );
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    // if (token){
    //   this.isLoggedIn = true;
    //   const tokenDesencripted:any  = decodeToken(token)
    //   console.log(tokenDesencripted)
    //   if (tokenDesencripted.user.role == 'admin'){
    //     this.isLoggedInAdmin = true;
    //   }
      
    // }
  }
}
