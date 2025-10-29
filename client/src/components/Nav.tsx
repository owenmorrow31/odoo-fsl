import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Nav() {
  const { user, signOut } = useAuth();
  return (
    <header style={{ padding: "12px 20px", borderBottom: "1px solid #eee" }}>
      <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Link to="/">FSL</Link>
        <Link to="/app">Dashboard</Link>
        <div style={{ marginLeft: "auto" }}>
          {user ? (
            <>
              <span style={{ marginRight: 12, opacity: .7 }}>{user.email}</span>
              <button onClick={signOut}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <span> · </span>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
