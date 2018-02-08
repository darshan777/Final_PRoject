"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./home/index");
var index_2 = require("./login/index");
var index_3 = require("./register/index");
var appRoutes = [
    { path: '', component: index_1.ManageComponent },
    { path: 'manage', component: index_1.ManageComponent },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
