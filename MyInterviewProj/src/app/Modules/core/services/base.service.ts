import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  errorMessage : {status : any; message : string};
  protected baseEndPoint = environment.baseEndPoint;
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(protected http :HttpClient,protected actionUrl : string) {

  
   }

getAll(skip:number,take:number,search:string,orderBy:string): Observable<any> {
  debugger
return this.http.get(`${this.actionUrl}?skip=${skip}&take=${take}&search=${search}&orderby=${orderBy}`)
.map((response)=> response).catch(this.server4xxError);
}

// getAll(): Observable<any> {
//   debugger
// return this.http.get<Customer[]>(`${this.actionUrl}`)
// .map((response)=> response).catch(this.server4xxError);
// }

getById(id:number) : Observable<any>{
  debugger
return this.http.get(`${this.actionUrl}/${id}`).map(res =>res).catch(this.server4xxError);
}

create(entity :any)
{
  debugger
  return this.http.post(`${this.actionUrl}`,entity).map(res => res).catch(this.server4xxError);

}

update(entity : any)
{
  debugger
return this.http.put(`${this.actionUrl}`,entity).map(res=>res).catch(this.server4xxError);
}

delete(id :number){
  debugger
 return this.http.delete(`${this.actionUrl}/${id}`,this.httpOptions).map((response) =>response).catch(this.server4xxError);

}




  server4xxError(error: Response | any) {
    let isLogin = false;
  debugger
    if (error.url !== undefined && error.url !== null) {
      isLogin = error.url.includes('api/Account/Authenticate');
    }

    if (error.status === 0) {
      this.errorMessage = {
        message: 'Please check your internet connection',
        status: error.status
      };
    } else if (error.status === 401 && isLogin) {
      sessionStorage.removeItem('GemSto-TokenId');
      this.errorMessage = {
        message: 'Invalid username or password',
        status: error.status
      };
    } else if (
      error.status === 401 ||
      error.status === 403 ||
      error.status === 404 ||
      error.status === 408
    ) {
      sessionStorage.removeItem('GemSto-TokenId');
      this.errorMessage = {
        message: 'Your login time has been expired, login again',
        status: error.status
      };
    } else {
      this.errorMessage = {
        message: error.error.message,
        status: error.status
      };
    }
    const errorMsg = Object.assign({}, this.errorMessage);
    return Observable.throw(errorMsg);
  }

}
