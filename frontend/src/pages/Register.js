import './Register.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

export default function Register() {
  const [username, setUsername] = useState('');
  const [privileges, setPrivileges] = useState('1');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleData, setGoogleData] = useState(null);
  const [showGoogleForm, setShowGoogleForm] = useState(false);

  const apiBaseUrl = 'http://localhost:3001/user/register';
  const navigate = useNavigate();

  const APICALL = async (body) => {
    const res = await fetch(apiBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMessage('You are registered, you can now login yourself');
      navigate('/login');
    } else {
      setMessage('Register failed');
    }
  };

  const handlePrivilegesChange = (e) => {
    setPrivileges(e.target.value);
  };

  const handleGoogleRegister = async (credentialResponse) => {
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
      
      setEmail(userInfo.email || '');
      setUsername(userInfo.name || '');
      setGoogleData({ token });
      setShowGoogleForm(true);
      setMessage('');
    } catch (error) {
      setMessage("Erreur pendant l'authentification Google");
    }
  };

  const handleGoogleFormSubmit = async (e) => {
    e.preventDefault();
    if (!googleData) {
      setMessage('Google data manquante');
      return;
    }
    const body = {
      username,
      email,
      privileges,
      googleToken: googleData.token,
      password: '',
    };
    await APICALL(body);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = { username, email, password, privileges };
    await APICALL(body);
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>

      {!showGoogleForm && (
        <>
          <GoogleLogin
            onSuccess={handleGoogleRegister}
            onError={() => setMessage('Échec connexion Google')}
            useOneTap={false}
            ux_mode="popup"
          />

          <p className="register-or-text">OR</p>

          <form className="register-form" onSubmit={handleFormSubmit}>
            <label className="register-label">
              Username:
              <input
                type="text"
                name="username"
                className="register-input"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label className="register-label">
              Email:
              <input
                type="email"
                name="email"
                className="register-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="register-label">
              Password:
              <input
                type="password"
                name="password"
                className="register-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label className="register-label">
              Role:
              <select
                name="role"
                className="register-role-select"
                value={privileges}
                onChange={handlePrivilegesChange}
              >
                <option value="1">Member</option>
                <option value="2">Only Reader</option>
              </select>
            </label>

            <button type="submit" className="register-button">Register</button>
          </form>
        </>
      )}

      {/* Formulaire complémentaire après Google auth */}
      {showGoogleForm && (
        <form className="register-form" onSubmit={handleGoogleFormSubmit}>
          <p>Complete your information :</p>

          <label className="register-label">
            Username:
            <input
              type="text"
              name="username"
              className="register-input"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="register-label">
            Email:
            <input
              type="email"
              name="email"
              className="register-input"
              readOnly
              value={email}
            />
          </label>

          <label className="register-label">
            Role:
            <select
              name="role"
              className="register-role-select"
              value={privileges}
              onChange={handlePrivilegesChange}
            >
              <option value="1">Member</option>
              <option value="2">Only Reader</option>
            </select>
          </label>

          <button type="submit" className="register-button">Complete Registration</button>
        </form>
      )}

      <p className="form-message">{message}</p>
    </div>
  );
}
