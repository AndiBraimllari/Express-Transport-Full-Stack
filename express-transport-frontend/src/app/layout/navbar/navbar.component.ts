import {Component, OnInit} from '@angular/core';
import {UserService} from "../../common/user.service";
import {Store} from "@ngrx/store";
import {SharedService} from "../../common/shared.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService, private store: Store<any>) {
  }

  ngOnInit() {
  }

  onLogout() { // should i clear the store here?
    localStorage.removeItem(SharedService.LS_JWT_KEY);
    this.store.dispatch({type: 'LOGOUT'});
    this.userService.logout(); // navigate back to signin?
  }
}
