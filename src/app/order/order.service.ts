import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { MEAT_API } from '../app.api'



@Injectable()

export class OrderService {

    constructor(
        private cartService: ShoppingCartService,
        private http: HttpClient,
        private router: Router
    ) {}

    cartItems(): CartItem[] {
        return this.cartService.items

    }

    increaseQty(item: CartItem) {
        return this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem) {
        return this.cartService.decreaseQty(item)
    }

    remove (item: CartItem) {
     this.cartService.removetem(item)
    }

    clear() {
        this.cartService.clear()
    }

    itemsValue(): number {
        return this.cartService.total()
    }

    checkOrder(order: Order): Observable<any> {

        return this.http.post<Order>(`${MEAT_API}/orders`, order)
                        .map(order => order.id)


    }


}
