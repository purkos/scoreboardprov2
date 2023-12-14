import {Component, inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit{
  authService = inject(AuthService)
  isAuthenticated:boolean =false;
  user!:User
  ngOnInit() {
    this.authService.onAuthenticationStatusChange().subscribe((isAuthenticated)=> {
      this.isAuthenticated = isAuthenticated
    });

    this.authService.userData().subscribe((userData) => {
        this.user = userData;
    });
    this.authService.autoLogin()

  }

  logout() {
    this.authService.logout()

  }

}
