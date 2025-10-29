import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "./Nav.css";

export default function Nav() {
  const { user, signOut } = useAuth();
  return (
    <header className="nav-header">
      <nav className="nav-container">
        <Link to="/" className="nav-logo">FSL</Link>
        <div className="nav-links">
          {user && <Link to="/app" className="nav-link">Dashboard</Link>}
        </div>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-user">{user.email}</span>
              <button onClick={signOut} className="nav-btn">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Sign In</Link>
              <Link to="/signup" className="nav-btn">Get Started</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
