import { combineReducers } from 'redux';
import currentUser from './currentUser';
import alert from './alert';
import location from './location';
import geocoded from './geocoded';
import edit from './edit';
import bulkEdits from './bulkEdits';
import filters from './filters';
import users from './users';
import search from './search';
import approvals from './approvals';
import selected from './selected';

const rootReducer = combineReducers({
  currentUser,
  alert,
  location,
  geocoded,
  edit,
  bulkEdits,
  filters,
  users,
  search,
  approvals,
  selected,
});

export default rootReducer;
