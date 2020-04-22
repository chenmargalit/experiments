import { MAIN_ERROR, NOT_AUTHORIZED } from '../actions/types';

const errorsReducer = (state = [], action) => {
  switch (action.type) {
    case MAIN_ERROR:
      console.log('reducer - main error');
      return {
        ...state,
        error: action.payload,
      };
    case NOT_AUTHORIZED:
      console.log('reducer - not authorized');
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default errorsReducer;
