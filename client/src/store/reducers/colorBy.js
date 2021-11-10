import { SET_COLOR_BY } from '../actionTypes';

const colorBy = (state = 'type', action) => {
  switch (action.type) {
    case SET_COLOR_BY:
      return action.payload;
    default:
      return state;
  }
};

export default colorBy;
