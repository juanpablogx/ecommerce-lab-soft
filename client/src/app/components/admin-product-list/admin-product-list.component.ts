import { Component } from '@angular/core';
import { EcommerceService } from '../../services/ecommerce.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrl: './admin-product-list.component.css'
})
export class AdminProductListComponent {
  page!: string;
  title!: string;
  imageRoute!: string;
  products: any;
  allProducts: any;
  searchTerm: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private ecommerceService: EcommerceService) {}

  ngOnInit(): void {
    this.imageRoute = '/img/backgrounds/back4.jpg';
    this.title = 'StepUp';

    this.ecommerceService.getAllProducts().subscribe((data: any) => { 
      console.log(data);  
      this.allProducts = data;
      this.products = data;

    });

  }

  filterProducts(event: any): void {
    this.searchTerm = event.target.value;
    if (!this.searchTerm) {
      // Si el término de búsqueda está vacío, mostrar todos los productos
      this.products = this.allProducts;
    } else {
      // Filtrar los productos por nombre
      this.products = this.allProducts.filter((product: any) =>
        product.nombre_producto
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
