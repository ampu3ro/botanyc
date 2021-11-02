import { SET_SEARCH } from '../actionTypes';

const search = (state = null, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default search;
