import axios from 'axios';
import { MAIN_ERROR, FETCH_DATA } from './types';

export const addData = (data, reDirect) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/create/add_weight', data);
    console.log(res.data);
    reDirect('/home');
  } catch (e) {
    e.response && console.log(e.response.data);
  }
};

export const getData = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem('token');
    // const res = await axios('http://localhost:5000/fetch/get_data', {
    //   method: 'POST',
    //   headers: { Authorization: `Bearer + ${token}` },
    // });
    const res = await axios.post('http://localhost:5000/fetch/get_data', { token });

    dispatch({ type: FETCH_DATA, payload: res.data });
  } catch (e) {
    e.response
      ? dispatch({ type: MAIN_ERROR, payload: e.response.data })
      : console.log('problem with getData client side', e);
  }
};
