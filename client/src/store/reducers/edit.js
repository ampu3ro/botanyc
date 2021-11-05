import { SET_EDIT } from '../actionTypes';

const edit = (state = null, action) => {
  switch (action.type) {
    case SET_EDIT:
      return action.data;
    default:
      return state;
  }
};

export default edit;
