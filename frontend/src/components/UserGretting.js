import React from 'react';
import jwtDecode from 'jwt-decode';

export default function UserGreeting() {
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    return <p>Join now or log in to get started!</p>;
  }

  try {
    const user = jwtDecode(token);
    return (
      <div>
        <p>Welcolme, {user.username || user.name || 'Utilisateur'}!</p>
        <p>Email : {user.email || 'Non disponible'}</p>
      </div>
    );
  } catch (error) {
    return <p>Join now or log in to get started!</p>;
  }
}