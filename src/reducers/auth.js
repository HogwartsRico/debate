import { AUTH_USER, LOGOUT, GET_AUTH_USER } from '../constants/types';

const initialState = {
  isAuthenticated: false,
  token: '',
  isPendingUser: false,
  user: null
};

export const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: '',
        user: null
      };
    case GET_AUTH_USER.PENDING:
      return {
        ...state,
        isPendingUser: true
      };
    case GET_AUTH_USER.SUCCESS:
      return {
        ...state,
        isPendingUser: false,
        user: action.payload
      };
    case GET_AUTH_USER.ERROR:
      return {
        ...state,
        isPendingUser: false
      };
    default:
      return state;
  }
};
