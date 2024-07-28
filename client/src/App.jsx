import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "/src/components/static/Home";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} value="Home" />
      </Routes>
    </Router> 
    </>
  )
}

export default App
