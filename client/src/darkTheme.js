import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#d4d1d4',
    },
    background: {
      default: '#1a191a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      paragraph: '#000000',
      h4: '#ffffff',
    },
    typography: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      color: '#ffffff',
  },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          h4: {
            color: '#3959cf',
          },
        },
      },
    },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          backgroundImage: 'none !important',
          color: '#000000',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '&.css-z1to57-MuiPaper-root-MuiCard-root': {
            backgroundColor: 'none',
            color: '#010506',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
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
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#010506',
          backgroundImage: 'none',
          color: '#ffffff',
          '&.css-10r5afb-MuiPaper-root-MuiAppBar-root': {
            backgroundImage: 'none',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          primary: '#ffffff',
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#625f63',
          color: '#b31111',
          '&:hover': {
            backgroundColor: '#4d4b4f',
          },
        },
        containedPrimary: {
          backgroundColor: '#625f63',
          color: '#b37e7e',
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

