import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import App from './containers/App';
import { setAuthorizationToken, setCurrentUser } from './store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore();

// "hydration"
const token = localStorage.jwtToken;
if (token) {
  setAuthorizationToken(token);
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(token)));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.querySelector('#root')
);
