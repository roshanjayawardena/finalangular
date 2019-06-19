import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = sessionStorage.getItem('MyProj-TokenId');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + authToken
    });
    const cloneRequest = req.clone({ headers });
    return next.handle(cloneRequest);
  }
}
