import {ActionReducerMap} from "@ngrx/store";
import {deliveriesReducer} from "../../layout/home/deliveries/delivery.reducers";
import {usersReducer} from "../../user/user.reducers";
import {AppState} from "./app-state";
import {InjectionToken} from "@angular/core";


export interface ReducerConfig<T> {
  injectionToken: InjectionToken<ActionReducerMap<T>>;
  reducers: ActionReducerMap<T>;
}

export function getReducers(): ActionReducerMap<AppState> {
  return {
    userState: usersReducer,
    deliveryState: deliveriesReducer
  };
}


export const reducersInjectionToken = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');
Object.assign(reducersInjectionToken, getReducers);

export const reducerConfig: ReducerConfig<AppState> = {
  reducers: getReducers(),
  injectionToken: reducersInjectionToken,
};


