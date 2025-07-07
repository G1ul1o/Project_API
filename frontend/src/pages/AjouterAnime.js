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
      alert("You need to be logged in.");
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
        setMessage("Comment added successfully!");
        setTimeout(() => navigate(`/DetailAnime/${IdAnime}`), 1500);
      } else {
        setMessage(data.message || "Error adding comment.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error.");
    }
  };

  return (
    <div className="ajouter-anime-container">
      <h2>Add a grade and a comment!</h2>
      <form onSubmit={handleSubmit} className="ajouter-form">
        <label>
          Grade (1 to 5) :
          <select value={note} onChange={(e) => setNote(parseInt(e.target.value))}>
            {[0,1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>
          Comment :
          <textarea
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            rows="4"
            placeholder="Write what you think..."
            required
          />
        </label>

        <button type="submit">Submit</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}