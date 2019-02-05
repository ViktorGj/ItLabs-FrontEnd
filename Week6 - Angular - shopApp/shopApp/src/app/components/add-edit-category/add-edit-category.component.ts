import { Component, OnInit, Input } from '@angular/core';
import { Icategory } from '../../models/category';
import { TableService } from '../../services/table.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
  
  // categoryName: string;
  // parent: string;
  // categoryDescription: string;
  headingState: string;
  buttonState: string;

  category = {} as Icategory;
  categoryId: number;
  categoryNames: string [];

  public constructor(private tableService: TableService, 
                    private route: Router,
                    private activatedRoute: ActivatedRoute,
                    private toastrService: ToastrService) 
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
          this.category = res;
      })
    }
  }
  // add/update on click
  addUpdate(){
    // ADD new category
    if(this.buttonState == "add"){
      this.tableService.addCategory(this.category)
        .subscribe(res => {
          this.route.navigate(['/categories']);
          this.toastrService.success("Category successfully added");
        })
    }   
    // UPDATE category
    else {
      this.tableService.updateCategory(this.categoryId, this.category)
        .subscribe(res => {
          this.route.navigate(['/categories']);
          this.toastrService.success("Category successfully updated");
        })
    }
  }

}
