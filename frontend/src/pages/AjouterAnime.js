import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './AjouterAnime.css';
import { jwtDecode } from 'jwt-decode';

export default function AjouterAnime() {
  const { IdAnime } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(1);
  const [commentaire, setCommentaire] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const res = await fetch(`http://localhost:3001/comment/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          grade: note,
          commentText: commentaire,
          userId: userId,
          animeId: IdAnime
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Commentaire ajouté avec succès !");
        setTimeout(() => navigate(`/DetailAnime/${IdAnime}`), 1500);
      } else {
        setMessage(data.message || "Erreur lors de l'envoi du commentaire.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur réseau.");
    }
  };

  return (
    <div className="ajouter-anime-container">
      <h2>Ajouter une note et un commentaire</h2>
      <form onSubmit={handleSubmit} className="ajouter-form">
        <label>
          Note (1 à 5) :
          <select value={note} onChange={(e) => setNote(parseInt(e.target.value))}>
            {[0,1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>
          Commentaire :
          <textarea
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            rows="4"
            placeholder="Exprimez votre avis..."
            required
          />
        </label>

        <button type="submit">Soumettre</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}