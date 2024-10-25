import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Product } from '../interfaces/product.interface';
import { ImageProduct } from '../interfaces/image-product.interface';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post(`${this.url}/usuarios/login`, user);
  }

  register(user: User){
    return this.http.post(`${this.url}/usuarios/register`, user);
  }

  productDetails(id_producto: number){
    return this.http.get<Product[] | Object>(`${this.url}/productos-inventario/${id_producto}`);
  }

}
