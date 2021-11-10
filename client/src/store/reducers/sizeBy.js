import { SET_SIZE_BY } from '../actionTypes';

const sizeBy = (state = 'area', action) => {
  switch (action.type) {
    case SET_SIZE_BY:
      return action.payload;
    default:
      return state;
  }
};

export default sizeBy;
