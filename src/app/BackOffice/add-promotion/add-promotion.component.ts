import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Promotion } from 'src/app/model/promotion';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit{
  public promotions!: Promotion[];
  constructor(private promotionservice: PromotionService ){}
  ngOnInit(){
    this.getPromotions();
  }

public getPromotions(): void{
  this.promotionservice.getPromotions().subscribe(data => {
    this.promotions = data;

  });
}

  public onAddPromotion(addForm: NgForm): void {

    this.promotionservice.addPromotion(addForm.value).subscribe({
      next:(response: Promotion) => {console.log(response);
        this.getPromotions();
        addForm.reset();

      },
      error:(error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }}
    );
  }
}
