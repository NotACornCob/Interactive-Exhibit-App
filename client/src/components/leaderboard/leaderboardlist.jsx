import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';
import LeaderBoardItem from './leaderboarditem';
import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function UserLeaderBoardList() {
  const { users } = useContext(UserContext);
  const [leaderBoard, setLeaderBoard] = useState([]);
  const socket = useContext(SocketContext);
  const theme = useTheme();

  useEffect(() => {
    console.log('Current users:', users); // Debug log

    // Initial render of existing users
    if (users && users.length > 0) {
      const sortedUsers = [...users].sort((a, b) => b.points - a.points);
      const LeaderBoardItems = sortedUsers.map(user => 
        <LeaderBoardItem key={user.id} user={user} />
      );
      setLeaderBoard(LeaderBoardItems);
    }

    // Socket listener for updates
    if (socket) {
      socket.on('users_data', (updatedUsers) => {
        console.log('Received updated users data:', updatedUsers);
        const sortedUsers = [...updatedUsers].sort((a, b) => b.points - a.points);
        const LeaderBoardItems = sortedUsers.map(user => 
          <LeaderBoardItem key={user.id} user={user} />
        );
        setLeaderBoard(LeaderBoardItems);
      });

      // Request initial data
      socket.emit('users', {});

      return () => socket.off('users_data');
    }
  }, [socket, users]);

  return (
    <Container>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography 
            variant="h4" 
            sx={{ 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: "10px",
              color: theme.palette.mode === 'dark' ? 'white' : 'black'
            }}
          >
            REC Leaderboard
          </Typography>
        </Grid>
        {leaderBoard.length > 0 ? (
          <div>{leaderBoard}</div>
        ) : (
          <Typography color="text.primary">Loading leaderboard...</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default UserLeaderBoardList;