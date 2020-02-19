import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {REQUEST_PASSWORD_RESET, UserState} from "../../user.reducers";
import {StatusMappingService} from "../../../common/status-mapping.service";

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent {
  passwordResetRequestGroup: FormGroup;

  constructor( private store: Store<UserState>, private userStatusMapping: StatusMappingService) {
    this.passwordResetRequestGroup = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
    })
  };

  onPasswordResetRequest() {
    this.store.dispatch({
      type: REQUEST_PASSWORD_RESET,
      payload: {email: this.passwordResetRequestGroup.value.email}
    })
  }
}
