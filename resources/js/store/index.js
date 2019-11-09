import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import getReducers from '../reducers';

const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const initStore = (initialState) => {
  let store = createStore(
    getReducers(),
    initialState || {},
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );

  return store;
}