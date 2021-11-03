import { SET_SELECTED } from '../actionTypes';

const selected = (state = null, action) => {
  switch (action.type) {
    case SET_SELECTED:
      return action.data;
    default:
      return state;
  }
};

export default selected;
