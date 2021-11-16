import { SET_DISPLAY } from '../actionTypes';

const display = (state = 'farm', action) => {
  switch (action.type) {
    case SET_DISPLAY:
      return action.payload;
    default:
      return state;
  }
};

export default display;
