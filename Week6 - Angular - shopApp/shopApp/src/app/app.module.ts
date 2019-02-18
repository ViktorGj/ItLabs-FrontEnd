import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// Firebase modules:
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { CommonModule } from '@angular/common';
// Toastr module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// Pagination module
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { TableService } from './services/table.service';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { CategoriesComponent } from './components/categories/categories.component';
// Modal module
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { PortalComponent } from './components/portal/portal.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { PortalHeaderComponent } from './components/portal-header/portal-header.component';
import { PortalFooterComponent } from './components/portal-footer/portal-footer.component';
import { PortalService } from './services/portal.service';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component'

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ProductsComponent,
    AddEditCategoryComponent,
    AddEditProductComponent,
    MenuComponent,
    HeaderComponent,
    PortalComponent,
    ProductViewComponent,
    PortalHeaderComponent,
    PortalFooterComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD-QHF23swRaO4tQKU0BKzONduRv35pkGM",
      authDomain: "shopapp-417ad.firebaseapp.com",
      projectId: "shopapp-417ad",
      storageBucket: "shopapp-417ad.appspot.com"
    }),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [TableService, PortalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
