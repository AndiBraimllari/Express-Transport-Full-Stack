import {User} from "./user";

export interface UserPrincipal {
  user: User;
  password: string[]; // make char[] ?
}
