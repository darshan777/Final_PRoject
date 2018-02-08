import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: [
        '../css/style.default.css',
        '../css/font-awesome.css',
        '../css/animate.min.css',
        '../css/owl.theme.css',
        '../css/custom.css'
    ]
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/home']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }


    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username2, this.model.password2)
            .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
}
