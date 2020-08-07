import { AsyncStorage } from 'react-native';
import signupApi from '../../api/signupApi';
import loginApi from '../../api/loginApi';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
let timer;

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({ token, userId, expirationDate })
  );
};

export const authenticate = (token, userId, expirationTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expirationTime));
    dispatch({ type: AUTHENTICATE, token, userId });
  };
};

export const signup = (email, password) => {
  console.log(email, password, 'inside signup action');
  return (dispatch) => {
    return signupApi
      .post('', { email, password, returnSecureToken: true })
      .then(({ data }) => {
        const expInMilSec = parseInt(data.expiresIn) * 1000;
        const expirationDate = new Date(
          new Date().getTime() + expInMilSec
        ).toISOString();
        saveDataToStorage(data.idToken, data.localId, expirationDate);
        return dispatch(authenticate(data.idToken, data.localId, expInMilSec));
      })
      .catch((e) => {
        console.log(e.response.data.error.message);
        const eCode = e.response.data.error.message;
        let message = 'Something went wrong';
        if (eCode === 'EMAIL_EXISTS') {
          message = ' The email address is already in use by another account';
        } else if (eCode === 'OPERATION_NOT_ALLOWED') {
          message = 'Password sign-in is disabled';
        } else {
          message = eCode;
        }
        throw new Error(message);
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    return loginApi
      .post('', { email, password, returnSecureToken: true })
      .then(({ data }) => {
        const expInMilSec = parseInt(data.expiresIn) * 1000;
        const expirationDate = new Date(
          new Date().getTime() + expInMilSec
        ).toISOString();
        saveDataToStorage(data.idToken, data.localId, expirationDate);
        return dispatch(authenticate(data.idToken, data.localId, expInMilSec));
      })
      .catch((e) => {
        console.log(e.response.data.error.message);
        const eCode = e.response.data.error.message;
        let message = 'Something went wrong';
        if (eCode === 'EMAIL_NOT_FOUND') {
          message = 'The email could not be found';
        } else if (eCode === 'INVALID_PASSWORD') {
          message = 'The password is not valid';
        } else {
          message = eCode;
        }
        throw new Error(message);
      });
  };
};

const clearLogoutTimer = () => {
  if (timer) clearTimeout(timer);
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

export const setLogoutTimer = (mSec) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, mSec);
  };
};

