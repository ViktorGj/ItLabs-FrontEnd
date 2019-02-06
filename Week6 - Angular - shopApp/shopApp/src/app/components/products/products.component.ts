import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Iproduct } from 'src/app/models/product';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TableService } from '../../services/table.service';
import { Icategory } from '../../models/category';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService,
              private modalService: BsModalService,
              private tableService: TableService,
              private toastrService: ToastrService) { }

  productsList: Iproduct [];
  categories: Icategory [];
  productId: number;
  modalRef: BsModalRef;
  searchTerm: string;

  getCategories(){
    this.tableService.getCategories()
      .subscribe((data:Icategory[]) => {
        this.categories = data;
      })
  }

   getData() {
    this.productsService.getProducts().subscribe(data => {
      this.productsList = data;
    })
  }

  // Search product by name
  checkIfEmpty(searchTerm: string) {
    searchTerm = this.searchTerm;
    this.productsService.searchProduct(searchTerm)
      .subscribe((res: Iproduct[]) => {
        if (searchTerm == ""){
          this.getData();
        }
        else {
          this.productsList = res;
        }
      })
  }

  deleteData (id) {
    this.productsService.deleteProduct(id)
      .subscribe(res => {
        this.getData();
      })
  }

  deleteModal(template: TemplateRef<any>, id) {
    this.productId = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(id): void {
    id = this.productId;
    this.deleteData(id);
    this.modalRef.hide();
    this.toastrService.success("Product successfully deleted");
  }
 
  decline(): void {
    this.modalRef.hide();
  }

  ngOnInit() {
    this.getData();
    this.getCategories();
  }

}
