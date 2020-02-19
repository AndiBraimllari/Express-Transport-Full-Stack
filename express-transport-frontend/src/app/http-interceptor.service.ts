import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {SharedService} from "./common/shared.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  tokenlessPaths: Array<string> = [  // TODO REVISE AT PROD.
    'authentication', 'createUser', 'verifyAccount', '/users/enabled', '/users/enableAccount',
    '/users/passwordResetRequest', '/users/passwordReset', '/messageSupport'
  ]; // TODO KARMA TEST URL AT DEV.

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isTokenlessPath = false;
    this.tokenlessPaths.forEach((allowedPath => {
      if (req.url.includes(allowedPath)) {
        isTokenlessPath = true;
        return;
      }
    }));
    if (isTokenlessPath) {
      return next.handle(req);
    } else {
      const cloneRequest =
        req.clone({headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem(SharedService.LS_JWT_KEY)}`)});
      return next.handle(cloneRequest);
    }
  }
}
