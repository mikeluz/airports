import { combineReducers } from 'redux';

const appReducer = combineReducers({
  // logged-in user
  airports: require('./airports').default,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
