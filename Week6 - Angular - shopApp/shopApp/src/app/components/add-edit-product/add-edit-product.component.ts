import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/models/product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {

  constructor(private productsService: ProductsService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }
            
  productId: number;
  headingState: string;
  buttonState: string;
  product = {} as Iproduct;
  productName: string;
  categories: string [];
  manufacturer: string;
  available: boolean;
  shortDescription: string;
  fullDescription: string;


  ngOnInit() {
    this.activeRoute.paramMap.subscribe(routeParameter => {
      const id = +routeParameter.get('id');
      this.setProductsForm(id);
    })
  }

  setProductsForm(id) {
    this.productId = id;
    if(id === 0){
      this.headingState = "Add product";
      this.buttonState = "add";
    }
    else {
      this.headingState = "Edit product";
      this.buttonState = "update";
      this.productsService.getProduct(id)
      .subscribe((res: Iproduct) => {
        this.product = res;
        this.productName = this.product.name;
        this.manufacturer = this.product.manufacturer;
        this.available = this.product.isAvailable;
        this.shortDescription = this.product.shortDescription;
        this.fullDescription = this.product.fullDescription;
      })
    }
  }

  addUpdate(id){
    this.product.name = this.productName;
    this.product.manufacturer = this.manufacturer;
    this.product.isAvailable = this.available;
    this.product.shortDescription = this.shortDescription;
    this.product.fullDescription = this.fullDescription;
    // ADD new category
    if(this.buttonState == "add"){
      this.tableService.addCategory(this.item)
        .subscribe(res => {
          console.log(res);
          this.categoryRouter.navigate(['/categories']);
        })
    }   
    // UPDATE category
    else {
      id = this.categoryId;
      this.tableService.updateCategory(id, this.item)
        .subscribe(res => {
          console.log(res);
          this.categoryRouter.navigate(['/categories']);
        })
    }
  }

}
