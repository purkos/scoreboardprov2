import { inject, Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { enviroment } from "../enviroment/enviroment";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

interface LoginResponse {
  token: string;
  userData: any;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  readonly apiUrl = enviroment.apiUrl;
  private user: User = {
    username: "",
    userId: 0,
  };
  private http = inject(HttpClient);
  private router = inject(Router);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private jwtHelper: JwtHelperService = new JwtHelperService();

  //frontend login
  public login(user: User): Observable<LoginResponse> {
    const loginUrl = `${this.apiUrl}/auth/login`;
    return this.http.post<LoginResponse>(loginUrl, user).pipe(
      tap((response) => {
        if (response.token) {
          this.setToken(response.token);
          this.setUserData(response.userData);
          this.setAuthenticationStatus(true);
        }
      }),
    );
  }

  //frontend registration
  public register(user: User): Observable<any> {
    const registerUrl = `${this.apiUrl}/auth/register`;
    return this.http.post(registerUrl, user);
  }

  private setToken(token: string) {
    localStorage.setItem("Token", token);
  }

  public getUserData() {
    const token = localStorage.getItem("Token");
    const userData = this.jwtHelper.decodeToken(String(token));
    return userData;
  }

  private setUserData(data: any) {
    this.user.username = data.username;
    this.user.userId = data.userId;
    // this.userDataSubject.next(this.user);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("Token");
    // Return true if the token is present and not expired
    return !!token && !this.isTokenExpired(token);
  }

  //zmiany stanu logowania
  public setAuthenticationStatus(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  public onAuthenticationStatusChange(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  public logout() {
    localStorage.removeItem("Token");
    this.setAuthenticationStatus(false);
    this.router.navigate(["/"]);
  }

  public autoLogin() {
    if (this.isAuthenticated()) {
      this.setAuthenticationStatus(true);
    }
  }

  private isTokenExpired(token: string): null | boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate && expirationDate < new Date();
  }

  private getTokenExpirationDate(token: string): Date | null {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return null;
    }
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded.exp);
    return expirationDate;
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      return null;
    }
  }
}
