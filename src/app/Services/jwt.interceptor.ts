import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authenticationService: AuthenticationService) {
    
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
     let currentUser = this.authenticationService.currentUserValue;
     console.log(currentUser)
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`,
        },
      });
    } 
    /* const token = localStorage.getItem('token');

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }); */
     return next.handle(request).pipe(catchError(error => {
     // console.log(error)
     // console.log(error)
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      }
      return throwError(error);
    })); 

/*     return next.handle(request);
 */  }

   private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authenticationService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
         // Check if request is for refresh token API
       /*  if (this.isRefreshTokenAPI(request.url)) {
          return next.handle(request); 
        } else {
          return next.handle(this.addTokenHeader(request, token));
        }
 */
        return next.handle(this.addTokenHeader(request, token));

        }),
        catchError((error) => {
          this.isRefreshing = false;
          // Handle token refresh failure (e.g., redirect to login)
          console.error('Error refreshing token', error);
          return throwError(error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((token) => {
          return next.handle(this.addTokenHeader(request, token));
        })
      );
    }
  } 

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
 isRefreshTokenAPI(url: string): boolean {
    // Implement your logic to compare the URL with your refresh token API endpoint
    // This could involve string comparison or using regular expressions
    // Replace the following with your actual comparison logic
    return url.endsWith('/login');
  }
}
