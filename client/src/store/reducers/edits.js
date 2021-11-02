import { SET_BULK_EDIT } from '../actionTypes';

const edits = (state = {}, action) => {
  switch (action.type) {
    case SET_BULK_EDIT:
      return action.result;
    default:
      return state;
  }
};

export default edits;
