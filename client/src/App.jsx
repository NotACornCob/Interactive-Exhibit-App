import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/static/Home";
import { InstallationProvider } from "./context/InstallationContext"
import { ArtistProvider } from "./context/ArtistContext"
import { ExhibitProvider } from "./context/ExhibitContext"
import Nav from "./components/navigation/Nav"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <ArtistProvider>
        <ExhibitProvider>
          <InstallationProvider>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} value="Home" />
            </Routes>
          </InstallationProvider>
        </ExhibitProvider>
      </ArtistProvider>
    </Router> 
    </>
  )
}

export default App
