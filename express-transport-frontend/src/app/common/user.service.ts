import {Injectable, NgZone} from '@angular/core';
import {User} from "../model/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService { // TODO REFACTOR DEV.
  private currentUser: User;
  private disabledUser: User;
  private loggedIn: boolean;

  constructor(private ngZone: NgZone, private router: Router) {
    // this.currentUser = { // mock user
    //   id: 'mockId',
    //   name: 'John Doe',
    //   email: 'john doe',
    //   roles: ['10', '20']
    // };
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
    this.currentUser = null;
  }

  setLoggedinUserNavigate(user: User) {
    if (user != null) {
      this.currentUser = user;
      this.loggedIn = true;
      this.ngZone.run(() => this.router.navigate(['home'])).then();
    }
  }

  getDisabledUser() {
    return this.disabledUser;
  }

  setDisabledUserNavigate(disabledUser: User, route: string) {
    this.disabledUser = disabledUser;
    this.ngZone.run(() => this.router.navigate([route])).then();
  }

  setDisabledUser(disabledUser: User) {
    this.disabledUser = disabledUser;
  }

  navigate(route: string) {
    this.ngZone.run(() => this.router.navigate([route])).then();
  }
}
