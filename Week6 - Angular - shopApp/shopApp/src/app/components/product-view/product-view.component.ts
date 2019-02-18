import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
              private productsService: ProductsService
              ) { }

  product = {} as Iproduct;
  cartQuantity: number;

  ngOnInit() {
    this.viewProduct();
    this.cartQuantity = localStorage.length;
  }

  viewProduct() {
    const id = +this.activeRoute.snapshot.params.id;
    this.productsService.getProduct(id)
    .subscribe((res: Iproduct) => {
      this.product = res;
    });
  }


}
