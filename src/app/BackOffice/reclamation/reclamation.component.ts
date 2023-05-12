import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/model/reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { QrCodeService } from 'src/app/services/qr-code.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  filterValue: string = '';
  filteredReclamations: Reclamation[] = [];
  reclamation: Reclamation = new Reclamation();
  reclamations: Reclamation[] = [];
  qrCodeDataURL: string | null = null;
  users:User[]=[];
  statusValues=["OPEN","IN_PROGRESS","RESOLVED"];
  selectedStatus!:string;
  constructor(private reclamationService: ReclamationService,private qrCodeService: QrCodeService,private userService :UserService) {}

  ngOnInit(): void {
    this.reclamationService.getAllReclamations().subscribe({
      next: (res) => {
        this.reclamations = res;
        this.filteredReclamations = res; // Initially, the filtered list is the full list
        console.log('get all succes');
      },
      error: (err: any) => {
        console.log('get all reclamations failed');
      }
    });
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        console.log('get all users succes');
      },
      error: (err: any) => {
        console.log('get all users failed');
      }
    });

  }

  onSubmit() {
    console.log(this.reclamation);
    console.log(this.reclamation.reportId != null);
    if (this.reclamation.reportId != null) {
      this.reclamationService.updateReclamation(this.reclamation).subscribe({
        next: (res) => {
          console.log('update succes');
          this.reclamation = new Reclamation();
        },
        error: (err: any) => {
          console.log('update failed', err);
        }
      });
    } else {
      this.reclamationService.addReclamation(this.reclamation).subscribe({
        next: (res) => {
          console.log('add succes', res);
          this.reclamations.push(res);
          this.reclamation = new Reclamation();
        },
        error: (err: any) => {
          console.log('add failed', err);
        }
      });
    }
  }
  filterReclamations() {
    if (this.filterValue) {
      this.filteredReclamations = this.reclamations.filter(reclamation =>
        reclamation.type.toLowerCase().includes(this.filterValue.toLowerCase())
      );
    } else {
      this.filteredReclamations = this.reclamations; // If the filter is empty, show the full list
    }
  }
  edit(reclamation: Reclamation) {
    this.reclamation = reclamation;
    console.log(reclamation);
  }
  async generateQRCode() {
    const claimData = {
      user: 'Sirine',
      productId: '67890',
      date: '2023-05-07',
      description: 'Problème avec le produit ',
      type:'Technique'
    };

    const claimDataJSON = JSON.stringify(claimData);

    this.qrCodeDataURL = await this.qrCodeService.generateQRCode(claimDataJSON);
  }

  delete(reclamation: Reclamation) {
    console.log(reclamation);
    this.reclamationService.deleteReclamation(reclamation.reportId).subscribe({
      next: (res) => {
        console.log('delete succes', res);
        this.reclamations = this.reclamations.filter((x) => x.reportId != reclamation.reportId);
      },
      error: (err: any) => {
        console.log('delete failed', err);
      }
    });
  }
}
