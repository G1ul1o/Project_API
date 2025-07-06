import './Register.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

export default function Register() {
  const [username, setUsername] = useState('');
  const [privileges, setPrivileges] = useState('1'); // Member par défaut
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleData, setGoogleData] = useState(null); // stocke les infos google
  const [showGoogleForm, setShowGoogleForm] = useState(false); // afficher formulaire complémentaire

  const apiBaseUrl = 'http://localhost:3001/user/register';
  const navigate = useNavigate();

  // Fonction pour appeler l'API avec les infos de l'utilisateur (classique ou google)
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

  // Le gestionnaire quand Google Login réussit
  const handleGoogleRegister = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      // Décoder le token pour récupérer email et username
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const userInfo = JSON.parse(jsonPayload);
      // userInfo.email contient l'email, userInfo.name ou userInfo.given_name le nom
      
      setEmail(userInfo.email || '');
      setUsername(userInfo.name || '');
      setGoogleData({ token }); // on stocke le token google
      setShowGoogleForm(true);  // affiche formulaire complémentaire
      setMessage('');
    } catch (error) {
      setMessage("Erreur pendant l'authentification Google");
    }
  };

  // Soumettre le formulaire complémentaire après Google login
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
      // ici tu peux envoyer le token google si besoin par backend
      googleToken: googleData.token,
      password: '', // mot de passe vide car Google auth
    };
    await APICALL(body);
  };

  // Formulaire classique
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
          <p>Complétez vos infos pour finaliser l'inscription Google :</p>

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
