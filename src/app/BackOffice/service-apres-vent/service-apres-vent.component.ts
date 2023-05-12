import { Component, OnInit } from '@angular/core';
import { ServiceApresVente } from 'src/app/model/service-apres-vent';
import { ApresVentService } from 'src/app/services/apres-vent.service';

@Component({
  selector: 'app-service-apres-vent',
  templateUrl: './service-apres-vent.component.html',
  styleUrls: ['./service-apres-vent.component.css']
})
export class ServiceApresVentComponent implements OnInit{
  serviceapresvent: ServiceApresVente = new ServiceApresVente();
  serviceapresvents:ServiceApresVente[] = []


  constructor(private apresVentService:ApresVentService){}
  ngOnInit(): void {
    this.apresVentService.getAllServiceApresVente().subscribe({
      next: (res) => {
       this.serviceapresvents =  res;
       console.log('get all succes');
      },
      error: (err: any) => {
        console.log('get all service failed');
      }
    });
  }


  onSubmit(){
    console.log(this.serviceapresvent);
    console.log(this.serviceapresvent.id != null);
    if(this.serviceapresvent.id != null){
      this.apresVentService.addServiceApresVente(this.serviceapresvent).subscribe({
        next: (res) => {
          console.log('update succes');
          this.serviceapresvent = new ServiceApresVente();
        },
        error: (err: any) => {

          console.log('update failed');
        }
      });

    }else{

    this.apresVentService.addServiceApresVente(this.serviceapresvent).subscribe({
      next: (res) => {
        console.log('add succes');
        this.serviceapresvents.push(res);
        this.serviceapresvent = new ServiceApresVente();
      },
      error: (err: any) => {

        console.log('add failed');
      }
    });
  }
  }


 edit(service:ServiceApresVente){
  this.serviceapresvent = service;
  console.log(service);

 }
 delete(service:ServiceApresVente){
  console.log(service);
  this.apresVentService.deleteService(service.id).subscribe({
    next: (res) => {
      console.log('delete succes',res);
      this.serviceapresvents = this.serviceapresvents.filter(x=> x.id != service.id);
    },
    error: (err: any) => {

      console.log('delete failed',err);
    }
  });
 }

}
