import React from 'react';
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import TeamLeaderBoardItem from './teamleaderboarditem';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import { TeamContext } from '../../context/TeamContext';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { SocketContext } from '../../context/SocketContext.jsx';

function TeamLeaderBoardList() {
  const { teams } = useContext(TeamContext);
  const plainTeams = JSON.parse(JSON.stringify(teams));
  const [teamId, setTeamId] = useState("");
  const [updatedTeam, setUpdatedTeam] = useState("");
  const [teamLeaderBoard, setTeamLeaderBoard] = useState([]);
  const socket = useContext(SocketContext);

  const notify = (user, points) => toast(user + ' ' + 'has gained' + ' ' + points + ' ' + 'points!', {
    theme:"dark"
  });
    
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  useEffect(() => {
    if (socket) {
      socket.volatile.emit('teams', plainTeams);

      socket.on("teams_data", (updated_team) => {
        setTeamId(updated_team.id);
        setUpdatedTeam(updated_team);
        const TeamLeaderBoardItems = updated_team.map(team => <TeamLeaderBoardItem key={ team.id } team={ team } />);
        setTeamLeaderBoard(TeamLeaderBoardItems);
      });

      return () => {
        socket.off("teams_data");
      };
    }
  }, [socket, teams, plainTeams]);

  return (
    <Container >
      <Grid container direction="column" justify="center" alignItems="center" disableGutters={true}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{alignItems: 'center', justifyContent: 'center', padding:"10px"}}>REC Team Leaderboard</Typography>
        </Grid>
        <div>{teamLeaderBoard}</div>
      </Grid>
    </Container>
  );
}

export default TeamLeaderBoardList;