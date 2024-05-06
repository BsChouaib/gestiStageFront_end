import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AuthUtils } from '../Services/auth.utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      if (state.url.includes(role)) {
        return true;
      }
      this.redirectUserBasedOnRole(role);
      return false;
    }

    if (state.url.includes('guest')) {
      return true;
    }
    this.router.navigate(['/guest/login']);
    return false;
    return this.router.createUrlTree(['/guest/login']);
  }

  private redirectUserBasedOnRole(role): void {
    switch (role) {
      case "ADMIN":
        this.router.navigate(['/admin/default']);
        break;
      case "TEACHER":
        this.router.navigate(['/teacher/default']);
        break;
      case "STUDENT":
        this.router.navigate(['/student/default']);
        break;
      default:
        this.router.navigate(['/guest/login']);
    }
  }

}
