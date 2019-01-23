import { Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table.service';
import { Icategory } from '../../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  constructor(private tableService: TableService, private _router: Router) { }
  tableContent: Icategory [];
  searchTerm: string;
  
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

  editCategory(id) {
    this._router.navigate([`/addNew/${id}`]);
  }

  ngOnInit() {
    this.getData();
  }
}
