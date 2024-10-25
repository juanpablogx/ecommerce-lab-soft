import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
<<<<<<< HEAD
import { ProductDetailsComponent } from './components/product-details/product-details.component';
=======
import { MainHomeComponent } from './components/main-home/main-home.component';
>>>>>>> 83abfd820356d2fc21208173fbaa079f1851299b

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
<<<<<<< HEAD
  {path: 'product-details/:id_producto', component: ProductDetailsComponent}
=======
  {path: 'home', component: MainHomeComponent}
>>>>>>> 83abfd820356d2fc21208173fbaa079f1851299b
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
