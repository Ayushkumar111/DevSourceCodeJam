import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Messages from "./pages/Messages";
import LiveSeminars from "./pages/LiveSeminars";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import SearchPeople from "./pages/SearchPeople";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar authenticated={authenticated} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={authenticated ? <Home /> : <Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/messages" element={authenticated ? <Messages /> : <Login />} />
        <Route path="/live-seminars" element={authenticated ? <LiveSeminars /> : <Login />} />
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={authenticated ? <Profile /> : <Login />} />
        <Route path="/projects" element={authenticated ? <Projects /> : <Login />} />
        <Route path="/search" element={authenticated ? <SearchPeople /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
