import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "./Home.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to FSL
          </h1>
          <p className="hero-subtitle">
            A powerful platform designed to help you achieve more with less effort.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link to="/app" className="btn btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Built for speed and performance with modern technology.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure by Design</h3>
            <p>Your data is protected with enterprise-grade security.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful Interface</h3>
            <p>Clean, intuitive design that puts your needs first.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
