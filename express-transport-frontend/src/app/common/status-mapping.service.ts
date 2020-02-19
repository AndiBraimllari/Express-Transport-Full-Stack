import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusMappingService {
  status: number;
  statusText: string;
  componentStatus: string;

  constructor() {
  }

  setStatus(status: number, componentStatus?: string) {
    if (status != 200) {
      this.status = status;
      this.componentStatus = componentStatus;
      // this.statusText = ;
    }
  }

  getStatus(componentStatus: string) {
    if (componentStatus === this.componentStatus && this.status != null) {
      return this.status;
    } else {
      return null;
    }
  }

  clearStatus() {
    this.status = null;
    this.componentStatus = null;
  }
}
