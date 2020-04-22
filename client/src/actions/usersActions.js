import { USER_AUTH } from './types';
import axios from 'axios';
import errorTypeFunc from '../utils/reducerErrorsHandler';
import { NOT_AUTHORIZED } from './types';

export const signup = (data, reDirect) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/users/signUp', data);
    const result = res.data;
    reDirect('/signin');
  } catch (e) {
    console.log('problem with signing up on client side', e);
  }
};

export const signin = (data, reDirect) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/users/signIn', data);
    window.localStorage.setItem('token', res.data.token);
    // dispatch({ type: USER_AUTH, payload: res.data.email });
    reDirect('/home');
  } catch (e) {
    if (e.response) {
      return (
        console.log('response code', e.response.status), errorTypeFunc(dispatch, e.response.status)
      );
    }
    console.log('problem with signin', e);
  }
};
