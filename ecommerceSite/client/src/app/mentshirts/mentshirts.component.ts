
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, AuthenticationService } from '../_services/index';
import { Product } from '../_models/index';
import { ProductService } from '../_services/index';
import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';

import * as globalVars from "../_services/global";
import $ from "jquery";
import * as io from "socket.io-client";
import {Inject} from "@angular/core";

@Component({
  moduleId: module.id,
  templateUrl: 'mentshirts.component.html',
  styleUrls: [
    '../css/style.default.css',
    '../css/font-awesome.css',
    '../css/animate.min.css',
    '../css/owl.theme.css',
    '../css/custom.css',
    '/mentshirts.component.css'
  ]
})
export class MentshirtsComponent {
  currentUser: User;
  users: User[] = [];
  products: Product[] = [];
  loading = false;
  returnUrl: string;
  productsOne: Product[] = [];
  appState = 'default';
  // login-modal attributes
  model: any = {};
 length;
 
 reference: any;
 resFlag: boolean = false;
 newUser: boolean = false;
 exitedUser: boolean = false;
 newUserName: string = null;
 exitedUserName: string = null;
 sentMessageUsername: string = null;
 response: string;
 clientsNameList: number[];
 message: string;
 msgCount: number = 0;
 check;
 id;

  constructor(

    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.productService.getAll().subscribe(products => { this.products = products; });
    this.update12Products();

    this.id = this.route.snapshot.paramMap.get('id');
    //alert(this.id);

  }

  reload(){
    
    this.productService.getAll().subscribe(products => { this.products = products; });
  }
  updateallProducts() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }
  update9Products() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
     // this.products.splice(1, 12);

    });
  }
  update12Products() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
     // this.products.splice(12);
      this.length = products.length();
      //alert(products.length);
    });
  }

  sortByName() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.products.sort(function (a, b) {
        var nameA = a.productDesc.toUpperCase(); // ignore upper and lowercase
        var nameB = b.productDesc.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    });
  }


  sortByPrice() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.products.sort(function (a, b) {
        return a.price - b.price;
      });
    });
  }

  handleSelect(selectOpt) {
    if (selectOpt.currentTarget.value == "sortName") {
      this.sortByName();
      this.router.navigate['/mentshirts'];
    }
    else if (selectOpt.currentTarget.value == "sortPrice") {
      this.sortByPrice();
      this.router.navigate['/mentshirts'];
    }
    else if (selectOpt.currentTarget.value == "sortRating") {

    }
  }

  

  chat() 
  {
      // Get the modal
      var modal = document.getElementById('chat-modal');

      // Get the button that opens the modal
      var btn = document.getElementById("chat");

      // When the user clicks on the button, open the modal

      modal.style.display = "block";

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }

      //Chat Initializing
      let reference = this;
      let temp;

      //Check if the user has logged in
      var chatusername = '';
      if(null != this.currentUser)
      {
          chatusername = this.currentUser.username;
      }
      var socket = io.connect("http://localhost:3000?userName="+chatusername);
      socket.on("broadcastToAll_chatMessage", function(resObj) {            
          reference.msgCount++;
          if (reference.sentMessageUsername !== resObj.name) {
              resObj.name = resObj.name + ": ";
              temp = $("#messages").length;
              $("#messages").append($("<li data-index=" + reference.msgCount + ">"));
              $("li[data-index=" + reference.msgCount + "]").append($("<div class='left-msg' data-index=" + reference.msgCount + ">"));
              $("div[data-index=" + reference.msgCount + "]").append($("<span class='name'>").text(resObj.name));
              $("div[data-index=" + reference.msgCount + "]").append($("<span class='msg'>").text(resObj.msg));
              $("#messages").append($("<br>"));
  
          }
          else if (reference.sentMessageUsername === resObj.name) {
              $("#messages").append($("<li data-index=" + reference.msgCount + ">"));
              $("li[data-index=" + reference.msgCount + "]").append($("<div class='right-msg' data-index=" + reference.msgCount + ">"));
              $("div[data-index=" + reference.msgCount + "]").append($("<span class='msg'>").text(resObj.msg));
                  $("#messages").append($("<br>"));
              reference.sentMessageUsername = null;
          }
      });
  
      socket.on("updateSocketList", function(list){
          reference.clientsNameList = list;
      });
  
      socket.on("addUserToSocketList", function(username){
          reference.exitedUser = false;
          reference.newUser = true;
          reference.newUserName = username;
      });
  
      socket.on("removeUserFromSocketList", function(username){
          reference.newUser = false;
          reference.exitedUser = true;
          reference.exitedUserName = username;
      });

  }

  login() {
      // Get the modal
      var modal = document.getElementById('login-modal');
      modal.style.display = "none";
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
                  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

  sendMessage(data) {
      this.resFlag = true;
      let reference = this;
      var socket = io.connect("http://localhost:3000?userName="+this.currentUser.username);
      socket.emit("chatMessageToSocketServer", data.value, function(respMsg, username){
          reference.sentMessageUsername = username;
          reference.response = respMsg;
      });
      $("#message-boxID").val(" ");
  }

  sendMessageOnEnter($event, messagebox) {
      if ($event.which === 13) { // ENTER_KEY
          this.sendMessage(messagebox);
      }
  }

  update() {
      this.resFlag = false;
      this.newUser = false;
      this.exitedUser = false;
  }
  addToCart(product: Product , user : User)
  {   
     
      this.appState='edit';
      
     
     // this.currentUser.cart.push[cartDetails];
      this.userService.update(product , user)
      .subscribe(
          data => {
               this.alertService.success('Added to cart successfully', true);
          },
          error => {
             this.alertService.error(error);
          });
  }
  // onVoted(passValue: number) {
  //   this.check = passValue;
  // }


}

