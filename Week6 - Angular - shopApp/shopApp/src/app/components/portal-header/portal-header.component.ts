import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Iproduct } from 'src/app/models/product';
import { PortalService } from '../../services/portal.service'

@Component({
  selector: 'app-portal-header',
  templateUrl: './portal-header.component.html',
  styleUrls: ['./portal-header.component.scss']
})
export class PortalHeaderComponent implements OnInit {

  constructor(private productsService: ProductsService,
              private portalService: PortalService) { }

  @Input() quantity: number;
  productsList: Iproduct[];
  searchWord: string;

  ngOnInit() {
    this.portalService.castProducts.subscribe(products => this.productsList = products);
  }

  getProducts() {
    this.productsService.getProducts()
      .subscribe(data => {
        this.productsList = data;
        console.log(data);
      })
  }

  searchProducts() {
    this.portalService.searchProducts(this.searchWord);
  }

  isEmpty(event){
    if(event == ""){
      this.portalService.searchProducts(event);
    }
  }

}
