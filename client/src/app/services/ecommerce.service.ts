import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Product } from '../interfaces/product.interface';
import { ImageProduct } from '../interfaces/image-product.interface';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post(`${this.url}/usuarios/login`, user);
  }

  register(user: User) {
    return this.http.post(`${this.url}/usuarios/register`, user);
  }

  getAllProducts() {
    return this.http.get(`${this.url}/productos`);
  }

  getProductsByCategory(category: string) {
    return this.http.get(`${this.url}/productos/categoria/${category}`);
  }

  productDetails(id_producto: number) {
    return this.http.get<Product[] | Object>(
      `${this.url}/productos/${id_producto}`
    );
  }

  addProductToCart(id_product_inventory: number, quantity: number) {
    const token = localStorage.getItem('token');
    console.log(token);

    const headers = new HttpHeaders({
      authorization: `bearer ${token}`, // Incluye el token en el header
    });
    return this.http.post(
      `${this.url}/carrito`,
      {
        id_producto_inventario: id_product_inventory,
        cantidad: quantity,
      },
      { headers }
    );
  }

  getCartProducts(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      authorization: `bearer ${token}`,
    });
    return this.http.get(`${this.url}/carrito`, { headers });
  }

  deleteCartProduct(id: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      authorization: `bearer ${token}`,
    });
    return this.http.delete(`${this.url}/carrito/producto/${id}`, { headers });
  }
}
