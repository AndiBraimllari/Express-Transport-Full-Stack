import {Component, NgZone, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  CREATE_DELIVERY,
  DeliveryState,
  GET_DELIVERIES,
} from "../layout/home/deliveries/delivery.reducers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../common/environment/environment.service";
import {Delivery} from "../model/delivery";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-package',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  paymentForm: FormGroup;
  deliveryForm: FormGroup;
  couponForm: FormGroup;
  deliveryDetails = false;
  delivery: Delivery;
  cost: number = 0;
  weight: number = 0;
  priceReduction: number = 1;
  couponRequested = undefined;
  couponValid = undefined;

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
      });

    this.couponForm = new FormGroup({
      coupon: new FormControl(null, [Validators.required])
    });

    this.deliveryForm = new FormGroup({
      deliveryName: new FormControl(null, [Validators.required]),
      deliveryWeight: new FormControl(null, [Validators.required])
    });

    this.paymentForm = new FormGroup({
      name: new FormControl(null),
      cardNumber: new FormControl(null, [Validators.required]), // 4242424242424242
      cardExpirationMonth: new FormControl(null, [Validators.required]),  // 02
      cardExpirationYear: new FormControl(null, [Validators.required]),  // 2020
      cardVerificationCode: new FormControl(null, [Validators.required]) // 187
    });
  }

  updateCost() {
    this.cost = +this.weight;
  }

  chargeCreditCard() {
    console.log('Charging card', this.paymentForm.value.cardNumber, this.paymentForm.value.cardVerificationCode);
    (<any>window).Stripe.card.createToken({
      number: this.paymentForm.value.cardNumber,
      exp_month: this.paymentForm.value.cardExpirationMonth,
      exp_year: this.paymentForm.value.cardExpirationMonth,
      cvc: this.paymentForm.value.cardVerificationCode,
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        console.log('Stripe token: ', token);
        this.store.dispatch({
          type: CREATE_DELIVERY,
          payload: {
            token: token,
            delivery: {
              name: this.deliveryForm.value.deliveryName,
              weight: +this.deliveryForm.value.deliveryWeight,
              cost: 5 * this.deliveryForm.value.deliveryWeight * this.priceReduction,
              currentLocation: {latitude: 41, longitude: 32}
            }
          }
        });
      } else {
        console.log('Error: ', response.error.message);
      }
    });
  }

  onRedeemCoupon() {
    this.http.patch(this.envService.currentHost() + '/deliveries/couponRedeem/' + this.couponForm.value.coupon, undefined)
      .subscribe(b => {
        if (b === true) {
          this.couponValid = true;
          this.couponRequested = true;
          this.priceReduction = 0.5;
        } else {
          this.couponValid = false;
          this.couponRequested = true;
        }
      }, () => {
        this.couponRequested = true;
        this.couponValid = false
      });
  }
}
