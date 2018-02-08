import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/index';

@Component({
  moduleId: module.id,
  templateUrl: 'checkoutaddress.component.html',
  styleUrls: [
      '../css/style.default.css',
      '../css/font-awesome.css',
      '../css/animate.min.css',
      '../css/owl.theme.css',
      '../css/custom.css'
  ]
})

export class CheckoutaddressComponent implements OnInit {
  price;
  currentUser: User;
  constructor(
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    this.price = this.route.snapshot.paramMap.get('id');
  }

}
