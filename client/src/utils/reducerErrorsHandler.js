import { NOT_AUTHORIZED, MAIN_ERROR } from '../actions/types';

const errorTypeFunc = (dispatch, errorCode) => {
  console.log('errorCode is', errorCode);
  switch (errorCode) {
    case 401:
      return dispatch({
        type: NOT_AUTHORIZED,
        payload: 'Could not find a user with this password',
      });
    case 500:
      return dispatch({ type: MAIN_ERROR, payload: 'Problem processing request' });
  }
};

export default errorTypeFunc;
