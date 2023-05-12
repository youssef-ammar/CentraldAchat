import { Component, OnInit,ViewChild ,TemplateRef} from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from '../CategoryService/category.service';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent  implements OnInit {

  @ViewChild('mymodal') mymodal: any;
category: Category= new Category();
  listCategory : any;
  form : boolean = false;
   closeResult! : string;
   modalRef!: NgbModalRef;


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




  deleteCategory(categoryId: number) {
    if (confirm('Are you sure to delete this category?')) {
      this.CategoryService.deleteCategory(categoryId)
        .subscribe(() => {
          this.listCategory = this.listCategory.filter((category: any) => category.categoryId == categoryId);
          console.log('Category deleted successfully');
        });
    }
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

    delete(category: Category) {
      console.log(category);
      this.CategoryService.deleteCategory(category.category_id).subscribe({
        next: (res) => {
          console.log('delete succes', res);
          this.listCategory = this.listCategory.filter((x: Category) => x.category_id != category.category_id);
        },
        error: (err: any) => {
          console.log('delete failed', err);
        }
      });
    }


    editCategory(category: Category) {
      // open modal and set category property
      const modalRef = this.modalService.open(this.mymodal);
      this.category = category;
    }


    openModal(content: any) {
      this.modalRef = this.modalService.open(content);
    }

    saveChanges(): void {
      this.CategoryService.editCategory(this.category)
        .subscribe(() => {
          // Enregistrement réussi, fermer la fenêtre modale
          this.modalRef.close();
          // Rafraîchir la liste des catégories
          this.getAllCategory();
        }, error => {
          // Gérer les erreurs ici
          console.log(error);
        });
        this.modalRef.close();

    }


}
