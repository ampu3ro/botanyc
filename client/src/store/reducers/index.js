import { combineReducers } from 'redux';
import currentUser from './currentUser';
import alert from './alert';
import locations from './locations';
import geocoded from './geocoded';
import edits from './edits';
import filters from './filters';
import users from './users';
import search from './search';
import approvals from './approvals';

const rootReducer = combineReducers({
  currentUser,
  alert,
  locations,
  geocoded,
  edits,
  filters,
  users,
  search,
  approvals,
});

export default rootReducer;
