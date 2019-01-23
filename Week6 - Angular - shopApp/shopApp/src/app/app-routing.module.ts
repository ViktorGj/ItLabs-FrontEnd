import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { ProductsComponent } from './components/products/products.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesTableComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'addNew', component: AddCategoryComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})



export class AppRoutingModule { }
