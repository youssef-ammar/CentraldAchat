import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  productDropdownVisible = false;
  selectedProduct: string | undefined;

  toggleProductDropdown() {
    this.productDropdownVisible = !this.productDropdownVisible;
  }

  selectProduct() {
    // Implement your logic for selecting a product here
  }
}
