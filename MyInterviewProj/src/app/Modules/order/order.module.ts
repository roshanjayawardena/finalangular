import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderCreateComponent } from './order-create/order-create.component';
import { SharedModule } from '../shared/shared.module';
import { OrderService } from './services/order.service';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ],
  declarations: [OrderCreateComponent],
  providers: [OrderService]
})
export class OrderModule { }
