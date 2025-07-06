import './User-list.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

export default function UserList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animeDetails, setAnimeDetails] = useState({});
  const [comments, setComments] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError("You need to be logged to have your anime logged.");
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      fetch(`http://localhost:3001/comment/comments_user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error occured during the load of your list");
          return res.json();
        })
        .then(async (data) => {
          const commentsArray = Array.isArray(data.comments) ? data.comments : data;

          setComments(commentsArray);

          const details = {};

          await Promise.all(
            commentsArray.map(async (comment) => {
              const animeId = comment.animeId;
              try {
                const res = await fetch(`http://localhost:3001/anime/DetailAnime/${animeId}`);
                if (!res.ok) throw new Error(`Failed to fetch anime ${animeId}`);
                const animeData = await res.json();
                details[animeId] = animeData;
              } catch (err) {
                console.error("Erreur fetch anime:", err);
              }
            })
          );

          setAnimeDetails(details);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
    } catch (err) {
      console.error("Error when retrieving your information:", err);
      setError("Token invalide.");
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

return (
    <div>
      <h1>Your anime list</h1>
      {comments.length === 0 ? (
        <p>You didn't comment anything.</p>
      ) : (
        <ul className="user-anime-list">
          {comments.map((comment) => {
            const anime = animeDetails[comment.animeId];
            return (
              <li key={comment._id} className="user-anime-item">
                <Link to={`/DetailAnime/${comment.animeId}`}>
                  <strong>{anime ? anime.animeName : 'Loading...'}</strong>
                </Link>
                <p>Comment: {comment.commentText}</p>
                <p>Your Grade: {comment.grade}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

