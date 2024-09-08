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
            <Typography variant="h4" sx={{display:'flex', justifyContent: 'center', alignItems: 'center', padding:'15px'}}>Your Reviews</Typography>
            {hasCookie ? (
                <UserReviewList />
            ) : (
                <div>
                    <h4>You don't have any reviews!</h4>
                </div>
            )}  
            <Typography variant="h4" color="#ffffff" sx={{display:'flex', justifyContent: 'center', alignItems: 'center', padding:'15px'}}>REC ROOM Interactions</Typography>
            {hasCookie ? (
                <UserInstallationList/>
            ) : (
                <div>
                    <h4>You haven't interacted with any exhibits!</h4>
                </div>
            )}
        </div>
    );
}

export default Profile;
