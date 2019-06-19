import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { PaginationModel } from 'app/Modules/core/models/paginationModel';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from 'app/Modules/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  isBlocked = false;
  customerModel = new Array<Customer>();
  paginationModel = new PaginationModel(0, '', false);
  customerSearchTerm = '';
  p = "";
  //searchColumn = ["provinceName","provinceCode"]
  searchTerm$ = new Subject<string>();
  constructor(private customerService: CustomerService, 
    private toasterService: ToastrService,
    public dialog: MatDialog,
    private router : Router) { }

  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.isBlocked = true;  
     this.customerService.getAll(this.paginationModel.skip, this.paginationModel.take, this.customerSearchTerm, this.paginationModel.orderByTerm)
     .subscribe(result => {
       debugger
      this.customerModel = result.items;
      this.isBlocked = false;
    },      
    error => {
       this.toasterService.error(error.message);
       this.isBlocked = false;

    });

  }

  viewCustomer(cusId){   
    this.router.navigate(["sto/customer/viewcustomer/" + cusId]);
  }

 

  deleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.delete(id).subscribe(
          response => {
            this.toasterService.success(
              'Customer has been deleted successfully'
            );
            this.getAllCustomers();
          },
          error => {
            this.toasterService.error(
              error.message !== undefined && error.message !== null
                ? error.message
                : 'Something went wrong, refresh page again'
            );
          }
        );
      }
    });
  }

}
