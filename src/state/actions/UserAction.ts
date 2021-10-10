import {USER_LOGIN, USER_LOGOUT} from '../constants/User';
import User from '../../models/UserModel';

export const loginUser = (payload: User) => ({
  type: USER_LOGIN,
  payload,
});

export const logoutUser = () => ({
  type: USER_LOGOUT,
});

export type UserActions = ReturnType<typeof loginUser | typeof logoutUser>;
