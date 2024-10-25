import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductInventory } from '../../interfaces/product-inventory.interface';
import { EcommerceService } from '../../services/ecommerce.service';
import { ImageProduct } from '../../interfaces/image-product.interface';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  id_producto!: number;
  productInventory!: ProductInventory;
  selectedImage!: ImageProduct;
  previousImage!: ImageProduct;
  quantity = 1;

  isLoadingProduct = true;
  isLoadingImages = true;
  isError = false;
  errorMessage: any = '';


  constructor(private activatedRoute: ActivatedRoute, private ecommerceService: EcommerceService) {}

  isProduct(productInventory: ProductInventory): productInventory is ProductInventory {
    return (productInventory as ProductInventory).id_producto_inventario !== undefined;
  }

  fetchProduct() {
    this.ecommerceService.productDetails(this.id_producto).subscribe((data: any) => {
      if (this.isProduct(data)) {
        this.isLoadingProduct = false;
        this.productInventory = data;
        this.selectedImage = this.productInventory.imagenes[0];
      } else {
        this.isError = true;
        this.errorMessage = data;
        console.log(this.errorMessage);
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id_producto = parseInt(params.get('id_producto')!, 10);
      this.fetchProduct();
    });
  }

  selectImage(image: ImageProduct, event: MouseEvent) {
    if (event.type === 'click') {
      // Si el evento es un clic, simplemente establece la imagen seleccionada
      this.selectedImage = image;
    } else if (event.type === 'mouseenter') {
      // Si el evento es hover, guarda la imagen actual y establece la nueva imagen seleccionada
      this.previousImage = this.selectedImage;
      this.selectedImage = image;
    } else if (event.type === 'mouseleave') {
      // Si el evento es hover y el mouse deja la imagen, restaura la imagen principal anterior
      this.selectedImage = this.previousImage;
    }
  }

  setQuantity(quantity: number) {
    this.quantity = this.quantity+quantity;
  }

}
