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
import { useCookies } from 'react-cookie';


function LeaderBoardItem({user}) {
  const [cookies] = useCookies('session_id');
  const [installation_id, setInstallationId] = useState('');
  const user_id = cookies.session_id
  const [receivedUsernames, setReceivedUsernames] = useState([]);
  const notify = (user, points) => toast(user + ' ' + 'has gained' + ' ' + points + ' ' + 'points!', {
    theme:"dark"
  })

  useEffect(() => {
    const socket = io("http://localhost:5555", {
      transports: ["websocket"],
      upgrade: false,
    });
 
    socket.on("connect", () => {
      console.log("client connected");
      socket.emit("interact", user_id, installation_id);
    });
 
    socket.on("interact_data", (username) => {
      console.log("data received");
      if (!receivedUsernames.includes(username)) {
        notify(username);
        setReceivedUsernames((prevUsernames) => [
          ...prevUsernames,
          username,
        ]);
      }
    });
 
    socket.on("points_gained", (username) => {
      console.log("points gained", username);
      notify(username);
      setReceivedUsernames((prevUsernames) => [
        ...prevUsernames,
        username,
      ]);
    });
 
    socket.on("disconnect", (data) => {
      console.log(data);
    });
 
    return function cleanup() {
      socket.off("interact_data");
      socket.off("points_gained");
    };
  }, [receivedUsernames]);

  
  return (
    <Container disableGutters="true" sx={{ bgcolor: '#262129', color: "#262129"}}>
        <Box disableGutters="true" sx={{ bgcolor: '#262129', display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'10px'}}>
        <Grid container sx={{ bgcolor: '#262129', margin:"0px", padding:"0px"}} >
        <Card sx={{  width: '500px', margin: 'auto', padding: '5px' }} elevation={3} spacing={3}>
        <CardContent sx={{borderRadius: 50, color: '#262129',}} elevation={3} xs={4} >
        <Typography gutterBottom variant="h4" component="div" textAlign="center">
        {user.points} points
      </Typography>
        <Typography sx={{color: "#3959cf"}}gutterBottom variant="h5" component="div" textAlign="center">
        @{user.username}
        </Typography>
    </CardContent>
    </Card>
    </Grid>
    </Box>
    </Container>
  );
}

export default LeaderBoardItem