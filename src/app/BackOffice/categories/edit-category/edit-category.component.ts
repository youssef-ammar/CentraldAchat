import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/model/category';
import { CategoryService } from '../CategoryService/category.service';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {


  listCategory : any;
  form : boolean = false;
   @Input()category!: Category;
   closeResult! : string;
  httpClient: any;
  API_URL: any;


  constructor(private CategoryService : CategoryService, private modalService: NgbModal){}

  ngOnInit(): void {
    this.getAllCategory();

    this.category = {
      category_id: null,
      nom: null,
      description: null

    }
  }

  getAllCategory() {
    this.CategoryService.getAllCategory().subscribe( res =>
        this.listCategory = res)



  }


  addCategory(c: any){
    this.CategoryService.addCategory(c).subscribe(() => {
      this.getAllCategory();
      this.form = false;
    });
  }

  editCategory(category : any){
    return this.httpClient.put(`${this.API_URL}/Category/updatecategory/{{CategoryId}}`, category)
  }



  open(mymodal: NgbModalRef, category: Category) {
    const modalRef = this.modalService.open(EditCategoryComponent);
    modalRef.componentInstance.category = category;
    // ...
  }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
    closeForm(){

    }
    cancel(){
      this.form = false;
    }

}
