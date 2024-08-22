import {useContext, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { UserContext } from '../../context/UserContext';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { SocketContext } from '../../context/SocketContext';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';


function TeamLeaderBoardItem({team}) {
  const [socketInstance, setSocketInstance] = useState("");
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [username, setUsername] = useState("")
  const notify = (user, points) => toast(user + ' ' + 'has gained' + ' ' + points + ' ' + 'points!', {
    theme:"dark"
  })
    
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Container disableGutters="true" sx={{ bgcolor: '#262129', color: "#262129"}}>
        <Box disableGutters="true" sx={{ bgcolor: '#262129', display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'10px'}}>
        <Grid container sx={{ bgcolor: '#262129', margin:"0px", padding:"0px"}} >
        <Card sx={{  width: '500px', margin: 'auto', padding: '5px' }} elevation={3} spacing={3}>
        <CardContent sx={{borderRadius: 50, color: '#262129',}} elevation={3} xs={4} >
        <Typography gutterBottom variant="h4" component="div" textAlign="center">
        {team.points} points
      </Typography>
        <Typography sx={{color: "#3959cf"}}gutterBottom variant="h5" component="div" textAlign="center">
        @{team.name}
        </Typography>
    </CardContent>
    </Card>
    </Grid>
    </Box>
    </Container>
  );
}

export default TeamLeaderBoardItem