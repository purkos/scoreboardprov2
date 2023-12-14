import {inject, Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {enviroment} from "../enviroment/enviroment";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
interface LoginResponse {
    token: string;
    userData: any;
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient)
    readonly apiUrl = enviroment.apiUrl;
    private jwtHelper = new JwtHelperService();
    private router = inject(Router)
    user: User = {
        username: '',
    }
    private userDataSubject = new BehaviorSubject<User>({username:''});
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

    constructor() {
    }

    //frontend login
    login(user: User): Observable<LoginResponse> {
        const loginUrl = `${this.apiUrl}/auth/login`;
        return this.http.post<LoginResponse>(loginUrl, user).pipe(
            tap((response) => {
                if (response.token) {
                    this.setToken(response.token);
                    this.setUserData(response.userData);
                    this.setAuthenticationStatus(true)
                }
            })
        );
    }

    //frontend registration
    register(user: User): Observable<any> {
        const registerUrl = `${this.apiUrl}/auth/register`;
        return this.http.post(registerUrl, user);
    }
    //Zapytanie na backend z tokenem o dane uzytkownika
    // getUserData(token: string) {
    //     const userUrl = `${this.apiUrl}/user`;
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     })
    //     const options = {headers: headers};
    //     return this.http.get(`${userUrl}`, options)
    //
    // }

    setToken(token: string) {
        localStorage.setItem('Token', token)
    }

    userData():Observable<User> {
        return this.userDataSubject.asObservable()
    }

    setUserData(data: any) {
        this.user.username = data.username
        this.userDataSubject.next(this.user)
    }



    isAuthenticated(): boolean {
        const token = localStorage.getItem('Token');
        // Return true if the token is present and not expired
        return !!token && !this.isTokenExpired(token);
    }
    //zmiany stanu logowania
    setAuthenticationStatus(isAuthenticated:boolean) {
        this.isAuthenticatedSubject.next(isAuthenticated);
    }
    onAuthenticationStatusChange():Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }
    logout() {
        localStorage.removeItem('Token');
        this.setAuthenticationStatus(false);
        this.router.navigate(['/'])
    }
    autoLogin() {
        if(this.isAuthenticated()) {
            this.setAuthenticationStatus(true)
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
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
            return null;
        }
    }
}
