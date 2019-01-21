import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'categories', component: TableComponent },
  { path: 'products', component: ProductsComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})



export class AppRoutingModule { }
