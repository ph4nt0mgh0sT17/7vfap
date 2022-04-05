import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === HttpStatusCode.Unauthorized || err.status === HttpStatusCode.Forbidden) {
            localStorage.removeItem('user')
            this.router.navigate(['reviews']);
          }
        }

        return throwError(err);
      })
    );
  }

}
