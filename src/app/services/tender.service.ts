import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import baseUrl from "./helpers.service";
import {Tender} from "../core/Model/Tender";

@Injectable({
  providedIn: 'root'
})

export class TenderService {

  constructor(private http:HttpClient) { }

  getTenders() {
    return this.http.get<Tender[]>(`${baseUrl}/tender/retrieveAlltenders`);
  }

  postTender(tender: Tender) {
    return this.http.post<Tender>(`${baseUrl}/tender/addtender`, tender);
  }

  updateTender(id: number, tender: Tender) {
    return this.http.put<Tender>(`${baseUrl}/tender/modifytender/${id}`, tender);
  }

  deleteTender(id: number) {
    return this.http.delete(`${baseUrl}/tender/removetender/${id}`);
  }

  getTender(id: number) {
    return this.http.get<Tender>(`${baseUrl}/tender/retrievetender/${id}`);
  }
}

