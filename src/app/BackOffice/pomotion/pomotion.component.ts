import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Promotion } from 'src/app/model/promotion';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-pomotion',
  templateUrl: './pomotion.component.html',
  styleUrls: ['./pomotion.component.css']
})
export class PomotionComponent implements OnInit{
  public promotions!: Promotion[];
  public editPromotion!: Promotion;
  public deletePromotion!: Promotion;

  showForm = false;

  constructor(private promotionservice: PromotionService ){}

    ngOnInit(){
      this.getPromotions();
    }
    showEditForm( promotion:Promotion) {
      // Logic to fetch and set the data to be edited
      this.editPromotion = promotion;
      this.showForm = true;
    }

  public getPromotions(): void{
    this.promotionservice.getPromotions().subscribe(data => {
      this.promotions = data;

    });
  }
  public onAddPromotion(addForm: NgForm): void {

    this.promotionservice.addPromotion(addForm.value).subscribe(
      (response: Promotion) => {
        console.log(response);
        this.getPromotions();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdatePromotion(promotion: Promotion): void {
    this.promotionservice.updatePromotion(promotion).subscribe({
      next:(response: Promotion) => {
        console.log(response);
        this.getPromotions();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
      }}
    );
  }

  public onDeletePromotion(promotion: Promotion): void {
    this.promotionservice.deletePromotion(promotion).subscribe({
      next:(response: void) => {
        console.log(response);
        this.getPromotions();
      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
      }}
    );
  }






}
