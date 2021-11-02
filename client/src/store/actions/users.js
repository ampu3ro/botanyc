import { apiCall } from '../../services/api';
import { SET_USERS } from '../actionTypes';
import { setAlert } from './alert';

export function setUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}

export function fetchUsers() {
  return async (dispatch) => {
    try {
      const users = await apiCall('get', '/api/user/fetch');
      dispatch(setUsers(users));
    } catch (err) {
      dispatch(setAlert({ severity: 'error', message: err.message }));
    }
  };
}

export function editUser(user) {
  return async (dispatch) => {
    try {
      await apiCall('post', '/api/user/edit', user);
      dispatch(fetchUsers());
      dispatch(
        setAlert({
          severity: 'success',
          message: `Successfully updated ${user.email}!`,
        })
      );
    } catch (err) {
      dispatch(setAlert({ severity: 'error', message: err.message }));
    }
  };
}
