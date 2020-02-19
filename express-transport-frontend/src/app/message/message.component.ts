import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {EnvironmentService} from "../common/environment/environment.service";
import {Delivery} from "../model/delivery";
import {DeliveryState, GET_DELIVERIES} from "../layout/home/deliveries/delivery.reducers";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  private stompClient: any;
  deliveryDetails = false;
  delivery: Delivery = {id: '0', name: 'Loading'};
  messages = [];
  message = undefined;

  constructor(private envService: EnvironmentService, private ngZone: NgZone, private store: Store<DeliveryState>,
              private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.initializeWebSocketConnection();
  }

  ngOnInit(): void {
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
  }

  ngOnDestroy(): void {
    this.stompClient.disconnect(() => console.log('See you next time!'))
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.envService.currentHost() + '/messageSupport');
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/chat', (message) => {
        if (message.body) {
          // console.log(message.body);
          that.messages.push(message.body)
        }
      });
    });
  }

  sendMessage() {
    console.log('Sent message:', this.message);
    this.messages.push(this.message);
    this.stompClient.send('/app/send/message', {}, this.message);
    this.message = undefined;
  }
}
