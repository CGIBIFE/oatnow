import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    showForm: boolean;
    addProductForm: FormGroup;
    msg:string;
    products:any[];

    constructor(public formBuilder: FormBuilder) {
    }

    ngOnInit() {
        fetch('http://160.153.246.55:5100/api/products',{
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({id:JSON.parse(sessionStorage.getItem('OAAUser')).id})
        }).then(res => res.json().then(products => {
            this.products = products.products
        }))
        this.addProductForm = this.formBuilder.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            qty: ['', Validators.required],
        })
    }

    showAddForm = () => {
        this.showForm = true;
    }

    addProduct = () => {
        this.showForm = false;
        fetch('http://160.153.246.55:5100/api/product/add', {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({
                ...this.addProductForm.value,
                merchant_id: JSON.parse(sessionStorage.getItem('OAAUser')).id
            })
        }).then(response => response.json().then(res => {
            if (res.msg) {
               this.addProductForm.reset()
                this.msg = res.msg;
            }
        }))
    }


}
