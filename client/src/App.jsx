import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/static/Home";
import { InstallationProvider } from "./context/InstallationContext"
import { ArtistProvider } from "./context/ArtistContext"
import { ExhibitProvider } from "./context/ExhibitContext"
import Nav from "./components/navigation/Nav"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
