import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { customHttpProvider } from './_helpers/index';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule }   from '@angular/forms';
import { AlertService, UserService, ProductService } from './_services/index';

@NgModule({
  declarations: [
    AppComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule, 
    routing                             
    
  ],
  providers: [
    customHttpProvider,
    UserService, 
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
