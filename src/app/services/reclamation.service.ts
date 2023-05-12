import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Reclamation } from '../model/reclamation';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReclamationUpdateDTO } from '../model/reclamation-update-dto';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private url = 'api/';

  constructor(private httpClient: HttpClient) {}

  addReclamation(reclamation: Reclamation) {
    return this.httpClient.post<any>(this.url+'addReport/'+reclamation.user.userId, reclamation).pipe(catchError(this.handleError));
  }
  updateReclamation(reclamation: Reclamation) {
    console.log('service', reclamation);
    const reclamationUpdateDTO: ReclamationUpdateDTO = {
      reportId: reclamation.reportId,
      status: reclamation.status,
      type: reclamation.type,
      description: reclamation.description,
    };
    return this.httpClient
      .put<any>(this.url + 'updateReport', reclamationUpdateDTO)
      .pipe(catchError(this.handleError));
  }

 // updateReclamation(reclamation: Reclamation) {
  //  console.log('service', reclamation);
    //return this.httpClient.put<any>(this.url+'updateReport', reclamation).pipe(catchError(this.handleError));
 // }

  getAllReclamations() {
    return this.httpClient.get<any>(this.url + 'AllReport').pipe(catchError(this.handleError));
  }

  deleteReclamation(id: number) {
    return this.httpClient.delete<any>(this.url + 'updateReport/' + id).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<any> {
    console.error('An error occurred', errorResponse);
    return throwError(errorResponse.error);
  }
}
