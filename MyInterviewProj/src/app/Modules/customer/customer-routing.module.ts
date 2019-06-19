import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerDetailsComponent } from "./customer-details/customer-details.component";
import { CustomerCreateComponent } from "./customer-create/customer-create.component";



const routes: Routes = [

  {
    path: '',
    component: CustomerDetailsComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'cus-list',
    component: CustomerDetailsComponent
  },
  {
    path: 'cus-create',
    component: CustomerCreateComponent
  },
  {
    path: 'viewcustomer/:cusId',
    component: CustomerCreateComponent
  }


];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }