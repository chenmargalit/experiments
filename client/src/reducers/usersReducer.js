import { USER_AUTH } from '../actions/types';

const usersReducer = (state = { email: '' }, action) => {
  switch (action.type) {
    case USER_AUTH:
      console.log('signin working in usersReducer');
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};
export default usersReducer;
