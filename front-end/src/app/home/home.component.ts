import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  inventory: any = [];
  constructor(private service: InventoryService) {}

  ngOnInit(): void {
    this.getInventory();
  }

  getInventory() {
    this.service.getInventory().subscribe((response) => {
      this.inventory = response;
      console.log(this.inventory);
    });
  }

  addProduct = (product: any) => {
    console.log(product);
    this.service.addProduct(product).subscribe((response) => {
      this.getInventory();
    });
  };

  deleteProduct = (id: number) => {
    this.service.deleteProduct(id).subscribe((response) => {
      this.getInventory();
    });
  };
}
