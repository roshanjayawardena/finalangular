import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Products } from '../models/products';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { OrderItem } from '../models/orderitem';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {

  orderForm: FormGroup;
  products: Products[];
  isBlocked = false;
  unitPrice : number;
  orderItems : OrderItem[];

  constructor(private fb : FormBuilder,
    private router : Router,
    private orderService : OrderService,
    private toasterService: ToastrService) { }

  ngOnInit() {
    this.initializeOrderForm();
    this.getProductList();
   
  }

  initializeOrderForm() {
    this.orderForm = this.fb.group({
      orderLot: this.fb.array([])
    });
  }

  get OrderLot() {
    return this.orderForm.get('orderLot') as FormArray;
  }

 
  addOrderItem() {
    const items = this.fb.group({
      productId: ['', [Validators.required]],     
      qty: ['', [Validators.required]],
      unitPrice: [],
      discount: []     
    });

    this.OrderLot.push(items);   
  }

  trackbygem(index){
    return index;
  }

  deleteItem(i: number) {
    this.OrderLot.removeAt(i);
  }

  getProductList() {
    this.isBlocked = true;
    this.orderService.getProductList().subscribe(result => {  
      debugger
      this.products = result;     
    }, error => {
      this.toasterService.error(error.message !== undefined && error.message !== null
        ? error.message
        : 'Something went wrong, refresh page again');
      this.isBlocked = false;
    });
  }

  setSelected(productId : number) {     
    
    this.getProductById(productId);
  //this.OrderLot.controls['unitPrice'].disable();
  }

  getProductById(productId: number) {

    this.isBlocked = true;
    this.orderService.getById(productId).subscribe(result => {
      debugger     
      this.unitPrice = result.price;
      //this.patchCustomerForm(this.customerModel);
    }, error => {
      this.toasterService.error(error.message !== undefined && error.message !== null
        ? error.message
        : 'Something went wrong, refresh page again');
      this.isBlocked = false;
    });

  }

  saveOrder() {
    debugger
    this.isBlocked = true;
    const fom = this.orderForm.value;
    this.orderItems = fom.orderLot;
    this.orderService.saveOrderItems(this.orderItems).subscribe(result => {
      this.toasterService.success("Order Items added successfully.");
      this.isBlocked = false;
      this.router.navigate(['sto/order/order-create']);

    }, error => {
      debugger
      this.toasterService.error(error.message !== undefined && error.message !== null
        ? error.message
        : 'Something went wrong, refresh page again');
      this.isBlocked = false;
    });
  }

}
