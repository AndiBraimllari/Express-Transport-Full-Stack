import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../common/environment/environment.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {VERIFY_USER} from "../user.reducers";
import {StatusMappingService} from "../../common/status-mapping.service";
import {UserService} from "../../common/user.service";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  verificationGroup: FormGroup;

  constructor(private http: HttpClient, private envService: EnvironmentService, private router: Router,
              private store: Store<any>, public statusMapping: StatusMappingService, public userService: UserService) {
    this.verificationGroup = new FormGroup({
      code: new FormControl(null),
      password: new FormControl(null)
    })
  }

  ngOnInit() {
  }

  verificationStatusMapping(statusCode: number) {
    switch (statusCode) {
      case 401:
        return 'Wrong password';
      case 404:
        return 'Code not found';
      default:
        return '';
    }
  }

  onActivateAccount(): void {
    this.store.dispatch({type: VERIFY_USER, payload: this.verificationGroup});
  }
}
