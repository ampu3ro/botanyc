import { combineReducers } from 'redux';
import currentUser from './currentUser';
import alert from './alert';
import farm from './farm';
import market from './market';
import district from './district';
import geocoded from './geocoded';
import edit from './edit';
import bulkEdits from './bulkEdits';
import filters from './filters';
import layers from './layers';
import users from './users';
import search from './search';
import approvals from './approvals';
import selected from './selected';
import display from './display';
import colorBy from './colorBy';
import sizeBy from './sizeBy';
import densityBy from './densityBy';
import poi from './poi';

const rootReducer = combineReducers({
  currentUser,
  alert,
  farm,
  market,
  district,
  geocoded,
  edit,
  bulkEdits,
  filters,
  layers,
  users,
  search,
  approvals,
  selected,
  display,
  colorBy,
  sizeBy,
  densityBy,
  poi,
});

export default rootReducer;
