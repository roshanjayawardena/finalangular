import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../models/login';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  loginModel: Login
  isBlocked = false

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toasterService: ToastrService) { 
    
    }

  ngOnInit() {   
    sessionStorage.removeItem('MyProj-TokenId');
    sessionStorage.removeItem('MyProj-UserAccessLevel');
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  authenticateUser() {
    debugger
    this.isBlocked = true;
    this.loginModel = new Login();
    this.loginModel = Object.assign({}, this.loginModel, this.loginForm.value)
    this.loginService.authenticateUser(this.loginModel).subscribe(result => {
      sessionStorage.setItem('MyProj-TokenId', result.token);
      sessionStorage.setItem('MyProj-UserAccessLevel', result.isAdmin ? 'true' : 'false');
      this.router.navigate(['sto/dashboard']);
      this.isBlocked = false;
    }, error => {
      this.toasterService.error(error.message !== undefined && error.message !== null
        ? error.message
        : 'Something went wrong, refresh page again');
        this.isBlocked = false;
    });
  }

  get username() {  
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }


}
