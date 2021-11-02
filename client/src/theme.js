import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import '@fontsource/open-sans';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#8bc34a',
      },
    },
    typography: {
      fontFamily: 'Open Sans',
    },
  })
);

export default theme;
