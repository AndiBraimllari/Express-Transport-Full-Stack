import {Actions, Effect, ofType} from "@ngrx/effects";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, map, switchMap} from "rxjs/operators";
import {
  UserState,
  ADD_USER,
  ADD_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  GET_USERS,
  GET_USER_SUCCESS,
  SIGN_USER,
  SIGN_USER_SUCCESS,
  SIGN_USER_FAILURE,
  CANCEL_GET_USERS,
  CANCEL_SIGN_USER,
  VERIFY_USER, CANCEL_VERIFY_USER, REQUEST_PASSWORD_RESET, PASSWORD_RESET
} from "./user.reducers";
import {UserService} from "../common/user.service";
import {EnvironmentService} from "../common/environment/environment.service";
import {of} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {SharedService} from "../common/shared.service";
import {StatusMappingService} from "../common/status-mapping.service";

@Injectable()
export class UserEffects {
  constructor(private envService: EnvironmentService, private userService: UserService, private http: HttpClient,
              private actions: Actions, private store: Store<UserState>, private statusMapping: StatusMappingService) {
  }

  @Effect()
  usersRetrieval = this.actions.pipe(
    ofType(GET_USERS, CANCEL_GET_USERS),
    switchMap((dispatchData: Action) => dispatchData.type === CANCEL_GET_USERS ?
      of() : this.http.get(this.envService.currentHost() + '/users')
        .pipe(catchError(error => {
          this.store.dispatch({type: CANCEL_GET_USERS});
          return of()
        }))),
    map(val => ({type: GET_USER_SUCCESS, payload: val}))
  );

  @Effect()
  userCreation = this.actions.pipe(
    ofType(ADD_USER),
    switchMap((dispatchData: any) => {
      return this.http.post(this.envService.currentHost() + '/users/createUser', dispatchData.payload)
    }),
    map((val: any) => {
      this.userService.setDisabledUserNavigate({email: val.email}, 'verification');
      return ({type: ADD_USER_SUCCESS, payload: val});
    })
  );

  @Effect()
  userDeletion = this.actions.pipe(
    ofType(DELETE_USER),
    switchMap((dispatchData: any) =>
      this.http.delete(this.envService.currentHost() + '/users/deleteUser/' + dispatchData.payload.id)),
    map((val: any) => {
      if (val != null) { // write pattern type here
        return ({type: DELETE_USER_SUCCESS, payload: val});
      } else {
        console.error('USER COULD NOT BE DELETED');
        return ({type: 'DELETE_USER_FAILURE', payload: val});
      }
    })
  );

  @Effect()
  userSignin = this.actions.pipe(
    ofType(SIGN_USER, CANCEL_SIGN_USER),
    switchMap((dispatchData: any) => dispatchData.type === CANCEL_SIGN_USER ?
      of() : this.http.post(this.envService.currentHost() + '/users/authentication', dispatchData.payload, {observe: 'response'})
        .pipe(catchError(err => {
          this.statusMapping.setStatus(err.status, 'USER_STATUS');
          this.store.dispatch({type: CANCEL_SIGN_USER});
          return of();
        }))),
    map((jwtReponse: HttpResponse<any>) => {
      this.statusMapping.setStatus(jwtReponse.status, 'USER_STATUS');
      if (jwtReponse.body !== null) {
        this.userService.setLoggedinUserNavigate(jwtReponse.body);
        localStorage.setItem(SharedService.LS_JWT_KEY, jwtReponse.body);
        return {type: SIGN_USER_SUCCESS, payload: jwtReponse.body};
      } else {
        return {type: SIGN_USER_FAILURE, payload: jwtReponse.body};
      }
    })
  );

  @Effect() // this.router.navigateByUrl('/home')
  userVerification = this.actions.pipe(
    ofType(VERIFY_USER, CANCEL_VERIFY_USER),
    switchMap((dispatchData: any) => dispatchData.type === CANCEL_VERIFY_USER ?
      of() : this.http.patch(`${this.envService.currentHost()}/users/enableAccount/${dispatchData.payload.value.code}`,
        dispatchData.payload.value.password, {observe: 'response'}).pipe(catchError(err => {
        this.statusMapping.setStatus(err.status, 'VERIFICATION_STATUS');
        this.store.dispatch({type: CANCEL_VERIFY_USER});
        return of();
      }))),
    map((jwtReponse: HttpResponse<any>) => {
      if (jwtReponse.body !== null) {
        this.userService.setLoggedinUserNavigate(jwtReponse.body);
        localStorage.setItem(SharedService.LS_JWT_KEY, jwtReponse.body);
        return {type: SIGN_USER_SUCCESS, payload: jwtReponse.body};
      } else {
        return {type: SIGN_USER_FAILURE, payload: jwtReponse.body};
      }
    })
  );

  @Effect()
  userPasswordResetRequest = this.actions.pipe(
    ofType(REQUEST_PASSWORD_RESET),
    switchMap((dispatchData: any) => {
      this.userService.setDisabledUser({email: dispatchData.payload.email});
      return this.http.post(this.envService.currentHost() + '/users/passwordResetRequest', dispatchData.payload)
    }),
    map((jwtReponse: any) => {
      this.statusMapping.setStatus(jwtReponse.status, 'PASSWORD_RESET_STATUS');
      if (jwtReponse === true) {
        this.userService.navigate('passwordReset');
      } else {
        this.userService.setDisabledUser(null);
      }
      return ({type: 'RANDOM', payload: jwtReponse});
    })
  );

  @Effect()
  userPasswordReset = this.actions.pipe(
    ofType(PASSWORD_RESET),
    switchMap((dispatchData: any) => {
      console.log(`${this.envService.currentHost()}/users/passwordReset/${dispatchData.payload.code}`);
      return this.http.patch(`${this.envService.currentHost()}/users/passwordReset/${dispatchData.payload.code}`,
        {user: dispatchData.payload.user, password: dispatchData.payload.password})
    }),
    map((jwtReponse: any) => {
      if (jwtReponse === true) {
        this.userService.setDisabledUserNavigate(null, 'signin');
      }
      return ({type: 'RANDOM', payload: jwtReponse});
    })
  );
}
