import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServiceApresVente } from '../model/service-apres-vent';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApresVentService {

  private url ='serviceRequest/';
  constructor(private httpClient: HttpClient) { }

  addServiceApresVente(apresVente:ServiceApresVente){
    return this.httpClient.post<any>(this.url+'add',apresVente)
          .pipe(catchError(this.handleError));

  }

  updateServiceApresVente(apresVente:ServiceApresVente){
    console.log('service', apresVente);
    return this.httpClient.put<any>(this.url+'update',apresVente)
          .pipe(catchError(this.handleError));

  }

  getAllServiceApresVente(){
    return this.httpClient.get<any>(this.url+'load')
          .pipe(catchError(this.handleError));
  }

  deleteService(id : number){
    return this.httpClient.delete<any>(this.url+'delete/'+id)
          .pipe(catchError(this.handleError));

  }

  private handleError(errorResponse: HttpErrorResponse): Observable<any> {
    console.error('An error occurred', errorResponse);
    return throwError(errorResponse.error);
  }


}
