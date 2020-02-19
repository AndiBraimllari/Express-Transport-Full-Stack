import {Action} from "@ngrx/store";
import {User} from "../model/user";

export interface UserState {
  users: User[];
}

let johnDoe: User = { // TODO MOCK USER REVISE DEV.
  id: 'mockId',
  name: 'john doe',
  email: 'john doe'
};

export const ADD_USER = 'ADD_USER';
export const VERIFY_USER = 'VERIFY_USER';
export const CANCEL_VERIFY_USER = 'CANCEL_VERIFY_USER';
export const REQUEST_PASSWORD_RESET = 'REQUEST_PASSWORD_RESET';
export const PASSWORD_RESET = 'PASSWORD_RESET';
export const SIGN_USER = 'SIGN_USER';
export const SIGN_USER_SUCCESS = 'SIGN_USER_SUCCESS';
export const SIGN_USER_FAILURE = 'SIGN_USER_FAILURE';
export const CANCEL_SIGN_USER = 'CANCEL_SIGN_USER';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const GET_USERS = 'GET_USERS';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const CANCEL_GET_USERS = 'CANCEL_GET_USER';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

export function usersReducer(state: UserState = {users: [johnDoe]}, action: Action): UserState {
  switch (action.type) {
    case SIGN_USER_SUCCESS: {
      console.log('User logged in successfully');
      return state;
    }
    case SIGN_USER_FAILURE: {
      return state;
    }
    case ADD_USER_SUCCESS: {
      return {users: [...state.users, (action as { type: string, payload: User }).payload]};
    }
    case GET_USER_SUCCESS: {
      return {users: [...(action as { type: string, payload: User[] }).payload]};
    }
    case DELETE_USER_SUCCESS: {
      state.users = state.users.filter(item => item.id !== (action as { type: string, payload: User }).payload.id);
      return state;
    }
    default:
      return state;
  }
}
