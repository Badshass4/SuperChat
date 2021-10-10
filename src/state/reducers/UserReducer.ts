import {USER_LOGIN, USER_LOGOUT} from '../constants/User';
import {UserActions} from '../actions/UserAction';
import User from '../../models/UserModel';

const initialState: User = {
  userId: null,
  userEmail: null,
  userName: null,
};

export default (state = initialState, action: UserActions) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userId: action.payload.userId,
        userEmail: action.payload.userEmail,
        userName: action.payload.userName,
      };
    case USER_LOGOUT:
      return {
        initialState,
      };
    default:
      return state;
  }
};
