import React from 'react';
import Navbar from './Navbar';
import Main from './Main';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Box sx={{ padding: 2 }}>
          <Main />
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default App;
