import {useEffect, useState, useContext} from 'react'
import io from "socket.io-client";
import LoginForm from '../user/login'
import LeaderBoardList from '../leaderboard/leaderboardlist';
import { useCookies } from 'react-cookie';
import ExhibitList from '../exhibits/exhibitlist';
import InstallationCard from '../installations/installationcard';
import InstallationList from '../installations/installationlist';



function Home() {
const [cookies] = useCookies(['session_id']);
const socket = io.connect();
const hasCookie = !!cookies.session_id;

    return ( <div>
        {hasCookie ? (
        <ExhibitList />
      ) :
        <div>
        < LoginForm />
        </div>
    }
        </div> );
}

export default Home;

