import { apiCall } from '../../services/api';
import { fetchLocations } from './locations';
import { SET_EDIT, SET_BULK_EDIT, SET_APPROVALS } from '../actionTypes';
import { setAlert } from './alert';

export function submitOne(data) {
  return async (dispatch) => {
    try {
      const result = await apiCall('post', '/api/farm/approval/submit', data);
      const message = `Successfully submitted ${result.name} for review!`;
      dispatch(setAlert({ severity: 'success', message }));
      return dispatch(fetchLocations());
    } catch (err) {
      dispatch(setAlert({ message: err?.message }));
    }
  };
}

export function setEdit(data) {
  return {
    type: SET_EDIT,
    data,
  };
}

export function editOne(data) {
  return async (dispatch) => {
    try {
      const result = await apiCall('post', '/api/farm/auth/edit', data);
      const verb = result.lastErrorObject.updatedExisting
        ? 'updated'
        : 'inserted';
      const message = `Successfully ${verb} ${result.value.name}!`;
      dispatch(setAlert({ severity: 'success', message }));
      return dispatch(fetchLocations());
    } catch (err) {
      dispatch(setAlert({ message: err?.message }));
    }
  };
}

export function setBulkEdit(result) {
  return {
    type: SET_BULK_EDIT,
    result,
  };
}

export function editBulk(data) {
  return async (dispatch) => {
    try {
      const result = await apiCall('post', '/api/farm/admin/bulk', data);
      dispatch(setBulkEdit(result));
      dispatch(
        setAlert({ severity: 'success', message: 'Bulk write finished!' })
      );
      return dispatch(fetchLocations());
    } catch (err) {
      dispatch(setAlert({ message: err?.message }));
    }
  };
}

export function deleteOne(data) {
  return async (dispatch) => {
    try {
      await apiCall('post', '/api/farm/auth/delete', data);
      const message = `Successfully deleted ${data.data.name}!`;
      dispatch(setAlert({ severity: 'success', message }));
      return dispatch(fetchLocations());
    } catch (err) {
      dispatch(setAlert({ message: err?.message }));
    }
  };
}

export function setApprovals(data) {
  return {
    type: SET_APPROVALS,
    data,
  };
}

export function fetchApprovals() {
  return async (dispatch) => {
    try {
      const data = await apiCall('get', '/api/farm/admin/approvals');
      dispatch(setApprovals(data));
    } catch (err) {
      dispatch(setApprovals({}));
      dispatch(setAlert({ message: err?.message }));
    }
  };
}
