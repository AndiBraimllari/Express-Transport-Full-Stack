import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../model/user";
import {Store} from "@ngrx/store";
import {CANCEL_GET_USERS, DELETE_USER, GET_USERS} from "./user.reducers";
import {UserState} from "./user.reducers";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  user$: Observable<User[]>;

  constructor(private http: HttpClient, private store: Store<UserState>) {
    this.user$ = this.store.select('userStore');
  }

  ngOnInit() {
    this.store.dispatch({type: GET_USERS});
  }

  onDeleteUser(user: User): void {
    this.store.dispatch({type: DELETE_USER, payload: user})
  }

  ngOnDestroy(): void {
    this.store.dispatch({type: CANCEL_GET_USERS});
  }
}
