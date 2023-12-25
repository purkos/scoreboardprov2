import { Component, inject, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  user!: any;
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService
      .onAuthenticationStatusChange()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
    this.user = this.authService.getUserData();
    this.authService.autoLogin();
  }

  logout() {
    this.authService.logout();
  }
}
