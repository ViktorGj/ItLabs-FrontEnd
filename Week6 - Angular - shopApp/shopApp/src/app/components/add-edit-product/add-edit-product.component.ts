import { Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/models/product';
import { Icategory } from 'src/app/models/category';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {

  constructor(private http: HttpClient,
              private productsService: ProductsService,
              private tableService: TableService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }
            
  productId: number;
  headingState: string;
  buttonState: string;
  product = {} as Iproduct;
  productName: string;
  categories: Icategory [];
  selectedCategory: number;
  manufacturer: string;
  available: boolean;
  shortDescription: string;
  fullDescription: string;
  selectedFile: File = null;


  ngOnInit() {
    this.activeRoute.paramMap
      .subscribe(routeParameter => {
        const id = +routeParameter.get('id');
        this.setProductsForm(id);
    })
    this.getCategories();
  }

  getCategories(){
    this.tableService.getCategories()
      .subscribe((data:Icategory[]) => {
        this.categories = data;
      })
  }
  // Set form initially for add or update product:
  setProductsForm(id: number) {
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
          this.populateFormData(res);
      })
    }
  }
  // onClick event in product form to save or update product
  addUpdate(){
    this.getFormData(this.product);
    // ADD
    if(this.buttonState == "add"){
      this.productsService.addProduct(this.product)
        .subscribe(res => {
          this.router.navigate(['/products']);
        })
    }   
    // UPDATE
    else {
      this.productsService.updateProduct(this.productId, this.product)
        .subscribe(res => {
          this.router.navigate(['/products']);
        })
    }
  }
// function - pass data from form to product
  getFormData(product){
    product.name = this.productName;
    product.manufacturer = this.manufacturer;
    product.isAvailable = (this.available != null) ? this.available : false;
    product.shortDescription = this.shortDescription;
    product.fullDescription = this.fullDescription;
    product.categoryId = this.selectedCategory;
  }
// function - populate form to edit product
  populateFormData(productData){
    this.product = productData;
    this.productName = this.product.name;
    this.manufacturer = this.product.manufacturer;
    this.available = this.product.isAvailable;
    this.shortDescription = this.product.shortDescription;
    this.fullDescription = this.product.fullDescription;
    this.selectedCategory = this.product.categoryId;
  }

  onFileSelected(event){
    this.selectedFile = <File> event.target.files[0];
    console.log(event);
    this.onUpload();
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('url', fd)
      .subscribe(res => {
        console.log(res);
      })
  }

}
