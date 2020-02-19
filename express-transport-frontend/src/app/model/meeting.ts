import {User} from "./user";

export interface Meeting {
  id: string;
  user: User;
  dateTime: Date; //string?
  valid: boolean;
}
