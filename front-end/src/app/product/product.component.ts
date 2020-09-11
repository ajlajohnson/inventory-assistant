import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() productRef: any;
  @Output() deleted = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  deleteProduct = () => {
    this.deleted.emit();
  };
}
