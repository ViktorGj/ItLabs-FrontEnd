import { Component, OnInit } from '@angular/core';
import { Icategory } from '../../models/category';
import { TableService } from '../../services/table.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  
  categoryName: string;
  parentCategoryName: string;
  categoryDescription: string;
  item = {} as Icategory;
  

  public constructor(private tableService: TableService, private categoryRouter: Router) { }

  
  addData = () => {
    this.item.name = this.categoryName;
    this.item.parentCategoryName = this.parentCategoryName;
    this.item.description = this.categoryDescription;
    this.tableService.addCategory(this.item)
      .subscribe(res => {
        console.log(res);
      })
      this.categoryRouter.navigate(['/categories']);
  }


  ngOnInit() {
  }

}
