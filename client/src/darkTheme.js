import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#625f63',
    },
    secondary: {
      main: '#625f63',
    },
    background: {
      default: '#3b393b',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      paragraph: '#ffffff',
    },
    typography: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      color: '#ffffff',
  },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff'
        },
      },
    },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#625f63',
          color: '#ffffff',
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'none',
          backgroundImage: 'none',
          '&.css-z1to57-MuiPaper-root-MuiCard-root': {
            backgroundColor: 'none',
            color: '#010506',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          backgroundColor: '#010506',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#625f63',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#4d4b4f',
          },
        },
        containedPrimary: {
          backgroundColor: '#625f63',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#4d4b4f',
          },
          '&.MuiButton-contained': {
            backgroundColor: '#625f63',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#4d4b4f',
            },
          },
        },
      },
    },
  },
}});

export default darkTheme;

