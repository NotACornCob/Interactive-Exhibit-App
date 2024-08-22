import React from 'react';
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import TeamLeaderBoardItem from './userteamleaderboarditem';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import { TeamContext } from '../../context/TeamContext';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

function TeamLeaderBoardList() {
  const { teams } = useContext(TeamContext);
  const plainTeams = JSON.parse(JSON.stringify(teams));
  const [socketInstance, setSocketInstance] = useState("");
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [username, setUsername] = useState("")
  const [teamId, setTeamId] = useState("")
  const [updatedTeam, setUpdatedTeam] = useState("")
  const [teamLeaderBoard, setTeamLeaderBoard] = useState([])

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
  
      useEffect(() => {
      const socket = io("http://localhost:5555", {
        transports: ["websocket"],
        upgrade: false,
        autoconnect: false,
      });

      setSocketInstance(socket);
      
      socket.on("connect", () => {
       socket.emit('teams', plainTeams)
      })

      socket.on("teams_data", (updated_team) => {
        setTeamId(updated_team.id)
        setUpdatedTeam(updated_team)
        const TeamLeaderBoardItems = updated_team.map(team => <TeamLeaderBoardItem key={ team.id } team={ team } />)
        setTeamLeaderBoard(TeamLeaderBoardItems)
      })

    }
  , [teams]);

    return (
      <Container disableGutters="true" sx={{ bgcolor: '#262129'}}>
        <Grid container direction="column"
        justify="center"
        alignItems="center"
        disableGutters="true">
        <Grid item xs={12} >
          <Typography variant="h4" sx={{bgcolor:"#262129", color:"#ffffff", alignItems: 'center', justifyContent: 'center', padding:"10px"}}>REC Team Leaderboard</Typography>
      </Grid>
    <div>{teamLeaderBoard}</div>
    </Grid>
    </Container>)
}
export default TeamLeaderBoardList;