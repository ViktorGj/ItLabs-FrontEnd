import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

const routes: Routes = [
  
  { path: '', redirectTo: '/categories', pathMatch: 'full'},
  { path: 'categories',
    children: [
      { path: '', component: CategoriesComponent},
      { path: 'edit/:id', component: AddEditCategoryComponent }
    ] 
  },
  { path: 'products',
    children: [
      { path: '', component: ProductsComponent},
      { path: 'edit/:id', component: AddEditProductComponent }
    ]
  },

];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
