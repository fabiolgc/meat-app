import {Routes} from '@angular/router'

import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { RestaurantsComponent } from './restaurants/restaurants.component'
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component'
import { MenuComponent } from './restaurant-detail/menu/menu.component'
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component'
import { OrderSummaryComponent } from './order-summary/order-summary.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login/:to', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'restaurants/:id', component: RestaurantDetailComponent,
    children: [
      {path: '', redirectTo: 'menu', pathMatch: 'full'},
      {path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
      {path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard]}
  ], canActivate: [AuthGuard]},
  {path: 'restaurants', component: RestaurantsComponent, canActivate: [AuthGuard] },
  {path: 'order', loadChildren: './order/order.module#OrderModule', canLoad: [AuthGuard], canActivate: [AuthGuard]},
  {path: 'order-summary', component: OrderSummaryComponent},
  {path: 'about', loadChildren: './about/about.module#AboutModule'},
  {path: '**', component: NotFoundComponent}
]
