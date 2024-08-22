
import { useState, useContext, useEffect } from 'react'
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie';
import { InstallationProvider } from './context/InstallationContext.jsx';
import { TeamProvider } from './context/TeamContext.jsx';
import ResponsiveAppBar from './components/navigation/AppBar.jsx';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';
import TeamLeaderBoardList from './components/leaderboard/teamleaderboardlist.jsx';
import Profile from './components/static/Profile.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <ThemeProvider theme={theme}>
        <ExhibitProvider>
              <UserProvider>
                <ReviewProvider>
                  <InstallationProvider>
                    <TeamProvider>
                        <ToastContainer />
                        <ResponsiveAppBar />
                          <Routes>
                            <Route path="/" element={<Home />} value="Home" />
                            <Route path="/Exhibits" element={<ExhibitList />} value="Exhibits" />
                            <Route path="/Reviews" element={<ReviewForm /> } value="Reviews" />
                            <Route path="/Leaderboard" element={<LeaderBoardList />} value="Leaderboard" />
                            <Route path="/AllReviews" element={<ReviewList />} value="AllReviews" />
                            <Route path="/YourReviews" element={<UserReviewList />} value="YourReviews" />
                            <Route path="/TeamLeaderboard" element={<TeamLeaderBoardList />} value="Leaderboard" />
                            <Route path="/Profile" element={<Profile/>} value="Profile" />
                          </Routes>
                        </TeamProvider>
                    </InstallationProvider>
                </ReviewProvider>
              </UserProvider>
        </ExhibitProvider>
      </ThemeProvider>
    </Router> 
    </>
  )
}

export default App
