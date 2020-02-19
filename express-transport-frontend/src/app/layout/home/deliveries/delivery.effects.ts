import {Injectable, NgZone} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {
  ACQUIRE_DELIVERY,
  CREATE_DELIVERY,
  CANCEL_GET_DELIVERIES,
  DeliveryState,
  GET_DELIVERIES,
  GET_DELIVERIES_SUCCESS,
  RELEASE_DELIVERY,
  REPORT_DELIVERY,
  CONCLUDE_DELIVERY, CONCLUDE_DELIVERY_SUCCESS
} from "./delivery.reducers";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, concatMap, map, switchMap} from "rxjs/operators";
import {Action, Store} from "@ngrx/store";
import {concat, forkJoin, from, of} from "rxjs";
import {EnvironmentService} from "../../../common/environment/environment.service";
import {UserService} from "../../../common/user.service";
import {ToastrIconClasses, ToastrService} from "ngx-toastr";
import {DeliveryStatus} from "../../../model/delivery-status";
import {Router} from "@angular/router";

@Injectable()
export class DeliveryEffects {
  constructor(private envService: EnvironmentService, private userService: UserService, private http: HttpClient,
              private actions: Actions, private store: Store<DeliveryState>, private toastr: ToastrService,
              private router: Router, private ngZone: NgZone) {
  }

  @Effect()
  fetchedDelivery$ = this.actions.pipe(
    ofType(GET_DELIVERIES, CANCEL_GET_DELIVERIES),
    switchMap((dispatchedData: Action) => dispatchedData.type === CANCEL_GET_DELIVERIES ?
      of() : this.http.get(this.envService.currentHost() + '/deliveries')
        .pipe(catchError(err => {
          console.log('Couldn\'t get deliveries');
          this.store.dispatch({type: CANCEL_GET_DELIVERIES});
          return of();
        }))),
    map((responseData: any) => ({type: GET_DELIVERIES_SUCCESS, payload: responseData}))
  );

  @Effect()
  addedDelivery$ = this.actions.pipe(
    ofType(CREATE_DELIVERY),
    concatMap((dispatchData: any) => {
      return concat(
        this.http.post(this.envService.currentHost() + `/payments/charge/${dispatchData.payload.token}`,
          dispatchData.payload.delivery.cost, {headers: new HttpHeaders().set('Content-Type', 'application/json')}),
        this.http.post(this.envService.currentHost() + '/deliveries/addDelivery', dispatchData.payload.delivery))
    }),
    map(val => {
      this.store.dispatch({type: GET_DELIVERIES}); //TODO IMPROVE ME DEV.
      this.ngZone.run(() => this.router.navigate(['/home'])).then();
      return {type: 'DEFAULT'};
    })
  );

  @Effect()
  updatedDelivery$ = this.actions.pipe(
    ofType(ACQUIRE_DELIVERY, RELEASE_DELIVERY, CONCLUDE_DELIVERY, REPORT_DELIVERY),
    switchMap((dispatchData: any) =>
      this.http.post(this.envService.currentHost() + '/deliveries/updateDelivery', dispatchData.payload,
        {params: new HttpParams().append('status', dispatchData.status)})),
    map((responseData: any) => {
      if (responseData.status === DeliveryStatus[DeliveryStatus.CONCLUDED])
        return {type: CONCLUDE_DELIVERY_SUCCESS, payload: responseData};
      else
        return {type: GET_DELIVERIES, payload: responseData};
    })
  );
}
