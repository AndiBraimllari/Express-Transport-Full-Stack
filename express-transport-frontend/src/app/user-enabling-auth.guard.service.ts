import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./common/environment/environment.service";
import {map} from "rxjs/operators";
import {UserService} from "./common/user.service";

@Injectable({
  providedIn: 'root'
})
export class UserEnablingAuthGuard implements CanActivate {

  constructor(private http: HttpClient, private userService: UserService, private envService: EnvironmentService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Trying to route to a guarded path');

    if (this.userService.getDisabledUser() != null) {
      return this.http.put(`${this.envService.currentHost()}/users/enabled`,
        this.userService.getDisabledUser().email).pipe(map((val: boolean) => {
        this.userService.setDisabledUser(null);
        return !val;
      }));
    } else {
      return false;
    }
  }
}
