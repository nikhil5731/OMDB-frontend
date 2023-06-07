import Home from "./components/Home";
import Navbar from "./components/Navbar.js";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DetailsPage from "./components/DetailsPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/id/:imdbId" element={<DetailsPage/>} />
        </Routes>
      </Router>
  );
}

export default App;