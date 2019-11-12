import { combineReducers } from 'redux';
import auth from "./auth";
import user from "./user";
import ui from './ui';

const getReducers = () => {
  return combineReducers({
    auth,
    user,
    ui,
  });
};

export default getReducers;