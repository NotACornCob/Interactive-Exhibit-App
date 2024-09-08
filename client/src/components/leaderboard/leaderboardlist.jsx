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
import { SocketContext } from '../../context/SocketContext.jsx';

function UserLeaderBoardList() {
  const { users } = useContext(UserContext);
  const plainUsers = JSON.parse(JSON.stringify(users));
  const [userId, setUserId] = useState("");
  const [updatedUser, setUpdatedUser] = useState("");
  const [leaderBoard, setLeaderBoard] = useState([]);
  const socket = useContext(SocketContext);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  useEffect(() => {
    if (socket) {
      socket.emit('users', plainUsers);

      socket.on("users_data", (updated_user) => {
        setUserId(updated_user.id);
        setUpdatedUser(updated_user);
        const LeaderBoardItems = updated_user.map(user => <LeaderBoardItem key={ user.id } user={ user } />);
        setLeaderBoard(LeaderBoardItems);
      });

      return () => {
        socket.off("users_data");
      };
    }
  }, [socket, users, plainUsers]);

  return (
    <Container sx={{ bgcolor: '#262129'}}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" sx={{bgcolor:"#262129", color:"#ffffff", alignItems: 'center', justifyContent: 'center', padding:"10px"}}>REC Leaderboard</Typography>
        </Grid>
        <div>{leaderBoard}</div>
      </Grid>
    </Container>
  );
}

export default UserLeaderBoardList;