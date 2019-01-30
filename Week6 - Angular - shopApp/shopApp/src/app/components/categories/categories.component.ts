import { Component, OnInit, TemplateRef } from '@angular/core';
import { TableService } from '../../services/table.service';
import { Icategory } from '../../models/category';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private tableService: TableService,
              private modalService: BsModalService,
              ) { }
  tableContent: Icategory [];
  searchTerm: string;
  modalRef: BsModalRef;
  categoryId: number;
  
  getData = () => {
    this.tableService.getCategories().subscribe(data => {
      this.tableContent = data;
      console.log(data);
    })
  };

  deleteData = (id) => {
    this.tableService.deleteCategory(id)
      .subscribe(res => {
        this.getData();
      })
  }

  checkIfEmpty(searchTerm: string) {
    searchTerm = this.searchTerm;
    this.tableService.searchCategory(searchTerm)
      .subscribe((res: Icategory[]) => {
        if (searchTerm == ""){
          this.getData();
        }
        else {
          this.tableContent = res;
        }
      })
  }

  deleteModal(template: TemplateRef<any>, id) {
    this.categoryId = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(id): void {
    id = this.categoryId;
    this.deleteData(id);
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }

  // initializing data and routing to categories when first loading page
  ngOnInit() {
    this.getData();
  }
}
