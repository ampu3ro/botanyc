import { SET_BULK_EDIT } from '../actionTypes';

const bulkEdits = (state = {}, action) => {
  switch (action.type) {
    case SET_BULK_EDIT:
      return action.result;
    default:
      return state;
  }
};

export default bulkEdits;
