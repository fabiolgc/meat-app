import { Router } from '@angular/router';
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';

import {Restaurant} from './restaurant.model'
import {MenuItem} from './../../restaurant-detail/menu-item/menu-item.model';
import {MEAT_API} from '../../app.api'

@Injectable()

export class RestaurantService {

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  restaurants(search?: string): Observable<Restaurant[]> {
    // add authorization header with jwt token
    let params: HttpParams = undefined
    if (search) {
      params = new HttpParams().set('q', search)
    }
    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`,{params: params})
  }

  restaurantById(id: String): Observable<Restaurant> {
      return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
  }

  reviewsOfRestaurant(id: String): Observable<any> {
      return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)

  }


}
