import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Authenticate from '../api/Authenticate';
import StorageUtils from '../api/StorageUtils';
import { ACCESS_TOKEN_COOKIE, USERNAME } from '../config';
import './Home.css';

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function Home() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameError('Please enter your name.');
      return;
    }

    setNameError('');
    setAuthError('');
    setIsSubmitting(true);

    try {
      const response = await Authenticate.authenticate(name, ''); // password is not needed
      const {token, isAuthenticated} = response?.data;

      if (isAuthenticated) {
        StorageUtils.set({
          key: ACCESS_TOKEN_COOKIE,
          value: token,
          type: 'cookie',
          useNative: true,
          cookieOptions: {
            sameSite: 'none',
            secure: true,
          },
          stringify: false,
        });

        StorageUtils.set({
          key: USERNAME,
          value: name.trim(),
          type: 'cookie',
          useNative: true,
          cookieOptions: {
            sameSite: 'none',
            secure: true,
          },
          stringify: false,
        });

        // Redirect back to the page the user originally tried to visit, or /health by default
        const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/health';
        navigate(from, { replace: true });
      }      

    } catch (error) {
      console.error('Authentication error:', error);
      setAuthError('Sign in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-body">

      {/* TOP NAV */}
      <nav className="topbar">
        <div className="logo-wrap">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
          <div>
            <div className="logo-text">Health &amp; Wealth</div>
            <div className="logo-sub">by Lewis</div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="login-main">
        <div className="card-wrap">

          {/* WELCOME BANNER */}
          <div className="welcome-banner">
            <h1>Welcome</h1>
            <p>Sign in to access your health and wealth resources</p>
          </div>

          {/* CARD */}
          <div className="card">
            <form onSubmit={handleSubmit} noValidate>

              {/* Name field */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  autoComplete="name"
                  value={name}
                  className={nameError ? 'error' : ''}
                  onChange={(e) => { setName(e.target.value); setNameError(''); }}
                />
                {nameError && <div className="error-msg">{nameError}</div>}
              </div>

              {/* Password field (disabled) */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="pw-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Don't need to enter your password"
                    autoComplete="current-password"
                    disabled
                  />
                  <button
                    type="button"
                    className="pw-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {/* Auth error message */}
              {authError && <div className="error-msg auth-error">{authError}</div>}

              <button
                type="submit"
                className="btn-signin"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>

            </form>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="login-footer">
        <div>© 2026 Health &amp; Wealth, Inc. All rights reserved.</div>
        <div>
          <a href="#">Privacy Policy</a>
          &nbsp;·&nbsp;
          <a href="#">Terms of Use</a>
          &nbsp;·&nbsp;
          <a href="#">Accessibility</a>
        </div>
      </footer>

    </div>
  );
}