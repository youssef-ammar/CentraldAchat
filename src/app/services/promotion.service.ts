import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}  from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from 'src/app/model/promotion';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {


  constructor(private http: HttpClient) { }
  public getPromotions(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/Centraledachat/getPromotion');
  }

  public addPromotion(promotin: Promotion): Observable<Promotion>{
    return this.http.post<Promotion>('http://localhost:8080/Centraledachat/addPromotion', promotin);
  }

  public updatePromotion(promotin: Promotion): Observable<Promotion>{
    return this.http.put<Promotion>('http://localhost:8080/Centraledachat/updatePromotion', promotin);
  }
  public deletePromotion(promotin: Promotion): Observable<void>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: promotin  // Include the promotion object as the request body
    };
    return this.http.delete<void>('http://localhost:8080/Centraledachat/deletePromotion', httpOptions);
  }
  public sendMail( recipientEmail: string, couponCode: string): Observable<any>{
    const requestBody = {
      recipientEmails: recipientEmail,
      couponCode: couponCode
    };
    return this.http.post<void>('http://localhost:8080/Centraledachat/sendCouponMail', requestBody);
  }
}
