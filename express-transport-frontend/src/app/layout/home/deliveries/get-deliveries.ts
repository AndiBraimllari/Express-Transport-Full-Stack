import {AppState} from "../../../common/store/app-state";

export function getDeliveries() {
  return (appState: AppState) => appState.deliveryState.deliveries;
}
