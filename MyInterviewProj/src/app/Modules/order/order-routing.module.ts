import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderCreateComponent } from './order-create/order-create.component';

const routes: Routes = [

  {
    path: '',
    component: OrderCreateComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'order-create',
    component: OrderCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
