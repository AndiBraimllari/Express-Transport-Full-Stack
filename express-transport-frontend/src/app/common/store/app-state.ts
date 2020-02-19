import {UserState} from "../../user/user.reducers";
import {DeliveryState} from "../../layout/home/deliveries/delivery.reducers";

export interface AppState {
  userState: UserState;
  deliveryState: DeliveryState;
}
