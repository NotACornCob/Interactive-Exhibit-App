import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8869aa',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#dfdedf',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
    button: {
      primary: {
        main: '#ff6600',
      },
    },
    '&.btn': {
      primary: {
        main: '#ff6600',
      },
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#88698a',
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
      MuiBox: {
        styleOverrides: {
          root: {
            backgroundColor: '#acaaac',
            color: '#acaaac',
          },
          },
        },
        MuiButtonBase: {
          styleOverrides: {
            root: {
              backgroundColor: '#ff6600',
              color: '#ff6600',
            },
            },
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
    MuiButtonContained: {
      primary: '#ff6600',
      styleOverrides: {
        root: {
          primary: '#ff6600',
          backgroundColor: '#ff6600',
          color: '#ff6600',
          '&:hover': {
            backgroundColor: '#ff6600',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ff6600',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#e65c00',
          },
        },
      },
    },
  },
);

export default lightTheme;