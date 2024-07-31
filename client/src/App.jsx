
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/static/Home.jsx";
import { InstallationContext, InstallationProvider } from "./context/InstallationContext.jsx"
import { ArtistContext, ArtistProvider } from "./context/ArtistContext.jsx"
import { ExhibitContext, ExhibitProvider } from "./context/ExhibitContext.jsx"
import ExhibitList from "./components/exhibits/exhibitlist"
import InstallationList from "./components/installations/installationlist.jsx"
import ArtistList from "./components/artists/artistlist.jsx"
import Nav from "./components/navigation/Nav"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InstallationForm from "./components/installations/installationform.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <ArtistProvider>
        <ExhibitProvider>
          <InstallationProvider>
          <Nav />
          <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            <Container>
            <Routes>
              <Route path="/" element={<Home />} value="Home" />
              <Route path="/InstallationForm" element={<InstallationForm /> } value="InstallationForm" />
              <Route path="/Artists" element={<ArtistList />} value="Artists" />
            </Routes>
            </Container>
            </Typography>
            </Box>
          </InstallationProvider>
        </ExhibitProvider>
      </ArtistProvider>
    </Router> 
    </>
  )
}

export default App
