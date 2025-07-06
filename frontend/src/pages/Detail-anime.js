import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Detail-anime.css';

export default function DetailAnime() {
  const { id } = useParams();
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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!anime) return <p>Aucun détail trouvé pour cet anime.</p>;

  return (
    <div className="detail-container">
      <h1 className="detail-title">{anime.animeName}</h1>
      {anime.animeDescription != null && <p><strong>Description: </strong> {anime.animeDescription}</p>}
      {anime.avgRating != null && <p><strong>Mean score: </strong>{anime.avgRating}</p>}

      <Link to="/List" className="back-button">← Back to the list</Link>
    </div>
  );
}
