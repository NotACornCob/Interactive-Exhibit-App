import {useContext} from 'react';
import LoginForm from '../user/login';
import UserLeaderBoardList from '../leaderboard/leaderboardlist';
import { useCookies } from 'react-cookie';
import ExhibitList from '../exhibits/exhibitlist';
import UserReviewList from '../user/userreviewlist';
import UserInstallationList from '../user/userinstallationlist';
import { Typography } from '@mui/material';
import { SocketContext } from '../../context/SocketContext.jsx';

function Profile() {
    const [cookies] = useCookies(['reviewer']);
    const socket = useContext(SocketContext);
    const hasCookie = !!cookies.reviewer;
    
    return (
        <div>
            <Typography variant="h4" color="secondary" sx={{display:'flex', justifyContent: 'center', alignItems: 'center', padding:'15px'}}>Your Reviews</Typography>
            {hasCookie ? (
                <UserReviewList />
            ) : (
                <div>
                    <Typography color="secondary">You don't have any reviews!</Typography>
                </div>
            )}  
            <Typography variant="h4" color="secondary" sx={{display:'flex', justifyContent: 'center', alignItems: 'center', padding:'15px'}}>REC ROOM Interactions</Typography>
            {hasCookie ? (
                <UserInstallationList/>
            ) : (
                <div>
                    <Typography color="secondary">You haven't interacted with any exhibits!</Typography>
                </div>
            )}
        </div>
    );
}

export default Profile;
