import { SUCCESS } from '../actions/types';

const successReducer = (state = '', action) => {
  switch (action.type) {
    case SUCCESS:
      console.log('some success happened');
      return {
        state: action.payload,
      };
    default:
      return state;
  }
};

export default successReducer;
