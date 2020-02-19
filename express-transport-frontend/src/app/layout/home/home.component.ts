import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  onLearnMore() { // TODO MOCK CALL TO SANDBOX, FACILITY FOR DEV. TESTING NEW STUFF
    this.http.get('http://localhost:8080/hm')
      .subscribe((res: HttpResponse<any>) => console.log(res.status));
  }
}
