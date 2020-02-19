import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from "./user/users.component";
import {HomeComponent} from "./layout/home/home.component";
import {SignupComponent} from "./user/signup/signup.component";
import {SigninComponent} from "./user/signin/signin.component";
import {LayoutComponent} from "./layout/layout.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {DeliveryComponent} from "./delivery/delivery.component";
import {AboutComponent} from "./about/about.component";
import {VerificationComponent} from "./user/verification/verification.component";
import {UserEnablingAuthGuard} from "./user-enabling-auth.guard.service";
import {PasswordResetRequestComponent} from "./user/password-reset/password-reset-request/password-reset-request.component";
import {PasswordResetComponent} from "./user/password-reset/password-reset.component";
import {MessageComponent} from "./message/message.component";
import {TrackComponent} from "./track/track.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '', component: LayoutComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'users', component: UsersComponent},
      {path: 'delivery', component: DeliveryComponent},
      {path: 'delivery/:id', component: DeliveryComponent},
      {path: 'message/:id', component: MessageComponent},
      {path: 'track/:id', component: TrackComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'about', component: AboutComponent},
      {path: 'signin', component: SigninComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'passwordResetRequest', component: PasswordResetRequestComponent},
      {path: 'passwordReset', component: PasswordResetComponent}
    ]},
  {path: 'verification', component: VerificationComponent, canActivate: [UserEnablingAuthGuard]},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}, // TODO ADD 404 COMPONENT IN DEV.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
