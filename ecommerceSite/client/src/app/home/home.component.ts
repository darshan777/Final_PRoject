import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Product } from '../_models/index';
import { ProductService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';

import * as globalVars from "../_services/global";
import $ from "jquery";
import * as io from "socket.io-client";
import {Inject} from "@angular/core";


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: [
        '../css/style.default.css',
        '../css/font-awesome.css',
        '../css/animate.min.css',
        '../css/owl.theme.css',
        '../css/custom.css',
        'home.component.css',
        '../css/owl.carousel.css'
    ]

})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    products: Product[] = [];
    returnUrl: string;
    sliderimg: string;
    appState = 'default';
    // login-modal attributes
    model: any = {};
    loading = false;

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
    socket: any;

    text;

    constructor(private userService: UserService,
        private productService: ProductService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.sliderimg = '/assets/main-slider1.jpg';
    }


    ngOnInit() {
        this.loadAllUsers();
        
        // reset login status
        //this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.productService.getAll().subscribe(products => { this.products = products; });
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    showProducts() {
        this.productService.getAll().subscribe(products => { this.products = products; });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    redirectLogin() {
        // Get the modal
        var modal = document.getElementById('login-modal');

        // Get the button that opens the modal
        var btn = document.getElementById("login");

        // When the user clicks on the button, open the modal

        modal.style.display = "block";

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    redirectLogout(){

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
        this.socket.emit("chatMessageToSocketServer", data.value, function(respMsg, username){
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
    searchProd(){
        alert(this.text);
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
            this.socket = io.connect("http://localhost:3000?userName="+chatusername);
        }
        
        this.socket.on("broadcastToAll_chatMessage", function(resObj) {            
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
    
        this.socket.on("updateSocketList", function(list){
            reference.clientsNameList = list;
        });
    
        this.socket.on("addUserToSocketList", function(username){
            reference.exitedUser = false;
            reference.newUser = true;
            reference.newUserName = username;
        });
    
        this.socket.on("removeUserFromSocketList", function(username){
            reference.newUser = false;
            reference.exitedUser = true;
            reference.exitedUserName = username;
        });

    }

}