import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EffectsModule} from "@ngrx/effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UsersComponent} from './user/users.component';
import {DeliveriesComponent} from './layout/home/deliveries/deliveries.component';
import {deliveriesReducer} from "./layout/home/deliveries/delivery.reducers";
import {DeliveryEffects} from "./layout/home/deliveries/delivery.effects";
import {NavbarComponent} from './layout/navbar/navbar.component';
import {usersReducer} from "./user/user.reducers";
import {HomeComponent} from './layout/home/home.component';
import {UserEffects} from "./user/user.effects";
import {SignupComponent} from './user/signup/signup.component';
import {SigninComponent} from './user/signin/signin.component';
import {LayoutComponent} from './layout/layout.component';
import {HttpInterceptorService} from "./http-interceptor.service";
import {clearState} from "./common/store/meta-reducers";
import {FooterComponent} from './layout/footer/footer.component';
import {ProfileComponent} from './user/profile/profile.component';
import {DeliveryComponent} from './delivery/delivery.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AboutComponent} from './about/about.component';
import {VerificationComponent} from './user/verification/verification.component';
import {PasswordResetComponent} from './user/password-reset/password-reset.component';
import {PasswordResetRequestComponent} from './user/password-reset/password-reset-request/password-reset-request.component';
import {MessageComponent} from './message/message.component';
import {TrackComponent} from './track/track.component';
import {AgmCoreModule} from '@agm/core';
import {FeatherModule} from 'angular-feather';
import {allIcons} from 'angular-feather/icons';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DeliveriesComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    LayoutComponent,
    FooterComponent,
    ProfileComponent,
    DeliveryComponent,
    AboutComponent,
    VerificationComponent,
    PasswordResetComponent,
    PasswordResetRequestComponent,
    MessageComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({deliveryStore: deliveriesReducer, userStore: usersReducer},
      {metaReducers: [clearState]}),
    EffectsModule.forRoot([DeliveryEffects, UserEffects]),
    AgmCoreModule.forRoot({
      apiKey: 'AGM_KEY'
    }),
    FeatherModule.pick(allIcons),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
