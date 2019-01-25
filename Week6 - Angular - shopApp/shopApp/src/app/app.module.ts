import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TableService } from './services/table.service';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesTableComponent,
    ProductsComponent,
    AddCategoryComponent,
    CategoriesTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [TableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
