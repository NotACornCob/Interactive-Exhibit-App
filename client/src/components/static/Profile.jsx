import {useEffect, useState, useContext} from 'react'
import io from "socket.io-client";
import LoginForm from '../user/login'
import UserLeaderBoardList from '../leaderboard/leaderboardlist';
import { useCookies } from 'react-cookie';
import ExhibitList from '../exhibits/exhibitlist';
import InstallationCard from '../installations/installationcard';
import InstallationList from '../installations/installationlist';
import TeamLeaderBoardList from '../leaderboard/teamleaderboardlist';
import UserReviewList from '../user/userreviewlist';
import UserInstallationList from '../user/userinstallationlist';
import { Typography } from '@mui/material';

function Profile() {
    const [cookies] = useCookies(['reviewer']);
    const socket = io.connect();
    const hasCookie = !!cookies.reviewer;
    
        return ( <div>
            <Typography variant="h4" color="#ffffff" sx={{display:'flex', justifyContent: 'center', alignItems: 'center', padding:'15px'}}>Your Reviews</Typography>
            {hasCookie ? (
            <UserReviewList />
          ) :
            <div>
            <h4>You don't have any reviews!</h4>
            </div>
        }  
         <Typography variant="h4" color="#ffffff" sx={{display:'flex', justifyContent: 'center', alignItems: 'center', padding:'15px'}}>REC ROOM Interactions</Typography>
        {hasCookie ? (
            <UserInstallationList/>
          ) :
            <div>
            <h4>You haven't interacted with any exhibits!</h4>
            </div>
        }
        {/*  <Typography variant="h4" color="#ffffff" sx={{display:'flex', justifyContent: 'center', alignItems: 'center', padding:'15px'}}>Your Team</Typography>
        {hasCookie? (
            <TeamLeaderBoardList /> 
        ) :
            <div>
            <h4>You are not on a team!</h4>
            </div>
        } */}
            </div> );
    }
    
    export default Profile;
