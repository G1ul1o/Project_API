import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Detail-anime.css';
import { jwtDecode } from 'jwt-decode';

export default function DetailAnime() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [comments, setComments] = useState([]);
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

 
  useEffect(() => {
    fetch(`http://localhost:3001/comment/comments/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Impossibel to load comments');
        return res.json();
      })
      .then(data => {
        setComments(data);
      })
      .catch(err => {
        console.error("Error loading comments :", err);
        setError(err.message);
      });
  }, [id]);

  const handleAddToList = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert("You need to be logged to add anime on your list.");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.privileges === 1) {
        navigate(`/anime/${id}/ajouter`);
      } else {
        alert("You are a Reader Only you need to be a member to add a anime on your list.");
      }
    } catch (err) {
      console.error("JWT invalide :", err);
      alert("Error when loading the role.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!anime) return <p>Aucun détail trouvé pour cet anime.</p>;

  return (
    <div className="detail-container">
      <h1 className="detail-title">{anime.animeName}</h1>
      {anime.animeDescription && <p><strong>Description:</strong> {anime.animeDescription}</p>}
      {anime.avgRating != null && <p><strong>Mean score:</strong> {anime.avgRating}</p>}

      <button className="add-button" onClick={handleAddToList}>
        Add to my list
      </button>

      <Link to="/List" className="back-button">← Back to the list</Link>

      <h2 className="comments-title">Commentaires</h2>
      <ul className="comments-list">
        {comments.length > 0 ? (
          comments.map((c) => (
            <li key={c._id} className="comment-item">
              {/* <<p><strong>Utilisateur:</strong> {c.username || c.userId?.username || 'Anonyme'}</p> */}
              <p><strong>Note:</strong> {c.grade}/5</p>
              <p><strong>Commentaire:</strong> {c.commentText}</p>
            </li>
          ))
        ) : (
          <p>No comment for.</p>
        )}
      </ul>
    </div>
  );
}
