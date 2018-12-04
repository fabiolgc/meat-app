import { Component, OnInit } from '@angular/core';

import { AuthService } from  '../../login/auth.service'
import { Token } from '../../login/token.model'

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  token(): Token {
    return this.authService.token
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

  login() {
     this.authService.handleLogin()
  }

  logout() {
     this.authService.logout()
  }

  getUsername(): string {
    return this.authService.getUsername()
  }

}
