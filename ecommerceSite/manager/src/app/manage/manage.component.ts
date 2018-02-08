import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/index';
import { Product } from '../_models/index';
import { ProductService } from '../_services/index';
declare var $: any;



@Component
  ({
    moduleId: module.id,
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.css']
  })

export class ManageComponent implements OnInit {
  model: any = {};
  currentUser: User;
  product: Product;
  users: User[] = [];
  products: Product[] = []; //todos
  appState = 'default';
  productName = '';     //text
  oldProductName = '';//oldText
  totalAvailability = '';  //text
  oldTotalAvailability = ''; //oldText
  file: any = null;
  image: string;

  constructor(private productService: ProductService, private router: Router) {

  }

  ngOnInit() {

  }

  showProducts() {
    this.productService.getAll().subscribe(products => { this.products = products; });
  }

  addProduct() {

    var frontImageName = (<HTMLInputElement>document.getElementById('frontImage')).value;
    var frontImageNamePath = frontImageName.split("\\", 3);
    this.model.frontImage = frontImageNamePath[2];
    var backImageName = (<HTMLInputElement>document.getElementById('backImage')).value;
    var backImageNamePath = backImageName.split("\\", 3);
    this.model.backImage = backImageNamePath[2];
    this.productService.create(this.model)
      .subscribe(
      data => {

      },
      error => {

      });
  }

  deleteProduct(_id: string) {
    this.productService.delete(_id).subscribe(() => { this.loadAllProducts() });
  }

  private loadAllProducts() {
    this.productService.getAll().subscribe(products => { this.products = products; });
  }

  editProduct(product: Product) {

    this.appState = 'edit';
    this.model._id = product._id;
    this.model.productId = product.productId;
    this.model.productName = product.productName;
    this.model.productDesc=product.productDesc;
    this.model.geoType = product.geoType;
    this.model.genType = product.genType;
    this.model.wearType = product.wearType;
    this.model.categoryType = product.categoryType;
    this.model.rating = product.rating;
    this.model.popularity = product.popularity;
    this.model.totalAvailability = product.totalAvailability;
    this.model.price = product.price;
    this.model.discount = product.discount;
    (<HTMLInputElement>document.getElementById('frontImage')).innerHTML = product.frontImage;
    (<HTMLInputElement>document.getElementById('backImage')).innerHTML = product.backImage;
   
  }

  updateProduct() {

    var frontImageName = (<HTMLInputElement>document.getElementById('frontImage')).value;
    var frontImageNamePath = frontImageName.split("\\", 3);
    this.model.frontImage = frontImageNamePath[2];
    var backImageName = (<HTMLInputElement>document.getElementById('backImage')).value;
    var backImageNamePath = backImageName.split("\\", 3);
    this.model.backImage = backImageNamePath[2];

    alert(JSON.stringify(this.model));

    this.productService.update(this.model).subscribe(() => { this.loadAllProducts() });
  }

  

}



