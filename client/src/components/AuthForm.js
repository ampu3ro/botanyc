import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authUser, forgotPassword, checkToken } from '../store/actions/auth';
import { validate } from 'react-email-validator';
import Header from './Header';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AuthForm = ({ authType, buttonText, heading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const currentUser = useSelector((state) => state.currentUser);

  const history = useHistory();
  const dispatch = useDispatch();
  const resetToken = useParams().token;

  const handleSubmit = () => {
    if (authType === 'forgot') {
      dispatch(forgotPassword(email));
    } else {
      dispatch(authUser(authType, username, password, email, resetToken));
    }
  };

  useEffect(() => {
    if (authType === 'reset') {
      dispatch(checkToken(resetToken));
    }
  }, [authType, dispatch, resetToken]);

  useEffect(() => {
    if (currentUser.isAuthenticated) {
      const path = authType === 'signup' ? '/farm' : '/';
      history.push(path);
    }
  }, [authType, currentUser, history]);

  const signUpIn = ['signin', 'signup'].includes(authType);

  return (
    <div>
      <Header text={heading} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Stack spacing={2}>
            {signUpIn && (
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            {signUpIn && (
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
            {authType === 'signup' && (
              <TextField
                type="password"
                label="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                error={password !== passwordConfirm}
              />
            )}
            {authType !== 'signin' && (
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </Stack>
        </Grid>
        <Box width="100%" />
        <Grid item>
          <Button
            variant="contained"
            disabled={
              (signUpIn && (username.length <= 3 || password.length <= 3)) ||
              (authType !== 'signin' && !validate(email)) ||
              (authType === 'signup' && password !== passwordConfirm)
            }
            onClick={handleSubmit}
          >
            {buttonText}
          </Button>
        </Grid>
        {authType === 'signin' && (
          <Grid item>
            <Button
              size="small"
              onClick={() => history.push('/forgot')}
              disabled={!validate(email)}
            >
              Forgot Password
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default AuthForm;
