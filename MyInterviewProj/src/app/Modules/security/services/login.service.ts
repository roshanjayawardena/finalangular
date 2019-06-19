import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'app/Modules/core/services/app-config.service';
import { Login } from '../models/login';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';
import { BaseService } from 'app/Modules/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  private loginEndPoint;
  protected baseEndPoint;
  constructor(protected http: HttpClient, private appConfigService: AppConfigService) {
    super(http, "");
    this.baseEndPoint = appConfigService.getBaseApiEndPoint();
    this.loginEndPoint = `${this.baseEndPoint}/api/Security`
  }

  authenticateUser(loginModel: Login) {
    debugger
    return this.http
      .post<Login>(
        `${this.loginEndPoint}/Authenticate`,
        loginModel,
        this.httpOptions
      )
      .catch(this.server4xxError);
  }

}
