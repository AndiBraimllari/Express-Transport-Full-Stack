// import {NgModule} from '@angular/core';
// import {EffectsModule} from '@ngrx/effects';
// import {ActionReducer, StoreModule as NgrxStoreModule} from '@ngrx/store';
// // import {StoreDevtoolsModule} from '@ngrx/store-devtools';
// import {getReducers, reducersInjectionToken} from "./reducers";
// import {effects} from "ngrx/@ngrx/effects/src/effects-subscription";
// // import {effects} from 'app/shared/store/effects';
// // import {getReducers, reducersInjectionToken} from 'app/shared/store/reducers';
// // import {environment} from 'environments/environment';
// // import {localStorageSync} from 'ngrx-store-localstorage';
// // npm i --save @angular/flex-layout@2.0.0-beta.10-4905443
// // export function onlyForDevEnv(returnForDevelopment, returnForProduction = []) {
// //   return environment.production ? returnForProduction : returnForDevelopment;
// // }
// // export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
// //   return localStorageSync({keys: ['filters']  , rehydrate: true, storage: localStorage, removeOnUndefined: true})(reducer);
// // }
//
// @NgModule({
//   imports: [
//     NgrxStoreModule.forRoot(
//       reducersInjectionToken,
//       // {
//       //   metaReducers: [localStorageSyncReducer],
//       // },
//     ),
//     EffectsModule.forRoot(effects),
//     // onlyForDevEnv(StoreDevtoolsModule.instrument({maxAge: 50})),
//   ],
//   providers: [
//     {provide: reducersInjectionToken, useFactory: getReducers},
//   ],
// })
// export class StoreModule {
// }
