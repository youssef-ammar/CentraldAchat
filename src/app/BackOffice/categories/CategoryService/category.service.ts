import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Product } from 'src/app/model/product';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  addProduct(product: Product) {
    throw new Error('Method not implemented.');
  }
  readonly API_URL = 'http://localhost:2222/Centraledachat/';
  constructor(private httpClient: HttpClient) { }




  getAllCategory() {
    return this.httpClient.get(`${this.API_URL}Category/readcategory`)
  }

  addCategory(category : any) {
    return this.httpClient.post(`${this.API_URL}Category/createcategory`,category )
  }


  editCategory(category: any) {
    return this.httpClient.put(`${this.API_URL}Category/updatecategory/${category.categoryId}`, category);
  }



deleteCategory(category_id: number) {
    return this.httpClient.delete<any>(this.API_URL + 'Category/deletecategory/' + category_id).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<any> {
    console.error('An error occurred', errorResponse);
    return throwError(errorResponse.error);
  }

  getAllProducts() {
    return this.httpClient.get<Product[]>(`${this.API_URL}products/read`);
  }



}
