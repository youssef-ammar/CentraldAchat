import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../categories/CategoryService/category.service';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/model/category';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-play-product',
  templateUrl: './play-product.component.html',
  styleUrls: ['./play-product.component.css']
})
export class PlayProductComponent implements OnInit {

  produitId: number | undefined;
  selectedFile?: File;
  searchTerm: string = '';


  @ViewChild('mymodal') mymodal: any;
product: Product=new Product();
products:Product[] = [];
category: Category = new Category();
listProducts : any;
  form : boolean = false;
   closeResult! : string;
   modalRef!: NgbModalRef;
   listCategory:any;




   constructor(private productService : ProductService,private route: ActivatedRoute, private categoryService : CategoryService ,private modalService: NgbModal) {
    // récupérer toutes les catégories
    this.categoryService.getAllCategory().subscribe(res => {
      this.listCategory = res;
    });
  }

  ngOnInit(): void {
    this.produitId = Number(this.route.snapshot.paramMap.get('id'));

    this.getAllProducts();

    this.product = {
      produitId: null,
      nom: null,
      price: null,
      description: null,
      imageUrl:null,
      quantiteEnStock:null,
      category_id: null,
      category:{nom:null,category_id:null,description:null},
    };
  }


/*
  getAllProducts(){
    this.productService.getAllProducts().subscribe(res => this.listProducts = res)
  }*/

  getAllProducts(){
    this.productService.getAllProducts().subscribe(res => {
      this.listProducts = res;
      console.log(res); // afficher la réponse dans la console
    });
  }

  addProduct(p: any){
    this.productService.addProduct(p).subscribe(() => {
      this.getAllProducts();
      this.form = false;
    });
  }


  deleteProduct(produitId: number) {
    if (confirm('Are you sure to delete this category?')) {
      this.productService.deleteProduct(produitId)
        .subscribe(() => {
          this.listProducts = this.listProducts.filter((product: any) => product.produitId == produitId);
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


  editProduct(product: Product) {
    // open modal and set category property
    const modalRef = this.modalService.open(this.mymodal);
    this.product = product;
  }


  openModal(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  saveChanges(): void {
    this.productService.editProduct(this.product)
      .subscribe(() => {
        // Enregistrement réussi, fermer la fenêtre modale
        this.modalRef.close();
        // Rafraîchir la liste des catégories
        this.getAllProducts();
      }, error => {
        // Gérer les erreurs ici
        console.log(error);
      });
      this.modalRef.close();

  }



getCategoryName(categoryId: number): string {
  const category: Category | undefined = this.listCategory.find((c: Category) => c.category_id === categoryId);
  return category ? category.nom : '';
}




selectedProductId: number | undefined;

editProductt(p: Product) {
  this.selectedProductId = p.produitId; // mettez à jour la variable selectedProductId
  this.product = {...p}; // copiez le produit pour éviter de modifier le produit original
  this.modalRef = this.modalService.open(this.mymodal); // utilisez la méthode `open()` au lieu de `show()`
}



onImageSelected(event: any, produitId: number) {
  const file = event.target.files[0];
  this.productService.uploadImage(produitId, file).subscribe(response => {
    console.log(response);
  });
}


get filteredProducts() {
  return this.listProducts.filter((product: { nom: string; }) =>
    product.nom.toLowerCase().includes(this.searchTerm.toLowerCase())

  );
}

}
