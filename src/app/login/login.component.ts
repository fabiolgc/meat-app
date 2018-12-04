import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'

import 'rxjs/add/operator/catch';

import { AuthService } from './auth.service';
import { NotificationsService } from './../shared/messages/notification.service';
import { Token } from './token.model';

@Component({
  selector: 'mt-login',
  templateUrl: '../login/login.component.html'
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    navigateTo: string;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private notificationsService: NotificationsService,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        // reset login status
        this.loginForm = this.fb.group({
          username: this.fb.control('',[Validators.required]),
          password: this.fb.control('',[Validators.required])
        })

        this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/')
        this.authService.logout();
    }

    login() {
        this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
          .subscribe(token => this.notificationsService.notify(`Olá!`), // mostrar o ${nome_usuario} na mensagem
                    (response: HttpErrorResponse) => {throw response},
                    () => {
                        this.router.navigate([atob(this.navigateTo)])
                    })
    }
}
