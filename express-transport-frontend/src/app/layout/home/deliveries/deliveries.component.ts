import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {
  CANCEL_GET_DELIVERIES,
  CONCLUDE_DELIVERY,
  DeliveryState,
  GET_DELIVERIES,
  REPORT_DELIVERY
} from "./delivery.reducers";
import {Store} from "@ngrx/store";
import {Delivery} from "../../../model/delivery";
import {HttpClient} from "@angular/common/http";
import {DeliveryStatus} from "../../../model/delivery-status";

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit, OnDestroy {
  deliveriesForm: FormGroup;
  delivery$: Observable<DeliveryState>;
  reportedStatus: string = DeliveryStatus.REPORTED.toString();

  constructor(private http: HttpClient, private store: Store<DeliveryState>) {
    this.delivery$ = this.store.select('deliveryStore');
  }

  ngOnInit(): void {
    this.store.dispatch({type: GET_DELIVERIES});
    this.deliveriesForm = new FormGroup({
      'deliveries': new FormControl(null),
      'deliveryAge': new FormControl(null)
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch({type: CANCEL_GET_DELIVERIES});
  }

  onConcludeDelivery(delivery: Delivery) {
    this.store.dispatch({type: CONCLUDE_DELIVERY, payload: delivery, status: DeliveryStatus[DeliveryStatus.CONCLUDED]});
  }

  onReportDelivery(delivery: Delivery) {
    this.store.dispatch({type: REPORT_DELIVERY, payload: delivery, status: DeliveryStatus[DeliveryStatus.REPORTED]});
  }
}
