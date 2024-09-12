import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#952929',
      accent: '#bdb6b6',
    },
    secondary: {
      main: '#000000',
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
        main: '#bdb6b6',
      },
    },
    '&.btn': {
      primary: {
        main: '#000000',
      },
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#952929',
          backgroundImage: 'none',
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
            backgroundColor: '#000000',
            color: '#acaaac',
          },
          },
        },
        MuiButtonBase: {
          styleOverrides: {
            root: {
              backgroundColor: '#c2bfbf',
              color: '#beb3b3',
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
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: '#ffffff !important',
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
          backgroundColor: '#000000',
          color: '#c4c0c0',
          '&:hover': {
            backgroundColor: '#000000',
          },
        },
        containedPrimary: {
          backgroundColor: '#000000',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#000000',
          },
          '&.MuiButton-contained': {
            backgroundColor: '#000000',
            color: '#000000',
            '&:hover': {
              backgroundColor: '#000000',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#d6d6d6ff',
          color: '#d3d3d3',
          '&.css-10r5afb-MuiPaper-root-MuiAppBar-root': {
            backgroundImage: 'none',
          },
        },
      },
    },
  },
);

export default lightTheme;