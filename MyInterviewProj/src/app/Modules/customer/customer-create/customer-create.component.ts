import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup;
  isBlocked = false;
  numberValues = '^[0-9]*$'; // Numeric Values
  customerModel = new Customer();
  customerId: number;
  isEdit = false;
  varieties = [];

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private toasterService: ToastrService,
    private router: Router) {


  }

  ngOnInit() {    // Validators.pattern(this.numberValues)
    debugger
    this.customerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: [''],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      variety: ['', [Validators.required]]
    });

    this.checkCustomerViewOrCreate();
  }


  createNewCustomer() {
    debugger
    this.isBlocked = true;
    this.customerModel = Object.assign({}, this.customerModel, this.customerForm.value)
    this.customerService.create(this.customerModel).subscribe(result => {
      this.toasterService.success("Customer added successfully.");
      this.isBlocked = false;
      this.router.navigate(['sto/customer/cus-list']);

    }, error => {
      debugger
      this.toasterService.error(error.message !== undefined && error.message !== null
        ? error.message
        : 'Something went wrong, refresh page again');
      this.isBlocked = false;
    });

  }

  updateCustomer() {
    this.isBlocked = true;
    this.customerModel = Object.assign({}, this.customerModel, this.customerForm.value)
    this.customerService.update(this.customerModel).subscribe(result => {
      this.toasterService.success("Customer updated successfully.");
      this.isBlocked = false;
      this.router.navigate(['sto/customer/cus-list']);

    }, error => {
      debugger
      this.toasterService.error(error.message !== undefined && error.message !== null
        ? error.message
        : 'Something went wrong, refresh page again');
      this.isBlocked = false;
    });

  }

  checkCustomerViewOrCreate() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.customerId = params['cusId'];
      if (this.customerId && this.customerId != 0) {
        this.isEdit = true;
        this.getCustomerById(this.customerId);
      }
      else {
        this.customerId = 0;

      };
    });
  }

  getCustomerById(cusId: number) {

    this.isBlocked = true;
    this.customerService.getById(cusId).subscribe(result => {
      debugger
      this.customerModel = result;
      this.patchCustomerForm(this.customerModel);
    }, error => {
      this.toasterService.error(error.message !== undefined && error.message !== null
        ? error.message
        : 'Something went wrong, refresh page again');
      this.isBlocked = false;
    });

  }

  private patchCustomerForm(cusmodel: any) {
    debugger
    this.customerForm.patchValue({
      firstname: cusmodel.firstName,
      lastname: cusmodel.lastName,
      email: cusmodel.email,
      phone: cusmodel.phone

    });
    this.isBlocked = false;


  }




  get firstname() {
    return this.customerForm.get('firstname');
  }
  get lastname() {
    return this.customerForm.get('lastname');
  }
  get phone() {
    return this.customerForm.get('phone');
  }
  get email() {
    return this.customerForm.get('email');
  }
  get variety() {
    return this.customerForm.get('variety');
  }

}
