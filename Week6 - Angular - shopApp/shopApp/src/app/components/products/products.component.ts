import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Iproduct } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService) { }
  productsList: Iproduct []

   getData() {
    this.productsService.getProducts().subscribe(data => {
      data = this.productsList;
    })
  }

  deleteData (id) {
    this.productsService.deleteProduct(id)
      .subscribe(res => {
        this.getData();
      })
  }

  ngOnInit() {
    this.getData();
  }

}
