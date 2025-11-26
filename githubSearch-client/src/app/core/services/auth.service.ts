import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest, LoginResponse } from "../models";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken())
    public isLoggedIn$ = this.loggedInSubject.asObservable();

    private url: string = 'http://localhost:5000'

    constructor(private httpClient: HttpClient, private router: Router) { }

    private hasToken(): boolean {
        return !!localStorage.getItem('jwt_token');
    }

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>(`${this.url}/api/auth/login`, loginRequest).pipe(
            tap(response => {
                const token = response.token;
                localStorage.setItem('jwt_token', token);
                this.loggedInSubject.next(true);
            })
        );
    }

    logout() {
        this.httpClient.post(`${this.url}/api/auth/logout`, {}).subscribe({
            next: () => {
                this.executeLogout()
            },
            error: () => {
                this.executeLogout()
            }
        })
    }

    private executeLogout() {
        localStorage.removeItem('jwt_token')
        this.router.navigate(['/login']);
    }
}