import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public static readonly LS_JWT_KEY = 'jsonWebToken';

  constructor() {
  }
}
