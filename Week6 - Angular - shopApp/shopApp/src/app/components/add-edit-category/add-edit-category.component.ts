import { Component, OnInit, Input } from '@angular/core';
import { Icategory } from '../../models/category';
import { TableService } from '../../services/table.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
  
  categoryName: string;
  parent: string;
  categoryDescription: string;
  item = {} as Icategory;
  headingState: string;
  buttonState: string;
  categoryId: number;
  categoryNames: string [];

  public constructor(private tableService: TableService, 
                    private route: Router,
                    private activatedRoute: ActivatedRoute) 
                    { }

  ngOnInit() {
    // Getting id from route parameters => /edit/id
    this.activatedRoute.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');   // + converts to number
      this.getCategoryNames(id);
      this.setCategoryForm(id);
    })
  }

  getCategoryNames(id){
    this.tableService.getCategories()
      .subscribe(categories => {
        this.categoryNames = categories.filter(x => x.id != id).map(category => category.name);
        console.log(this.categoryNames);
      })
  }

// Setting add/edit form depending on the passed id
setCategoryForm(id: number){
  this.categoryId = id;
    // route edit/0 => set form to ADD
    if(id === 0){
      this.headingState = "Add category";
      this.buttonState = "add";
    }
    // else set form to EDIT
    else {
      this.headingState = "Edit category";
      this.buttonState = "update";
      this.tableService.getCategory(id)
        .subscribe((res: Icategory) => {
          this.populateFormData(res);
      })
    }
  }
  // add/update on click
  addUpdate(){
    this.getFormData(this.item);
    // ADD new category
    if(this.buttonState == "add"){
      this.tableService.addCategory(this.item)
        .subscribe(res => {
          this.route.navigate(['/categories']);
        })
    }   
    // UPDATE category
    else {
      this.tableService.updateCategory(this.categoryId, this.item)
        .subscribe(res => {
          this.route.navigate(['/categories']);
        })
    }
  }

  getFormData(category){
    category.name = this.categoryName;
    category.parentCategoryName = this.parent;
    category.description = this.categoryDescription;
  }

  populateFormData(categoryData){
    this.item = categoryData;
    this.categoryName = this.item.name;
    this.parent = this.item.parentCategoryName;
    this.categoryDescription = this.item.description;
  }

}
