import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, ProductService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { BasketComponent } from './basket/index';
import { CheckoutaddressComponent } from './checkoutaddress/index';
import { DeliveryComponent } from './delivery/index';
import { PaymentComponent } from './payment/index';
import { ContactComponent } from './contact/index';
import { FaqComponent } from './faq/index';
import { MentshirtsComponent } from './mentshirts/index';
import { WomentshirtsComponent } from './womentshirts/index';
import { ProductdetailsComponent } from './productdetails/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        BasketComponent,
        CheckoutaddressComponent,
        DeliveryComponent,
        PaymentComponent,
        ContactComponent,
        FaqComponent,
        MentshirtsComponent,
        WomentshirtsComponent,
        ProductdetailsComponent
    ],
    providers: [
        customHttpProvider,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService, 
        ProductService
        
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }