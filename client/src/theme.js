import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            bgcolor: '#262129',
          }
        }
      }
    },
    palette: {
      primary: {
        main: '#302f30',
      },
      secondary: {
        main: '#302f30',
      },
      background: {
        default: '#262129',
      },
    button: {    
      primary: '#cf25cf',
      secondary: '#ee3832',}
    },
    typography: {
      fontFamily: 'Lato',
      h1: {
        fontFamily: 'Lato',
      },
      h2: {
        fontFamily: 'Lato',
      },
      h3: {
        fontFamily: 'Lato',
      },
      h4: {
        fontFamily: 'Lato',
      },
      h5: {
        fontFamily: 'Lato',
      },
      h6: {
        fontFamily: 'Oswald',
      },
    },
    spacing: 8,
  },
);

export default theme;
