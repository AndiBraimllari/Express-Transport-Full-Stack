import {Component, NgZone, OnInit} from '@angular/core';
import {DeliveryState, GET_DELIVERIES} from "../layout/home/deliveries/delivery.reducers";
import {map} from "rxjs/operators";
import {Delivery} from "../model/delivery";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../common/environment/environment.service";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  latitude = 48.126899;
  longitude = 11.579067;
  deliveryDetails = false;
  delivery: Delivery;

  constructor(private ngZone: NgZone, private store: Store<DeliveryState>, private router: Router,
              private http: HttpClient, private envService: EnvironmentService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.store.dispatch({type: GET_DELIVERIES});
    const pathId = this.activatedRoute.snapshot.paramMap.get('id');
    this.deliveryDetails = pathId != null;
    this.store.select('deliveryStore')
      .pipe(map(delState => delState.deliveries))
      .subscribe(dels => {
        let deliveries: Delivery[];
        deliveries = dels.filter(del => del.id === pathId);
        if (deliveries.length != 1 && this.deliveryDetails)
          console.log('An error with the ID of the delivery occurred!');
        this.delivery = deliveries[0];
        console.log(this.delivery, 'hss');
        if (this.delivery) {
          this.latitude = this.delivery.currentLocation.latitude;
          this.longitude = this.delivery.currentLocation.longitude;
        }
      });
  }
}
