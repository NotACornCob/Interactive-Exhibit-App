import React from 'react';
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import LeaderBoardItem from './leaderboarditem';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


function UserLeaderBoardList() {
  const { users } = useContext(UserContext);
  const plainUsers = JSON.parse(JSON.stringify(users));
  const [socketInstance, setSocketInstance] = useState("");
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState("")
  const [updatedUser, setUpdatedUser] = useState("")
  const [leaderBoard, setLeaderBoard] = useState([])
    
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === '#1A2027',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
  
      useEffect(() => {
      const socket = io("http://localhost:5555", {
        transports: ["websocket"],
        upgrade: false,
        autoconnect: false,
      });

      setSocketInstance(socket);
      
      socket.on("connect", () => {
       socket.emit('users', plainUsers)
      })

      socket.on("users_data", (updated_user) => {
        setUserId(updated_user.id)
        setUpdatedUser(updated_user)
        const LeaderBoardItems = updated_user.map(user => <LeaderBoardItem key={ user.id } user={ user } />)
        setLeaderBoard(LeaderBoardItems)
      })

    }
  , [users]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 90 },
    { field: 'points', headerName: 'Points', width: 90 },
  ];
    
    return (
      <Container sx={{ bgcolor: '#262129'}}>
        <Grid container direction="column"
        justify="center"
        alignItems="center"
        disableGutters="true">
        <Grid item xs={12} >
          <Typography variant="h4" sx={{bgcolor:"#262129", color:"#ffffff", alignItems: 'center', justifyContent: 'center', padding:"10px"}}>REC Leaderboard</Typography>
      </Grid>
    <div>{leaderBoard}</div>
    </Grid>
    </Container>
    )
}

export default UserLeaderBoardList;