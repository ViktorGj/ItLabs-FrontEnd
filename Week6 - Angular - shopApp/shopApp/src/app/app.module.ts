import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppComponent } from './app.component';
import { TableService } from './services/table.service';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ProductsComponent,
    AddEditCategoryComponent,
    AddEditProductComponent
  ],
  imports: [
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
    AngularFireStorageModule
  ],
  providers: [TableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
