import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.css']
})
export class EmailSenderComponent {
  recipientEmails: string = '';
  couponCode: string = '';
  constructor(private promotionservice: PromotionService ){}

  sendEmails(mailForm: NgForm) {
    console.log('Recipient:', mailForm.value.recepient);
  console.log('Coupon Code:', mailForm.value.couponCode);
    this.promotionservice.sendMail(mailForm.value.recipient, mailForm.value.couponCode).subscribe({
      next:(response:void) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) =>{
        alert( error.message);
        mailForm.reset();
      }}
    );
  }

}
