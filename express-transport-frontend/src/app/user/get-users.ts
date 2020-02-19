import {AppState} from "../common/store/app-state";

export function getUsers() {
  return (appState: AppState) => appState.userState.users;
}
