import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {PASSWORD_RESET, UserState} from "../user.reducers";
import {UserService} from "../../common/user.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  passwordResetGroup: FormGroup;

  constructor(private store: Store<UserState>, private userService: UserService) {
    this.passwordResetGroup = new FormGroup({
      'code': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'samePassword': new FormControl(null, [Validators.required]),
    })
  }

  onPasswordReset() {
    if (this.passwordResetGroup.value.samePassword === this.passwordResetGroup.value.password) {
      this.store.dispatch({
        type: PASSWORD_RESET,
        payload: {
          code: this.passwordResetGroup.value.code,
          password: Array.from(this.passwordResetGroup.value.password),
          user: {
            email: this.userService.getDisabledUser().email,
          }
        }
      })
    }
  }
}
