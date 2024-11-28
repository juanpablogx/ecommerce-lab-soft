import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { EcommerceService } from '../../services/ecommerce.service';
import { ProductInventoryAdd } from '../../interfaces/product-inventory.interface';

@Component({
  selector: 'app-individual-product-add',
  templateUrl: './individual-product-add.component.html',
  styleUrl: './individual-product-add.component.css'
})
export class IndividualProductAddComponent implements OnInit {

  productForm!: FormGroup;
  productInventoryForm!: FormGroup;

  productsInventory: ProductInventoryAdd[] = [];
  imagesSrc: string[] = [];
  availableSizes = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

  constructor(
    private fb: FormBuilder,
    private ecommerceService: EcommerceService
  ) {}

  ngOnInit(): void {
    this.availableSizes = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

    this.productForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      category: new FormControl('mujer', [Validators.required]),
      price: new FormControl(150000.00, [Validators.required]),
      images: []
    });

    this.productInventoryForm = this.fb.group({
      size: new FormControl('36', [Validators.required]),
      stock: new FormControl(1, [Validators.min(1), Validators.required]),
    });
  }

  onFileImagesChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      // Convertimos FileList a Array para manejarlo más fácilmente
      const imagesArray = Array.from(input.files);
      // Actualizamos el FormControl con los archivos cargados
      this.productForm.get('images')?.setValue(imagesArray);

      this.imagesSrc = [];
      imagesArray.forEach((img) => {
        if (img.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result) {
              this.imagesSrc.push(reader.result as string);
            }
          };
          reader.readAsDataURL(img);
        } else {
          console.warn('Archivo no es una imagen:', img.name);
        }
      });
    }
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
    };

    this.availableSizes.splice(this.availableSizes.indexOf(newProductInventory.talla_inventario), 1);

    this.productsInventory.push(newProductInventory);
    this.productInventoryForm.reset({
      size: this.availableSizes[0],
      stock: 1,
    });

  }

  onDeleteProductInventory(index: number) {
    const deletedProductInventory = this.productsInventory.splice(index, 1)[0];
    this.availableSizes.push(deletedProductInventory.talla_inventario);
    this.availableSizes = this.availableSizes.sort();
  }

  onSelectMainImage(index: number) {
    const mainImage = this.productForm.get('images')?.value[index];
    const mainImageSrc = this.imagesSrc[index];

    this.productForm.get('images')?.setValue([mainImage, ...this.productForm.get('images')?.value.filter((img: File, i: number) => i !== index)]);
    this.imagesSrc = [mainImageSrc, ...this.imagesSrc.filter((img: string, i: number) => i !== index)];
  }

  onSubmitProductForm() {
    const formValue = this.productForm.value;
    if (this.productForm.invalid) {
      alert('Formulario crear producto inválido');
      return;
    }

    console.log(formValue);

    const newProduct = {
      nombre_producto: formValue.name,
      descripcion_producto: formValue.description,
      categoria: formValue.category,
      precio: formValue.price,
    };

    this.ecommerceService.createProduct(newProduct).subscribe((data: any) => {
      console.log(data);
      if (data?.id_producto) {

        this.productsInventory.forEach((productInventory) => {
          this.ecommerceService
            .createProductInventory(data.id_producto, productInventory)
            .subscribe((data) => {
              console.log(data);
            });
        });

        formValue.images.forEach((image: File) => {
          this.ecommerceService.uploadImageProduct(image, data.id_producto).subscribe((data) => {
            console.log(data);
          });
        });
      }
    });
  }

}
