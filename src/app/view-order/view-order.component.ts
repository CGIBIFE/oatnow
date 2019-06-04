import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-view-order',
    templateUrl: './view-order.component.html',
    styleUrls: ['./view-order.component.scss']
})

@Injectable()
export class ViewOrderComponent implements OnInit {
    id: string
    total: string
    items: []
    customer: []
    orderStatus: boolean

    constructor(public route: ActivatedRoute) {
    }

    ngOnInit() {
        // @ts-ignore
        this.route.params.subscribe(params => {
            console.log(params)
            this.id = params['id'];
            this.total = params['total']
        });

        fetch('http://160.153.246.55:5100/api/orders/view', {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({id: this.id})
        }).then(res => res.json().then(items => this.items = items.result))

        fetch('http://160.153.246.55:5100/api/orders/get/customer', {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({id: this.id})
        }).then(res => res.json().then(items => this.customer = items.result))

        fetch('http://160.153.246.55:5100/api/orders/get/status', {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({id: this.id})
        }).then(res => res.json().then(status => this.orderStatus = status.result.status))
    }

    updateOrderStatus = (status) => {
        fetch('http://160.153.246.55:5100/api/orders/set/status', {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({id: this.id, status})
        }).then(res => res.json().then(status => this.orderStatus = status.result.status))
    }

}
