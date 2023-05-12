import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/model/category';
import { CategoryService } from '../CategoryService/category.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent  implements OnInit {

  listCategory : any;
  form : boolean = false;
   category!: Category;
   closeResult! : string;

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

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
