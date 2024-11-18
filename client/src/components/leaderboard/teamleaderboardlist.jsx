import React, { useState, useEffect, useContext } from 'react';
import { TeamContext } from '../../context/TeamContext';
import { SocketContext } from '../../context/SocketContext';
import TeamLeaderBoardItem from './teamleaderboarditem';
import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function TeamLeaderBoardList() {
  const { teams } = useContext(TeamContext);
  const [teamLeaderBoard, setTeamLeaderBoard] = useState([]);
  const socket = useContext(SocketContext);
  const theme = useTheme();

  useEffect(() => {
    console.log('Current teams:', teams); // Debug log

    // Initial render of existing teams
    if (teams && teams.length > 0) {
      const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
      const TeamLeaderBoardItems = sortedTeams.map(team => 
        <TeamLeaderBoardItem key={team.id} team={team} />
      );
      setTeamLeaderBoard(TeamLeaderBoardItems);
    }

    // Socket listener for updates
    if (socket) {
      socket.on('teams_data', (updatedTeams) => {
        console.log('Received updated teams data:', updatedTeams);
        const sortedTeams = [...updatedTeams].sort((a, b) => b.points - a.points);
        const TeamLeaderBoardItems = sortedTeams.map(team => 
          <TeamLeaderBoardItem key={team.id} team={team} />
        );
        setTeamLeaderBoard(TeamLeaderBoardItems);
      });

      // Request initial data
      socket.emit('teams', {});

      return () => socket.off('teams_data');
    }
  }, [socket, teams]);

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
            Team Leaderboard
          </Typography>
        </Grid>
        {teamLeaderBoard.length > 0 ? (
          <div>{teamLeaderBoard}</div>
        ) : (
          <Typography color="text.primary">Loading leaderboard...</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default TeamLeaderBoardList;