import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable,throwError } from 'rxjs';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly API_URL = 'http://localhost:2222/Centraledachat';

  constructor(private httpClient: HttpClient) { }

  getAllProducts() {
    return this.httpClient.get(`${this.API_URL}/products/read`)
  }
  getProduct(produitId: number) {
    return this.httpClient.get<Product>(`${this.API_URL}/products/${produitId}`);
  }



  addProduct(product: Product) {
    return this.httpClient.post<any>(`${this.API_URL}/products/AddProductWithCategory/${product.category_id}`, product).pipe(catchError(this.handleError));
  }




  editProduct(product: any) {
    return this.httpClient.put(`${this.API_URL}/products/update/${product.produitId}`, product);
  }



  deleteProduct(produitId: number) {
    return this.httpClient.delete<any>(this.API_URL + '/products/delete/' + produitId).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<any> {
    console.error('An error occurred', errorResponse);
    return throwError(errorResponse.error);
  }
/*
  uploadImage(produitId: number, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.httpClient.post(`${this.API_URL}/products/7/image`, formData);
  }
  */


  uploadImage(produitId: number, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.post(`${this.API_URL}/products/products/${produitId}/image`, formData);
}


}
