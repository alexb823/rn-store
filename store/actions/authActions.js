import signupApi from '../../api/signupApi';
import loginApi from '../../api/loginApi';
import axios from 'axios';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';


export const signup = (email, password) => {
  console.log(email, password, 'inside signup action');
  return (dispatch) => {
    return signupApi
      .post('', { email, password, returnSecureToken: true })
      .then((res) => {
        console.log(res.data);
        return dispatch({ type: SIGNUP });
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    return loginApi
      .post('', { email, password, returnSecureToken: true })
      .then((res) => console.log(res.data))
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };
};
