import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_models/index';
import { AlertService, UserService } from '../_services/index';
import { Product } from '../_models/index';
import { ProductService } from '../_services/index';

@Component({
  selector: 'app-payment',
  moduleId: module.id,
  templateUrl: 'payment.component.html',
  styleUrls: [
      '../css/style.default.css',
      '../css/font-awesome.css',
      '../css/animate.min.css',
      '../css/owl.theme.css',
      '../css/custom.css'
  ]
})

export class PaymentComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  currentUser: User;
  users: User[] = [];
  products : Product[] = [];
  appState = 'default';
  test;
  price;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService, private productService: ProductService,
    private router: Router, private alertService: AlertService
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    
    this.loadAllUsers();
    this.price = this.route.snapshot.paramMap.get('id');
  }

  loadAllUsers() {
    //load all users and their cart items
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
 
  finalPaymentCartDelete(users :User){
    this.alertService.success('Order Has been Placed successfully !!', true);
    /*this.appState='edit';
    alert("its me!! .ts  " + JSON.stringify(users));
    this.userService.updatFinalCart(users)
    .subscribe(
        data => {
            this.alertService.success('Transaction Done !!', true);
        },
        error => {
            this.alertService.error(error);
        });*/

  }

}
