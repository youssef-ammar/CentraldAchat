import { Injectable } from '@angular/core';
import {Offer} from "../core/Model/Offer";
import {HttpClient} from "@angular/common/http";
import baseUrl from "./helpers.service";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http:HttpClient) { }

  getOffers() {
    return this.http.get<Offer[]>(`${baseUrl}/offer/retrieveAlloffers`);
  }

  postOffer(offer: Offer) {
    return this.http.post<Offer>(`${baseUrl}/offer/addoffer`, offer);
  }

  updateOffer(id:number, offer: Offer) {
    return this.http.put<Offer>(`${baseUrl}/offer/modifyoffer/${id}`, offer);
  }

  deleteOffer(id: number) {
    return this.http.delete(`${baseUrl}/offer/removeoffer/${id}`);
  }

  getOffer(id: number) {
    return this.http.get<Offer>(`${baseUrl}/addoffer/${id}`);
  }
}

