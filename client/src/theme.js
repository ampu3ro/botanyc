import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import '@fontsource/montserrat';
import '@fontsource/frank-ruhl-libre';

// https://www.nyu.edu/employees/resources-and-services/media-and-communications/styleguide/logo-usage--color--and-typography.html
// https://www.nyu.edu/employees/resources-and-services/media-and-communications/styleguide/brand-support-services/website/graphic-visual-design.html
const theme = responsiveFontSizes(
  createTheme({
    palette: {
      type: 'light',
      primary: {
        light: '#8900e1',
        main: '#57068c',
        dark: '#330662',
      },
      secondary: {
        main: '#a1c23b',
      },
      error: {
        main: '#bc0604',
      },
      warning: {
        main: '#bf5909',
      },
      success: {
        main: '#28811e',
      },
    },
    typography: {
      fontFamily: 'Montserrat',
    },
  })
);

export default theme;
