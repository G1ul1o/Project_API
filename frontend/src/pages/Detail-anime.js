import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Detail-anime.css';
import {jwtDecode} from 'jwt-decode';

export default function DetailAnime() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/anime/DetailAnime/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Anime not found');
        return res.json();
      })
      .then(data => {
        setAnime(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToList = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert("Vous devez être connecté pour ajouter un anime à votre liste.");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log(decoded)
      console.log(decoded.privileges)
      console.log(typeof decoded.privileges)
      if (decoded.privileges === 1) {
        navigate(`/anime/${id}/ajouter`);
      } else {
        alert("Vous n'avez pas les privilèges requis pour ajouter un anime.");
      }
    } catch (err) {
      console.error("JWT invalide :", err);
      alert("Erreur lors de la vérification des privilèges.");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!anime) return <p>Aucun détail trouvé pour cet anime.</p>;

  return (
    <div className="detail-container">
      <h1 className="detail-title">{anime.animeName}</h1>
      {anime.animeDescription && <p><strong>Description:</strong> {anime.animeDescription}</p>}
      {anime.avgRating != null && <p><strong>Mean score:</strong> {anime.avgRating}</p>}

      <button className="add-button" onClick={handleAddToList}>
        Ajouter à ma liste
      </button>

      <Link to="/List" className="back-button">← Back to the list</Link>
    </div>
  );
}
