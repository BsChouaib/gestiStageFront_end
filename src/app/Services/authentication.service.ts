import { Injectable } from '@angular/core';
import { ConstUtils } from './UrlList';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AuthUtils } from './auth.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  Login_url =ConstUtils.AUTH_API_Login
  Registre_url =ConstUtils.AUTH_API_Registre
  private currentUserSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient, private router: Router) { }


  login(data) {
    const reqBody = {
      email: data.email,
      password: data.password,
      grantType:"password",
      withRefreshToken:true
    }
    return this.http
      .post<any>(this.Login_url, reqBody)
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const token = user.accessToken;
          localStorage.setItem('token', token);
          localStorage.setItem('refresh_token', user.refreshToken);
          //const data = AuthUtils._decodeToken(token)
          localStorage.setItem('role',  user.role);
          this.redirectToDashboard()
          this.currentUserSubject.next(token);
          return token          
        })
      );
  }
  registre(data) {
    return this.http
      .post<any>(this.Registre_url, data)
  }
  redirectToDashboard(): void {
    let redirectRoute = '';
    switch (localStorage.getItem('role')) {
      case "ADMIN":
        redirectRoute = '/admin/default';
        break;
      case "TEACHER":
        redirectRoute = '/teacher/default';
        break;
      case "STUDENT":
        redirectRoute = '/student/default';
        break;
      default:
        redirectRoute = '/guest/login';
        break;
    }

    setTimeout(() => {
      this.router.navigate([redirectRoute]);
    }, 1000);
  }

  refreshToken(): Observable<any> {

    const refreshToken = localStorage.getItem('refresh_token');
    console.log("refresh", refreshToken)
    const reqBody = {
      grantType:"refreshToken",
      withRefreshToken:true,
      refreshToken: refreshToken
    }
    return this.http.post<any>(this.Login_url, reqBody)
      .pipe(
        map(response => {
          // Assuming the response contains the new access token
          localStorage.setItem('token', response.accessToken);
          this.currentUserSubject.next(response.refreshToken);
          return response;
        })
      );
  }
}
