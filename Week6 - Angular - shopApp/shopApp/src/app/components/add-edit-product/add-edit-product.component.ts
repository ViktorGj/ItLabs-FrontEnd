import { Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/models/product';
import { Icategory } from 'src/app/models/category';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;

  constructor(private productsService: ProductsService,
              private tableService: TableService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private afStorage: AngularFireStorage,
              private toastrService: ToastrService) { }
  
  productId: number;
  headingState: string;
  buttonState: string;
  product = {} as Iproduct;
  categories: Icategory [];

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
          this.product = res;
      })
    }
  }
  // onClick event in product form to save or update product
  addUpdate(){
    // ADD
    if(this.buttonState == "add"){
      this.productsService.addProduct(this.product)
        .subscribe(res => {
          this.router.navigate(['/products']);
          this.toastrService.success("Product successfully added");
        })
    }   
    // UPDATE
    else {
      this.productsService.updateProduct(this.productId, this.product)
        .subscribe(res => {
          this.router.navigate(['/products']);
          this.toastrService.success("Product successfully updated");
        })
    }
  }

// Image upload
  fileUpload(event) {
    const id = Math.random().toString(36).substring(2); // unique identifier
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]); // initiate upload task
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges()
      .pipe(finalize(() => {
          this.ref.getDownloadURL()
            .subscribe(url => {
          this.product.imageUrl = url;  // get and insert imageUrl in product
          console.log(url);
        });
      })
    ).subscribe();
  }
// Remove image
  removeImage(){
    this.product.imageUrl = "";
  }

}
