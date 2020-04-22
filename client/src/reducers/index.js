import { combineReducers } from 'redux';
import errors from './errorsReducer';
import data from './dataReducer';
import users from './usersReducer';
import success from './successReducer';

export default combineReducers({
  data,
  errors,
  users,
  success,
});
