import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { RatingComponent } from './rating/rating.component';

import { RestaurantService } from '../restaurants/restaurant/restaurant.service';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { OrderService } from '../order/order.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationsService } from './messages/notification.service'
import { AuthService } from '../login/auth.service';
import { AuthGuard } from '../guard/auth.guard';
import { AuthInterceptor } from '../security/auth.interceptor';

@NgModule({
    declarations: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ AuthService, 
                         AuthGuard, 
                         RestaurantService, 
                         ShoppingCartService, 
                         OrderService, 
                         NotificationsService,
                        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
        };
    }
}
