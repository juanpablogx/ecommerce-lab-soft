import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EcommerceService } from '../../services/ecommerce.service';
import { ProductInventoryAdd, ProductInventoryEditResult } from '../../interfaces/product-inventory.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-individual-product-edit',
  templateUrl: './individual-product-edit.component.html',
  styleUrl: './individual-product-edit.component.css'
})
export class IndividualProductEditComponent {

  id_producto!: number;

  productForm!: FormGroup;
  productInventoryForm!: FormGroup;

  newProductsInventory: ProductInventoryAdd[] = [];
  editedProductsInventory: ProductInventoryAdd[] = [];
  imagesSrc: string[] = [];
  availableSizes = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

  constructor(
    private fb: FormBuilder,
    private ecommerceService: EcommerceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.availableSizes = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

    this.productForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      category: new FormControl('mujer', [Validators.required]),
      price: new FormControl(150000.00, [Validators.required])
    });

    this.productInventoryForm = this.fb.group({
      size: new FormControl('36', [Validators.required]),
      stock: new FormControl(1, [Validators.min(1), Validators.required]),
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      this.id_producto = parseInt(params.get('id_producto')!, 10);
      this.fetchProduct();
    });
  }

  fetchProduct() {
    this.ecommerceService.productDetails(this.id_producto).subscribe((data: any) => {
      console.log(data);
      if (data?.id_producto) {
        this.productForm.patchValue({
          name: data.nombre_producto,
          description: data.descripcion_producto,
          category: data.categoria,
          price: data.precio,
        });

        this.editedProductsInventory = data.productoInventario;
        this.editedProductsInventory.forEach((productInventory) => {
          this.availableSizes.splice(this.availableSizes.indexOf(productInventory.talla_inventario), 1);
        });

        this.imagesSrc = data.imagenes.map((img: any) => img.url);
      }
    });
  }

  onAddProductInventory() {
    const formValue = this.productInventoryForm.value;
    if (this.productInventoryForm.invalid) {
      alert('Formulario agregar inventario inválido');
      return;
    }

    const newProductInventory = {
      talla_inventario: formValue.size,
      stock: formValue.stock,
      id_producto_inventario: undefined,
    };

    this.availableSizes.splice(this.availableSizes.indexOf(newProductInventory.talla_inventario), 1);

    this.newProductsInventory.push(newProductInventory);
    this.productInventoryForm.reset({
      size: this.availableSizes[0],
      stock: 1,
    });

  }

  onDeleteProductInventory(index: number) {
    const deletedProductInventory = this.newProductsInventory.splice(index, 1)[0];
    this.availableSizes.push(deletedProductInventory.talla_inventario);
    this.availableSizes = this.availableSizes.sort();
  }

  onModifyQuantityProductInventory(index: number, quantity: number) {
    if (this.editedProductsInventory[index].stock + quantity > 0) {
      this.editedProductsInventory[index].stock += quantity;
    }
  }

  onSelectMainImage(index: number) {
    const mainImageSrc = this.imagesSrc[index];
    this.imagesSrc = [mainImageSrc, ...this.imagesSrc.filter((img: string, i: number) => i !== index)];
  }

  onSubmitProductForm() {
    const formValue = this.productForm.value;
    if (this.productForm.invalid) {
      alert('Formulario crear producto inválido');
      return;
    }

    console.log(formValue);

    const editedProduct = {
      nombre_producto: formValue.name,
      descripcion_producto: formValue.description,
      categoria: formValue.category,
      precio: formValue.price,
    };



    this.ecommerceService.editProduct(editedProduct, this.id_producto).subscribe((data: any) => {
      console.log(data);
      if (data?.id_producto) {

        this.newProductsInventory.forEach((productInventory, index) => {
          this.ecommerceService
            .createProductInventory(data.id_producto, productInventory)
            .subscribe((data) => {
              console.log(data);
              const copy = { ...this.newProductsInventory[index], id_producto_inventario: (data as ProductInventoryEditResult).id_producto_inventario };
              this.newProductsInventory[index] = copy;
            });
        });

        this.editedProductsInventory.forEach((productInventory, index) => {
          const sanitizedProductInventory = {
            talla_inventario: productInventory.talla_inventario,
            stock: productInventory.stock,
          };
          this.ecommerceService
            .editProductInventory(sanitizedProductInventory, productInventory.id_producto_inventario as number)
            .subscribe((data) => {
              console.log(data);
            });
        });

        alert('Producto editado correctamente');

        setTimeout(() => {
          this.editedProductsInventory = this.editedProductsInventory.concat(this.newProductsInventory);
          this.newProductsInventory = [];
        }, 1000);
      } else {
        alert('Error al editar producto');
      }
    });
  }

}
