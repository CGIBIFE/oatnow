import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    showForm: boolean;
    formState: string;
    addProductForm: FormGroup;
    msg: string;
    products: any[];
    orders: any[];
    selectedProduct:string;

    constructor(public formBuilder: FormBuilder, public router: Router) {
    }

    ngOnInit() {
        this.getProducts()
        fetch('http://160.153.246.55:5100/api/orders/',{
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({id: JSON.parse(sessionStorage.getItem('OAAUser')).id})
        }).then(res => res.json().then(orders => {
            this.orders = orders.result
        })).catch(error => console.log(error))

        this.addProductForm = this.formBuilder.group({
            name: ['', Validators.required],
            price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            qty: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        })
    }

    showAddForm = (state) => {
        this.showForm = true;
        this.formState = state
    }

    hideForm = () => {
        this.showForm = false;
    }

    updateProduct = (product) => {
        this.selectedProduct = product.id;
        this.addProductForm.setValue({name: product.name, price: product.price, qty:product.qty})
    }

    editProduct = () => {
        fetch('http://160.153.246.55:5100/api/products/edit/',{
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({...this.addProductForm.value,productId:this.selectedProduct})
        }).then(res => res.json().then(response => {
           if (response.result.affectedRows === 1){
               this.getProducts()
               this.hideForm()
           }
        }))
    }

    deleteProduct = (product) => {
       if(confirm(`Are you sure you want to remove ${product.name}`)){
        fetch('http://160.153.246.55:5100/api/products/delete/',{
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({productId:product.id})
        }).then(res => res.json().then(response => {
            if (response.result.affectedRows === 1){
                this.getProducts()
            }
        }))}else {
           return false
       }
    }


    getProducts = () => {
        fetch('http://160.153.246.55:5100/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({id: JSON.parse(sessionStorage.getItem('OAAUser')).id})
        }).then(res => res.json().then(products => {
            this.products = products.products
        }))
    }

    updateStatus = () => {
        fetch('http://160.153.246.55:5100/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({id: JSON.parse(sessionStorage.getItem('OAAUser')).id})
        }).then(res => res.json().then(products => {
            this.products = products.products
        }))
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
                this.getProducts()
            }
        }))
    }

    viewOrder = (order) => {
        this.router.navigate(['/order', { id: order.order_id, total: order.total }]);
    }


}
