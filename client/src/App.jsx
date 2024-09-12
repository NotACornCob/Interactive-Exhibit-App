import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/static/Home.jsx";
import { ExhibitProvider } from "./context/ExhibitContext.jsx"
import { UserProvider } from "./context/UserContext.jsx"
import { ReviewProvider } from "./context/ReviewContext.jsx"
import ExhibitList from "./components/exhibits/exhibitlist"
import ReviewForm from "./components/reviews/reviewform.jsx"
import ReviewList from './components/reviews/reviewlist.jsx';
import UserReviewList from './components/user/userreviewlist.jsx';
import LeaderBoardList from './components/leaderboard/leaderboardlist.jsx';
import io from "socket.io-client";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie';
import { InstallationProvider } from './context/InstallationContext.jsx';
import { TeamProvider } from './context/TeamContext.jsx';
import ResponsiveAppBar from './components/navigation/AppBar.jsx';
import { ThemeProvider } from '@mui/material/styles';
import TeamLeaderBoardList from './components/leaderboard/teamleaderboardlist.jsx';
import Profile from './components/static/Profile.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import { useTheme } from './context/ThemeContext.jsx';
import Box from '@mui/material/Box';
import { NotificationProvider } from './context/NotificationContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  const { theme } = useTheme();
  const [socket, setSocket] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:5555", {
      transports: ["websocket"],
      upgrade: false,
      forceNew: true,
      reconnection: false
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <ToastProvider>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <SocketProvider value={socket}>
              <ExhibitProvider>
                <UserProvider>
                  <ReviewProvider>
                    <InstallationProvider>
                      <TeamProvider>
                        <CookiesProvider defaultSetOptions={{ path: '/' }}>
                          <ToastContainer />
                          <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
                            <ResponsiveAppBar />
                            <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/Exhibits" element={<ExhibitList />} />
                              <Route path="/Reviews" element={<ReviewForm />} />
                              <Route path="/Leaderboard" element={<LeaderBoardList />} />
                              <Route path="/AllReviews" element={<ReviewList />} />
                              <Route path="/YourReviews" element={<UserReviewList />} />
                              <Route path="/TeamLeaderboard" element={<TeamLeaderBoardList />} />
                              <Route path="/Profile" element={<Profile />} />
                            </Routes>
                          </Box>
                        </CookiesProvider>
                      </TeamProvider>
                    </InstallationProvider>
                  </ReviewProvider>
                </UserProvider>
              </ExhibitProvider>
            </SocketProvider>
          </Router>
        </ThemeProvider>
      </NotificationProvider>
    </ToastProvider>
  )
}

export default App
