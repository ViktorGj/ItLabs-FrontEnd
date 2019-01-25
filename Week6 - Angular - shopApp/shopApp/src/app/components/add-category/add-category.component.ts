import { Component, OnInit, Input } from '@angular/core';
import { Icategory } from '../../models/category';
import { TableService } from '../../services/table.service';
import { Router, ActivatedRoute } from '@angular/router';


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
  headingState: string;
  buttonState: string;
  categoryId: number;
  categoryNames: string [];

  public constructor(private tableService: TableService, 
                    private categoryRouter: Router,
                    private _route: ActivatedRoute) 
                    { }

  ngOnInit() {
    // Getting id from route parameters => /edit/id
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');   // + converts to number
      this.tableService.getCategories().subscribe
      this.addUpdateCategory(id);
      debugger;
      this.getCategoryNames();
    })
  }

  getCategoryNames(){
    this.tableService.getCategories()
      .subscribe(categories => {
        this.categoryNames = categories.map(category => category.name);
        console.log(this.categoryNames);
      })
  }

// Setting add/edit form depending on the add/edit event
  addUpdateCategory(id: number){
    // if route is edit/0 => add new category
    // else edit category
    if(id === 0){
      this.headingState = "Add category";
      this.buttonState = "add";
      this.categoryId = id;
    }
    else {
      this.headingState = "Edit category";
      this.buttonState = "update";
      this.categoryId = id;
      this.tableService.getCategory(id)
      .subscribe((res: Icategory) => {
        this.item = res;
        this.categoryName = this.item.name;
        this.parentCategoryName = this.item.parentCategoryName;
        this.categoryDescription = this.item.description;
      })
    }
  }
  // Event on button save/update
  addUpdate(id){
    this.item.name = this.categoryName;
    this.item.parentCategoryName = this.parentCategoryName;
    this.item.description = this.categoryDescription;
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
