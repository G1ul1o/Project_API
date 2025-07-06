import React from 'react';
import jwtDecode from 'jwt-decode';

export default function UserGreeting() {
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    // Pas connecté
    return <p>Join now or log in to get started!</p>;
  }

  try {
    const user = jwtDecode(token);
    return (
      <div>
        <p>Bienvenue, {user.username || user.name || 'Utilisateur'}!</p>
        <p>Email : {user.email || 'Non disponible'}</p>
      </div>
    );
  } catch (error) {
    // Token invalide ou expiré
    return <p>Join now or log in to get started!</p>;
  }
}