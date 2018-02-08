"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./home/index");
var index_2 = require("./login/index");
var index_3 = require("./register/index");
var appRoutes = [
    { path: '', component: index_1.HomeComponent },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'register', component: index_3.RegisterComponent },
    // Neha~ Start of changes 
    { path: 'home', component: index_1.HomeComponent },
    // Neha~ End of changes
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
