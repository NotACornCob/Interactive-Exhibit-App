import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#8e24aa',
      },
      secondary: {
        main: '#2196f3',
      },
      background: {
        default: '#1e1b19',
      },
    },
    typography: {
      fontFamily: 'Lato',
      h1: {
        fontFamily: 'Raleway',
      },
      h2: {
        fontFamily: 'Raleway',
      },
      h3: {
        fontFamily: 'Raleway',
      },
      h4: {
        fontFamily: 'Raleway',
      },
      h5: {
        fontFamily: 'Raleway',
      },
      h6: {
        fontFamily: 'Oswald',
      },
    },
    spacing: 8,
  },
);

export default theme;
