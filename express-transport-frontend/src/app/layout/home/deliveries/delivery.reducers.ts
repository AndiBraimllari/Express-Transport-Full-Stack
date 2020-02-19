import {Action, ActionReducer} from "@ngrx/store";
import {Delivery} from "../../../model/delivery";

export interface DeliveryState {
  deliveries: Delivery[];
}

const initialState: DeliveryState = {
  deliveries: [
    {id: 'asdva', name: 'Shoes', weight: 2, status: 'ACQUIRED'},
    {id: 'asdk1a', name: 'Legal papers', weight: 23, status: 'IDLE'}
  ]
};

export const CREATE_DELIVERY = 'CREATE_DELIVERY';
export const CREATE_DELIVERY_SUCCESS = 'CREATE_DELIVERY_SUCCESS';
export const RELEASE_DELIVERY = 'RELEASE_DELIVERY';
export const RELEASE_DELIVERY_SUCCESS = 'RELEASE_DELIVERY_SUCCESS';
export const ACQUIRE_DELIVERY = 'ACQUIRE_DELIVERY';
export const CONCLUDE_DELIVERY = 'CONCLUDE_DELIVERY';
export const CONCLUDE_DELIVERY_SUCCESS = 'CONCLUDE_DELIVERY_SUCCESS';
export const ACQUIRE_DELIVERY_SUCCESS = 'ACQUIRE_DELIVERY_SUCCESS';
export const REPORT_DELIVERY = 'REPORT_DELIVERY';
export const REPORT_DELIVERY_SUCCESS = 'REPORT_DELIVERY_SUCCESS';
export const GET_DELIVERIES = 'GET_DELIVERIES';
export const CANCEL_GET_DELIVERIES = 'CANCEL_GET_DELIVERIES';
export const GET_DELIVERIES_SUCCESS = 'GET_DELIVERIES_SUCCESS';
export const GET_DELIVERY = 'GET_DELIVERY';


export function deliveriesReducer(state: DeliveryState = initialState, action: Action): DeliveryState {
  switch (action.type) {
    case CREATE_DELIVERY_SUCCESS: {
      return {deliveries: [...state.deliveries, (action as { type: string, payload: Delivery }).payload]};
    }
    case GET_DELIVERIES_SUCCESS: {
      return {deliveries: [...(action as { type: string, payload: Delivery[] }).payload]};
    }
    case CONCLUDE_DELIVERY_SUCCESS: {
      state.deliveries = state.deliveries.filter(val => val.id != (action as { type: string, payload: Delivery }).payload.id);
      return state;
    }
    default: {
      return state;
    }
  }
}
