import { supabase } from '../lib/supabase';
import './Dashboard.css';

interface DashboardProps {
  user: any;
}

export default function Dashboard({ user }: DashboardProps) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome back</h1>
          <p>You're signed in as {user?.email}</p>
        </div>

        <button onClick={handleSignOut} className="signout-button">
          Sign out
        </button>
      </div>
    </div>
  );
}
