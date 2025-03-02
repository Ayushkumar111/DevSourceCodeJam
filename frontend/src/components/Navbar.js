import { Link } from "react-router-dom";

function Navbar({ authenticated }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">DevSourceCodeJam</Link>
      </div>
      <div className="nav-links">
        {authenticated ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/messages">Messages</Link>
            <Link to="/live-seminars">Live Seminars</Link>
            <Link to="/search">Search People</Link>
            <Link to="/profile">Profile</Link>
          </>
        ) : (
          <>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
