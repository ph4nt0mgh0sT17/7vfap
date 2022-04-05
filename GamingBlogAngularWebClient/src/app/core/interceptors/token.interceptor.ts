import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('user') != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(<string>localStorage.getItem('user')).jwtToken}`
        }
      });
    }

    return next.handle(request);
  }
}
