import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Product, ProductAdd } from '../interfaces/product.interface';
import { ImageProduct } from '../interfaces/image-product.interface';
import { ProductInventoryAdd, ProductInventoryEditResult } from '../interfaces/product-inventory.interface';

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

  createProduct(product: ProductAdd) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      authorization: `bearer ${token}`,
    });
    return this.http.post(`${this.url}/productos`, product, { headers });
  }

  createProductInventory(idProduct: number, productInventory: ProductInventoryAdd) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      authorization: `bearer ${token}`,
    });
    const newProductInventory = {
      ...productInventory,
      id_producto: idProduct,
    };
    return this.http.post(`${this.url}/productos-inventario`, newProductInventory, { headers });
  }

  uploadImageProduct(image: File, idProduct: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      authorization: `bearer ${token}`,
    });

    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${this.url}/img_productos/${idProduct}`, formData, { headers });
  }

  editProduct(product: ProductAdd, idProduct: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      authorization: `bearer ${token}`,
    });

    return this.http.put(`${this.url}/productos/${idProduct}`, product, { headers });
  }

  editProductInventory(productInventory: ProductInventoryAdd, idProductInventory: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      authorization: `bearer ${token}`,
    });

    return this.http.put(`${this.url}/productos-inventario/${idProductInventory}`, productInventory, { headers });
  }
}
