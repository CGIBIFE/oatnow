import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from "@angular/material";

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss']
})
export class CreateStoreComponent implements OnInit {
  storeDetailsForm: FormGroup;
  contactDetailsForm: FormGroup;
  regions:any[];
  cuisines:any[];
  genders:any[];
  delivery:any;
  gender:string;
  msg:string;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    fetch('http://160.153.246.55:5100/api/regions').then(data => data.json().then(regions => this.regions = regions))
    fetch('http://160.153.246.55:5100/api/cuisine').then(data => data.json().then(cuisine => this.cuisines = cuisine))
    fetch('http://160.153.246.55:5100/api/gender').then(data => data.json().then(genders => this.genders = genders))
    this.storeDetailsForm = this._formBuilder.group({
      storeName: ['', Validators.required],
      region: ['', Validators.required],
      cuisine: ['', Validators.required],
      maxServings: ['', Validators.required, Validators.pattern("^[0-9]*$")],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      orderEligibility: ['', Validators.required, Validators.pattern("^[0-9]*$")],
    });
    this.contactDetailsForm = this._formBuilder.group({
      name: ['', Validators.required],
      contactEmail: ['', Validators.required],
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],

    });
  }
  login = (stepper: MatStepper) => {
    fetch('http://160.153.246.55:5100/api/merchant/add',{
      method:'POST',
      headers: {
        'Content-Type':' application/json',
      },
      body:JSON.stringify({...this.storeDetailsForm.value, ...this.contactDetailsForm.value, delivery:this.delivery, gender: this.gender})
    }).then(response => response.json().then(res => {stepper.next();
    this.msg = res.msg}));
  }
  setDelivery = (e) => {
   this.delivery = e.checked ? 1 :0 ;
  }

  setGender = (e) => {
    this.gender = e.value;
  }

}
