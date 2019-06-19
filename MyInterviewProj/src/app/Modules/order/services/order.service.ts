import { Injectable } from '@angular/core';
import { BaseService } from 'app/Modules/core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'app/Modules/core/services/app-config.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  constructor(protected http : HttpClient,private appConfigService :AppConfigService) {   
    super(http,appConfigService.getBaseApiEndPoint() + "/Api/Order");
  }

  getProductList() : Observable<any> {
    debugger
    return this.http
      .get(
        `${this.baseEndPoint}/Api/Order/getAllProducts`,
        this.httpOptions
      )
      .catch(this.server4xxError);
  }

  saveOrderItems(orderItemList) {
    debugger
    return this.http
      .post(
        `${this.baseEndPoint}/Api/Order/AddOrderItems`,
        orderItemList,
        this.httpOptions
      )
      .catch(this.server4xxError);
  }

}
