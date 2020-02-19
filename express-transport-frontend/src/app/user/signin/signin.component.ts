import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SIGN_USER, UserState} from "../user.reducers";
import {Store} from "@ngrx/store";
import {HttpClient} from "@angular/common/http";
import {StatusMappingService} from "../../common/status-mapping.service";
import {UserService} from "../../common/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnDestroy {
  loginGroup: FormGroup;
  verificationBtn: boolean = false;

  constructor(private http: HttpClient, private store: Store<UserState>, public statusMapping: StatusMappingService,
              private userService: UserService) {
    this.loginGroup = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
  }

  ngOnDestroy(): void {
    this.statusMapping.clearStatus();
    // this.store.dispatch({type: CANCEL_SIGN_USER});
  }

  userStatusMapping(statusCode: number) {
    switch (statusCode) {
      case 401:
        return 'Wrong password';
      case 403: {
        this.verificationBtn = true;
        this.userService.setDisabledUser({email: this.loginGroup.value.email});
        return 'Forbidden, try verifying your account';
      }
      case 404:
        return 'User not found';
      default:
        return '';
    }
  }

  onLogin(): void {
    this.store.dispatch({
      type: SIGN_USER,
      payload: {email: this.loginGroup.value.email, password: Array.from(this.loginGroup.value.password)}
    })
  }

  onFormClick(): void {
    this.statusMapping.clearStatus();
  }
}
