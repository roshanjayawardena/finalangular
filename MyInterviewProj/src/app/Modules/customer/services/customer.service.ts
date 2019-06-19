import { Injectable } from '@angular/core';
import { BaseService } from 'app/Modules/core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'app/Modules/core/services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {
   
  constructor(protected http : HttpClient,private appConfigService :AppConfigService) {   
    super(http,appConfigService.getBaseApiEndPoint() + "/Api/Customer");
  }



}
