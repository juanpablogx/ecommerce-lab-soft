import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { IndividualProductAddComponent } from './components/individual-product-add/individual-product-add.component';
import { IndividualProductEditComponent } from './components/individual-product-edit/individual-product-edit.component';
import { AdminProductListComponent } from './components/admin-product-list/admin-product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    AppComponent,
    ProductDetailsComponent,
    MainHomeComponent,
    ProductCardComponent,
    CartComponent,
    AdminHomeComponent,
    IndividualProductAddComponent,
    IndividualProductEditComponent,
    AdminProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
