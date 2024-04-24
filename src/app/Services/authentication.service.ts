import { Injectable } from '@angular/core';
import { ConstUtils } from './UrlList';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { AuthUtils } from './auth.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  Login_url =ConstUtils.AUTH_API_Login
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
  nav(){
    this.router.navigateByUrl('/admin/default')  }

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
}
