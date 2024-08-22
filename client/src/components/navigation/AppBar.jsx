import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useCookies } from 'react-cookie';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

const pages = [  { text: 'Home', href: '/' },
                 { text: 'Exhibits', href: '/Exhibits' }];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cookies] = useCookies(['session_id']);
  const hasCookie = !!cookies.username;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
       {hasCookie ? (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <VideogameAssetIcon sx={{ display: { color:'#ffffff', xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'vertical',
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
              color='#ffffff'
              sx={{ color: '#ffffff' }}
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
              }}>
              <MenuItem key={0} onClick={handleCloseNavMenu}>
              <Typography textAlign="center"><Button href="/">Home</Button></Typography>
              </MenuItem>
              <MenuItem key={1} onClick={handleCloseNavMenu}>
              <Typography textAlign="center"><Button href="/Exhibits">Exhibit Center</Button></Typography>
              </MenuItem>
              <MenuItem key={2} onClick={handleCloseNavMenu}>
              <Typography textAlign="center"><Button href="/Reviews">Reviews</Button></Typography>
              </MenuItem>
              <MenuItem key={3} onClick={handleCloseNavMenu}>
              <Typography textAlign="center"><Button href="/Leaderboard">Leaderboard</Button></Typography>
              </MenuItem>
              <MenuItem key={4} onClick={handleCloseNavMenu}>
              <Typography textAlign="center"><Button href="/TeamLeaderboard">Team Leaderboard</Button></Typography>
              </MenuItem>
            </Menu>
          </Box>
          <VideogameAssetIcon sx={{ display: { color: '#ffffff', xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
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
              <Button
                href="/"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#ffffff', display: 'block' }}
              >
               Home
              </Button>
              <Button
                href="/Reviews"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#ffffff', display: 'block' }}
              >
               Reviews
              </Button>
              <Button
                href="/Leaderboard"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#ffffff', display: 'block' }}
              >
               Leaderboard
              </Button>
              <Button
                href="/TeamLeaderboard"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#d2c443', display: 'block' }}
              >
               Team LeaderBoard
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ color:'#ffffff', p: 0 }}>
                <Avatar alt="Remy Sharp" src="../src/assets/5580993.png" />
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><Button href="/Profile">Profile</Button></Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar> ) : null}
    </>
  );
}
export default ResponsiveAppBar;