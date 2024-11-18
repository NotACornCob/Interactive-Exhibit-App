import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useCookies } from 'react-cookie';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '../../context/ThemeContext';
import lightTheme from '../../lightTheme';
import darkTheme from '../../darkTheme';
import Switch from '@mui/material/Switch';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import 'react-toastify/dist/ReactToastify.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { ToastContainer, toast } from 'react-toastify';
import { useNotification } from '../../context/NotificationContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const pages = [  { text: 'Home', href: '/' },
                 { text: 'Reviews', href: '/Reviews' },
                 { text:'Leaderboard', href: '/Leaderboard'},
                 { text:'Team Leaderboard', href: '/TeamLeaderboard'}
                ];
const settings = [ { text: 'Profile', href: '/Profile' },
                  { text: 'Logout', href: '/Logout'}
];

const styles = {
  menuButton: {
    color: '#ffffff',
  },
  typography: {
    color: '#ffffff',
    fontFamily: 'Lato, sans-serif',
  },
  button: {
    color: '#ffffff !important',
    '&:hover': {
      color: '#ffffff !important',
    },
  },
};


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [cookies] = useCookies(['session_id']);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const hasCookie = !!cookies.username;
  const { notificationCount, resetNotificationCount } = useNotification();
  const { toasts, removeToast } = useToast();
  const navigate = useNavigate();

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
    resetNotificationCount(); // Reset count when opening menu
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const addNotification = (message) => {
    toast(message);
    setNotificationCount((prevCount) => prevCount + 1);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavigation = (href) => {
    handleCloseNavMenu();
    navigate(href);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box>
      {hasCookie ? (
        <AppBar position="static" sx={{ backgroundImage: 'none' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <VideogameAssetIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#ffffff' }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                REC CENTER
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem 
                      key={page.text} 
                      onClick={() => handleNavigation(page.href)}
                    >
                      <Typography textAlign="center">{page.text}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <VideogameAssetIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#ffffff' }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                REC CENTER
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.text}
                    href={page.href}
                    onClick={handleCloseNavMenu}
                    sx={styles.button}
                  >
                    {page.text}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              <Switch aria-label="login switch" onClick={toggleTheme} />
                <Tooltip title="Open settings">
                  <IconButton color="#ffffff" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleIcon fontSize="large" sx={{ fill: '#ffffff' }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.text} href={setting.href} onClick={handleCloseUserMenu}>
                      <Button href={setting.href} variant="contained" color="primary" >{setting.text}</Button>
                    </MenuItem>
                  ))}
                </Menu>
                <IconButton onClick={handleOpenNotificationsMenu} sx={{ p: 0, ml: 2 }}>
                      <Badge badgeContent={notificationCount} color="error">
                        <NotificationsIcon sx={{ fill: '#ffffff' }} />
                      </Badge>
                </IconButton>
                <Menu
                    sx={{ mt: '45px' }}
                    id="notifications-appbar"
                    anchorEl={anchorElNotifications}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElNotifications)}
                    onClose={handleCloseNotificationsMenu}
                  >
                    {toasts.map((toast) => (
                      <MenuItem key={toast.id} onClick={() => removeToast(toast.id)}>
                        <Typography textAlign="center">{toast.message}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : null}
      </Box>
    </ThemeProvider>
  );
}

export default ResponsiveAppBar;