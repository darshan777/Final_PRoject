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
var http_1 = require("@angular/http");
var ProductService = /** @class */ (function () {
    function ProductService(http) {
        this.http = http;
    }
    ProductService.prototype.getAll = function () {
        return this.http.get('/products').map(function (response) { return response.json(); });
    };
    ProductService.prototype.getById = function (_id) {
        return this.http.get('/products/' + _id).map(function (response) { return response.json(); });
    };
    /*create(user: User) {
        return this.http.post('/products/register', user);
    }*/
    ProductService.prototype.update = function (product) {
        return this.http.put('/products/' + product._id, product);
    };
    ProductService.prototype.delete = function (_id) {
        return this.http.delete('/products/' + _id);
    };
    ProductService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
