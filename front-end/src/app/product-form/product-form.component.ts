import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @Output() added = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  addProduct = (form: NgForm) => {
    console.log(form.value);
    this.added.emit(form.value);
  };
}
