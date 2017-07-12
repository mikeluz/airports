import axios from 'axios';

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_MAP:
    return action.map;
  }
  return state;
};

const SET_MAP = 'SET_MAP';
export const setMap = map => ({
  type: SET_MAP, map
});

export default reducer;