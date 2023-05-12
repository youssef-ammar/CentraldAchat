import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/model/product';
import { CategoryService } from '../categories/CategoryService/category.service';
import { Category } from 'src/app/model/category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  successMessage!: string;
  errorMessage!: string;

  produitId: number | undefined;
  selectedFile?: File;

  @ViewChild('mymodal') mymodal: any;
  product: Product = new Product();
  products: Product[] = [];
  category_id!: null;
  categorys: Category[] = [];
  listProducts: any;
  listCategory: any;


  form : boolean = false;
   closeResult! : string;

  constructor(private productService : ProductService, private categoryService : CategoryService ,private modalService: NgbModal ) { }

  /*

  ngOnInit(): void {
    this.getAllProducts();;

    this.product = {
      produitId: null,
      nom: null,
      price: null,
      description: null,
      imageUrl:null,
      quantiteEnStock:null,
      category_id: null
    }
  }*/


ngOnInit(): void {
  this.productService.getAllProducts().subscribe({

  next: (res) => {
  this.listProducts = res;
  console.log('get all products success');
  },
  error: (err: any) => {
  console.log('get all products failed');
  }
  });
  this.categoryService.getAllCategory().subscribe({
  next: (res) => {
  this.listCategory = res;
  console.log('get all categories success');
  },
  error: (err: any) => {
  console.log('get all categories failed');
  }

  });
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(res => this.listProducts = res)
  }

  addProduct(p: any){
    this.productService.addProduct(p).subscribe(() => {
      this.getAllProducts();
      this.form = false;
    });
  }
  /*
  addProduct(p: any){
    const categoryId = p.categoryId; // get the category ID from the product object
    delete p.categoryId; // remove the category ID from the product object
    this.productService.addProduct(categoryId, p).subscribe(() => { // pass the category ID and the product object to the service method
      this.getAllProducts();
      this.form = false;
    });
  }*/

  editProduct(product : Product){
    this.productService.editProduct(product).subscribe();
  }
  deleteProduct(idProduct : any){
    this.productService.deleteProduct(idProduct).subscribe(() => this.getAllProducts())
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



  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (this.produitId !== undefined) {
      this.productService.uploadImage(this.produitId, file).subscribe(
        response => {
          console.log('Image uploaded successfully.');
        },
        error => {
          console.log('Error uploading image: ', error);
        }
      );
    } else {
      console.log('Produit ID is undefined.');
    }
  }


  cancel(){
    this.form = false;
  }
}
