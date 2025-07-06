import './Register.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';



export default function Register() {
  const [username, setUsername] = useState('');
  const [privileges, setPrivileges] = useState("1");
  const [message, setMessage] = useState('');
  const [credential, setCredential] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const apiBaseUrl = 'http://localhost:3001/user/register';
  const navigate = useNavigate();
  
  const APICALL = async () => {
    const body = { username, email, password, privileges };
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

  const handleGoogleRegister = async (response) => {
    try {
      const token = response.credential;
      // Tu peux faire ici l'appel à ton backend pour finaliser l'inscription Google
      setCredential(token);
      setMessage('Google authentication succeeded');
      // Optionnel: récupérer le nom via tokeninfo et pré-remplir le formulaire
    } catch (error) {
      setMessage("Erreur pendant l'authentification Google");
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>

      <GoogleLogin
        onSuccess={handleGoogleRegister}
        onError={() => setMessage('Échec connexion Google')}
        useOneTap={false} // important
        ux_mode="popup"
      />

      <p className="register-or-text">OR</p>

      {/* Formulaire classique */}
      <form
        className="register-form"
        onSubmit={(e) => {
          e.preventDefault();
          APICALL();
        }}
      >
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

      <p className="form-message">{message}</p>
    </div>
  );
}
