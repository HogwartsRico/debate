import { AUTH_USER, LOGOUT, GET_AUTH_USER } from '../constants/types';
import api from '../services/api';
import { removeToken } from '../utils';

export const register = ({ username, mobile, password, verificationCode }) => {
  return dispatch => {
    return api
      .register({
        username,
        mobile,
        password,
        verification_code: verificationCode
      })
      .then(response => {
        dispatch({
          type: AUTH_USER,
          payload: response.token
        });
        return response;
      });
  };
};

export const login = ({ mobile, password }) => {
  return dispatch => {
    return api.login({ mobile, password }).then(response => {
      dispatch({
        type: AUTH_USER,
        payload: response.token
      });
      return response;
    });
  };
};

export const logout = () => {
  return dispatch => {
    removeToken();
    dispatch({ type: LOGOUT });
  };
};

export const getUser = () => {
  return dispatch => {
    dispatch({ type: GET_AUTH_USER.PENDING });

    return api.getUser().then(response => {
      dispatch({
        type: GET_AUTH_USER.SUCCESS,
        payload: response
      });
    });
  };
};
