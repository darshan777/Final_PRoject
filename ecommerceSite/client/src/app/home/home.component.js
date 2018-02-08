"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../_services/index");
var index_2 = require("../_services/index");
var router_1 = require("@angular/router");
var index_3 = require("../_services/index");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(userService, productService, authenticationService, route) {
        this.userService = userService;
        this.productService = productService;
        this.authenticationService = authenticationService;
        this.route = route;
        this.users = [];
        this.products = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
        // reset login status
        //this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    HomeComponent.prototype.deleteUser = function (_id) {
        var _this = this;
        this.userService.delete(_id).subscribe(function () { _this.loadAllUsers(); });
    };
    HomeComponent.prototype.showProducts = function () {
        var _this = this;
        this.productService.getAll().subscribe(function (products) { _this.products = products; });
    };
    HomeComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) { _this.users = users; });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'home.component.html'
        }),
        __metadata("design:paramtypes", [index_1.UserService,
            index_2.ProductService,
            index_3.AuthenticationService,
            router_1.ActivatedRoute])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
