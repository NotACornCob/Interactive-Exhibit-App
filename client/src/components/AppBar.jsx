import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AllInclusiveTwoToneIcon from '@mui/icons-material/AllInclusiveTwoTone';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background:'purple', filter: "drop-shadow(0px 3px 5px #4444dd)"}}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, "text-align":"center", margin: "10px" }}>
            INVICTUS MUSEUM
          </Typography>
      </AppBar>
    </Box>
  );
}