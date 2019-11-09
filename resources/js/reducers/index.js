import { combineReducers } from 'redux';
import auth from "./auth";

const getReducers = () => {
  return combineReducers({
    auth,
  });
};

export default getReducers;