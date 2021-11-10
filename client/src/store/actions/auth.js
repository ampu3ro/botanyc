import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { setAlert } from './alert';
import { setUsers } from './users';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return (dispatch) => {
    localStorage.clear();
    setAuthorizationToken(null);
    dispatch(setUsers([]));
    dispatch(setCurrentUser({}));
  };
}

export function authUser(type, username, password, email, resetToken) {
  return async (dispatch) => {
    try {
      const userData = {
        username,
        password,
        email,
        resetToken,
      };
      const { token, ...user } = await apiCall(
        'post',
        `/api/auth/${type}`,
        userData
      );
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(user));
      if (type !== 'signin') {
        const alert = {
          severity: 'success',
          message:
            type === 'reset'
              ? 'Password updated successfully'
              : `User:${username} created successfully`,
        };
        dispatch(setAlert(alert));
      }
    } catch (err) {
      dispatch(setAlert({ message: err?.message }));
    }
  };
}

export function forgotPassword(email) {
  return async (dispatch) => {
    try {
      await apiCall('post', '/api/auth/forgot', { email });
      dispatch(
        setAlert({
          severity: 'success',
          message: `Reset password link sent to ${email}`,
        })
      );
    } catch (err) {
      dispatch(setAlert({ message: err?.message.response }));
    }
  };
}

export function checkToken(token) {
  return async (dispatch) => {
    try {
      const result = await apiCall('get', `/api/auth/reset/${token}`);
      if (!result.email) {
        dispatch(setAlert({ message: 'Invalid/expired reset token' }));
      }
    } catch (err) {
      dispatch(setAlert({ message: err?.message }));
    }
  };
}
