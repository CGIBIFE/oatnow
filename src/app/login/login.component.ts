import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLoginForm: FormGroup;
  storeLoginForm: FormGroup;
  loginError: Boolean;
  netWorkError: Boolean;

  constructor(private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit() {
    this.userLoginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.storeLoginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  customerLogin = () => {

  }

  storeLogin = () => {
    fetch('http://160.153.246.55:5100/login/store',{
      method:'POST',
      headers: {
        'Content-Type':' application/json',
      },
      body:JSON.stringify({...this.storeLoginForm.value})
    }).then((res) => {
      return res.json().then(result => {
        if (result.loginStatus === 101) {
          sessionStorage.setItem('OAAUser', JSON.stringify({"id": result.id,role:'customer'}))
          this.router.navigate(['/dashboard/']);
        } else {
          this.loginError = true
        }
      });
    }).catch(err => {
      this.netWorkError = true;
      throw err;
    })
  }

}
