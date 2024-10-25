import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcommerceService } from '../../services/ecommerce.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.css',
})
export class MainHomeComponent {
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

    this.route.params.subscribe((params) => {
      this.page = params['page']; // Aquí obtienes el valor del parámetro de ruta
      console.log(this.page);

      if (this.page === 'shop') {
        this.title = 'Shop';
        this.imageRoute = '/img/backgrounds/back4.jpg';

        this.ecommerceService.getAllProducts().subscribe((data: any) => {
          console.log(data);
          this.allProducts = data;
          this.products = data;
        })} else if (this.page === 'hombre') {
          this.title = 'Hombre';
          this.imageRoute = '/img/backgrounds/back1.jpg';
          this.ecommerceService.getProductsByCategory('hombre').subscribe((data: any) => {
            console.log(data);
            this.allProducts = data;
            this.products = data;
          });
        } else if (this.page === 'mujer') {
          this.title = 'Mujer';
          this.imageRoute = '/img/backgrounds/backMujer3.jpg';
          this.ecommerceService.getProductsByCategory('mujer').subscribe((data: any) => {
            console.log(data);
            this.allProducts = data;
            this.products = data;
          });
        }
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
