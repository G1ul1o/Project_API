import './Login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const apiBaseUrl = 'http://localhost:3001/user/login';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { username, email, password };

    try {
      const res = await fetch(apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        const token = data.token;

        localStorage.setItem('jwtToken', token);
        setMessage('Login successful, redirecting...');
        onLoginSuccess?.();

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Network error, please try again later');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const userInfo = JSON.parse(jsonPayload);

      const res = await fetch(`${apiBaseUrl}/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleToken: token }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('jwtToken', data.token);
        setMessage('Login successful, redirecting...');
        onLoginSuccess?.();

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || 'Google login failed');
      }
    } catch (error) {
      setMessage('Erreur lors du login Google');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>

      {/* Google Login */}
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => setMessage('Échec connexion Google')}
        useOneTap={false}
        ux_mode="popup"
      />

      <p className="login-or-text">OR</p>

      {/* Login classique */}
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          Username:
          <input
            type="text"
            name="username"
            className="login-input"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="login-label">
          Email:
          <input
            type="email"
            name="email"
            className="login-input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="login-label">
          Password:
          <input
            type="password"
            name="password"
            className="login-input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="login-button">Login</button>
      </form>

      {message && <p className="login-message">{message}</p>}

      <div className="login-footer">
        <p className="login-footer-text">
          Don't have an account? <a href="/Register" className="login-footer-link">Register</a>
        </p>
      </div>
    </div>
  );
}
