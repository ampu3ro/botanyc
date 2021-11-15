import { SET_DISTRICTS } from '../actionTypes';

const district = (state = {}, action) => {
  switch (action.type) {
    case SET_DISTRICTS:
      return action.data;
    default:
      return state;
  }
};

export default district;
