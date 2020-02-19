import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ADD_USER} from "../user.reducers";
import {Store} from "@ngrx/store";
import {UserState} from "../user.reducers";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userFormGroup: FormGroup;
  roles: string[] = [
    'Pet Owner',
    'Developer',
    'Veterinarian',
  ];

  constructor(private router: Router, private store: Store<UserState>) {
  }

  ngOnInit() {
    this.userFormGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null),
      'age': new FormControl(null),
      // 'occupation': new FormControl(null),
      // 'roles': new FormControl(null) // make me a dropdown
    });
  }

  onUserCreate() {
    this.store.dispatch({
      type: ADD_USER,
      payload: {
        user: {
          name: this.userFormGroup.value.name,
          email: this.userFormGroup.value.email,
          age: this.userFormGroup.value.age,
          occupation: this.userFormGroup.value.occupation,
          roles: ['10']
        },
        password: Array.from(this.userFormGroup.value.password)
      }
    });
  }


}
