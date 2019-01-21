import { Component, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';
import { Icategory } from '../models/category';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private tableService: TableService) { }
  tableContent: Icategory [];
  searchTerm: string;
  addedCategory: string;
  item = {} as Icategory;
  

  getData = () => {
    this.tableService.getProducts().subscribe(data => {
      this.tableContent = data;
      console.log(data);
    })
  };

  deleteData = (id) => {
    this.tableService.deleteProduct(id)
      .subscribe(res => {
        this.getData();
      })
  }

  addData = (item) => {
    this.item.name = this.addedCategory;
    this.tableService.addProduct(item)
      .subscribe(res => {
        console.log(res);
        this.getData();
      })
  }

  checkIfEmpty(searchTerm: string) {
    searchTerm = this.searchTerm;
    this.tableService.searchProduct(searchTerm)
      .subscribe((res: Icategory[]) => {
        if (searchTerm == ""){
          this.getData();
        }
        else {
          this.tableContent = res;
        }
      })
  }



  ngOnInit() {
    this.getData();
  }

}
