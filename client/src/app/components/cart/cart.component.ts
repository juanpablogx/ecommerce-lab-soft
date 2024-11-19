import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../../services/ecommerce.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  page!: string;
  title!: string;
  imageRoute!: string;
  productsCart: any;
  userID: any;
  priceTotal: any;

  constructor(private ecommerceService: EcommerceService) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    this.ecommerceService.getCartProducts().subscribe((data: any) => {
      console.log(
        data.productosCarrito[0].productoInventario.producto.nombre_producto
      );
      this.productsCart = data.productosCarrito;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice() {
    this.priceTotal = 0;
    for (let i = 0; i < this.productsCart.length; i++) {
      this.priceTotal +=
        this.productsCart[i].productoInventario.producto.precio *
        this.productsCart[i].cantidad;
    }
  }


    

  // constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  // ngOnInit(): void {
  //   this.route.params.subscribe(params => {
  //     this.page = params['page']; // Aquí obtienes el valor del parámetro de ruta
  //     console.log(this.page);
  //     this.title = 'Cart';
  //     this.imageRoute = '../../../assets/img/backgrounds/Background4.jpg';
  //   });
  //   const token:any = localStorage.getItem('token');
  //   const tokenDesencripted:any  = decodeToken(token);
  //   this.userID = tokenDesencripted.user.userID;
  //   this.http.get(`http://localhost:8000/cart/${this.userID}`).subscribe((data: any) => {
  //     this.productsCart = data.filter((product: any) => product.cartStatus === "active");
  //     console.log(this.productsCart)
  //     this.calculateTotalPrice();
  //   });
  // }

  // async calculateTotalPrice(): Promise<void>{
  //   this.priceTotal = 0; // Inicializar priceTotal en 0
  //   for (let i = 0; i < this.productsCart.length; i++) {
  //     this.priceTotal += (this.productsCart[i].price * this.productsCart[i].quantity);
  //   }
  // }

  // pagarProductos() {
  //   const token:any = localStorage.getItem('token');
  //   const tokenDesencripted:any  = decodeToken(token)
  //   this.userID = tokenDesencripted.user.userID;;
  //   this.http.put(`http://localhost:8000/cart/cancel/${this.userID}`, {}).subscribe((data: any) => {
  //     console.log(data);
  //     this.router.navigate([`/order-confirmation`]);
  //   });
  // }

  pagarProductos() {}

  deleteCart(product: any) {
    this.ecommerceService
      .deleteCartProduct(product.id_producto_carrito)
      .subscribe((data: any) => {
        console.log(data);
        
        // Eliminar el producto del carrito
        this.productsCart = this.productsCart.filter(
          (productCart: any) => productCart.id_producto_carrito !== product.id_producto_carrito
        );

        // Calcular el precio total
        this.calculateTotalPrice();
      });
  }

  setQuantity(product: any, i: number) {
    product.cantidad = product.cantidad + i;
  }
}
