import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvironmentService} from "./common/environment/environment.service";
import {UserService} from "./common/user.service";
import {User} from "./model/user";
import {SharedService} from "./common/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private envService: EnvironmentService, private http: HttpClient, private userService: UserService) {
    if (localStorage.getItem(SharedService.LS_JWT_KEY) != null) {
      this.http.get(this.envService.currentHost() + '/jwt/validate',
        {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem(SharedService.LS_JWT_KEY))})
        .subscribe((response: User) => {
          if (response != null) {
            this.userService.setLoggedinUserNavigate(response);
          } else {
            this.userService.logout();
          }
        })
    }
  }
}
