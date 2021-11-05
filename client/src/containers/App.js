import React from 'react';
import Navbar from './Navbar';
import Main from './Main';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Main />
      </ThemeProvider>
    </div>
  );
};

export default App;
