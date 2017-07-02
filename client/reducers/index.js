import { combineReducers } from 'redux';

const appReducer = combineReducers({
  airports: require('./airports').default,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
