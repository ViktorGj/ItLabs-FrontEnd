import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/models/product';
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  productsList: Iproduct[];

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts()
      .subscribe(data => {
        this.productsList = data;
        console.log(data);
      })
  }

}
