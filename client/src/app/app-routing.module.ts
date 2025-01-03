import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { IndividualProductAddComponent } from './components/individual-product-add/individual-product-add.component';
import { IndividualProductEditComponent } from './components/individual-product-edit/individual-product-edit.component';
import { AdminProductListComponent } from './components/admin-product-list/admin-product-list.component';

const routes: Routes = [
  { path: '', component: MainHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product-details/:id_producto', component: ProductDetailsComponent },
  { path: 'home/:page', component: MainHomeComponent },
  { path: 'home', component: MainHomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/product-edit-list', component: AdminProductListComponent },
  { path: 'admin/product-add', component: IndividualProductAddComponent },
  {
    path: 'admin/product-edit/:id_producto',
    component: IndividualProductEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
