import { ADD_DATA, FETCH_DATA } from '../actions/types';

const dataReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
