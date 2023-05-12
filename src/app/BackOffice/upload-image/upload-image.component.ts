import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  produitId: number | undefined;
  selectedFile?: File;

  product: any | null;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.product = null;
  }

  ngOnInit() {
    this.produitId = Number(this.route.snapshot.paramMap.get('id'));
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
}





