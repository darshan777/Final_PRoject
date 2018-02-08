import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { BasketComponent } from './basket/index';
import { CheckoutaddressComponent } from './checkoutaddress/index';
import { DeliveryComponent } from './delivery/index';
import { PaymentComponent } from './payment/index';
import { ContactComponent } from './contact/index';
import { FaqComponent } from './faq/index';
import { AuthGuard } from './_guards/index';
import { MentshirtsComponent } from './mentshirts/index';
import { WomentshirtsComponent } from './womentshirts/index';
import { Component } from '@angular/core/src/metadata/directives';
import { ProductdetailsComponent } from './productdetails/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'checkoutaddress/:id', component: CheckoutaddressComponent },
    { path: 'delivery/:id', component: DeliveryComponent },
    { path: 'payment/:id', component: PaymentComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'mentshirts/:id', component: MentshirtsComponent},
    { path: 'mentshirts', component: MentshirtsComponent},
    { path: 'womentshirts', component: WomentshirtsComponent },
    { path: 'productdetails/:prod', component: ProductdetailsComponent},
    { path: 'productdetails', component: ProductdetailsComponent},
    // Neha~ Start of changes 
    { path: 'home', component: HomeComponent},
    // Neha~ End of changes

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);