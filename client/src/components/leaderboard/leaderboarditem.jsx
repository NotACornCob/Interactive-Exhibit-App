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

function UserLeaderBoardItem({user}) {
  const [socketInstance, setSocketInstance] = useState("");
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [username, setUsername] = useState("")
  const notify = (user, points) => toast(user + ' ' + 'has gained' + ' ' + points + ' ' + 'points!', {
    theme:"dark"
  })

  // Add debugging logs
  useEffect(() => {
    console.log('UserLeaderBoardItem rendered with user:', user);
    console.log('Points value:', user?.points || 0);
  }, [user]);

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'10px'}}>
        <Grid container sx={{ margin:"0px", padding:"0px"}} >
          <Card 
            sx={{  
              width: '500px', 
              margin: 'auto', 
              padding: '5px',
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#424242' : '#fff',
              border: '1px solid',
              borderColor: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
            }} 
            elevation={3} 
          >
            <CardContent sx={{borderRadius: 50}} elevation={3} xs={4} >
              <Box sx={{ display: 'block' }}>
                <Typography 
                  gutterBottom 
                  variant="h4" 
                  component="div" 
                  textAlign="center"
                  sx={{
                    color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                    display: 'block'
                  }}
                >
                  {`${user.points || 0} points`}
                </Typography>
              </Box>
              <Typography 
                gutterBottom 
                variant="h5" 
                component="div" 
                textAlign="center" 
                sx={{color: "#3959cf"}}
              >
                @{user.username}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </Container>
  );
}

export default UserLeaderBoardItem