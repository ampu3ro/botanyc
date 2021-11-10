import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocations } from '../store/actions/locations';
import { setAlert } from '../store/actions/alert';
import { setFilters } from '../store/actions/filters';
import { FILTER_DEFAULT } from '../components/data';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import BulkEdit from '../components/BulkEdit';
import FarmForm from '../components/location/FarmForm';
import AdminForm from '../components/AdminForm';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Main = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocations());
    dispatch(setFilters(FILTER_DEFAULT));
  }, [dispatch]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAlert({}));
  };

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Box sx={{ paddingLeft: 4, paddingRight: 4 }}>
          <Route exact path="/signin">
            <AuthForm
              authType="signin"
              buttonText="Log in"
              heading="Welcome back"
            />
          </Route>
          <Route exact path="/signup">
            <AuthForm
              authType="signup"
              buttonText="Sign me up!"
              heading="Join the botaNYC community"
            />
          </Route>
          <Route path="/reset/:token">
            <AuthForm
              authType="reset"
              buttonText="Update"
              heading="Reset your password"
            />
          </Route>
          <Route exact path="/farm">
            <FarmForm />
          </Route>
          <Route exact path="/bulk">
            <BulkEdit />
          </Route>
          <Route exact path="/admin">
            <AdminForm />
          </Route>
        </Box>
      </Switch>
      <Snackbar
        open={alert.isActive}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alert.payload.severity || 'error'}
          variant="filled"
        >
          {alert.payload.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Main;
