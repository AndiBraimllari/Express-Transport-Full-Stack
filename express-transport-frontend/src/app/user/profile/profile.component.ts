import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {EnvironmentService} from "../../common/environment/environment.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../../common/user.service";
import {Store} from "@ngrx/store";
import {UserState} from "../user.reducers";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userUpdateFormGroup: FormGroup;

  constructor(private store: Store<UserState>) {
  }

  ngOnInit(): void {
    this.userUpdateFormGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'age': new FormControl(null),
      'occupation': new FormControl(null),
      'role': new FormControl(null)
    });
  }

  onUserUpdate(): void {
    this.store.dispatch({type: 'DEFAULT'}) // TODO Add UPDATE_USER action
  }
}
