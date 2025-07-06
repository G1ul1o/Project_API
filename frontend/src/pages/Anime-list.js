import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Anime-list.css';

export default function List() {
  const [search, setSearch] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/anime/anime')
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement des données');
        return res.json();
      })
      .then(data => {
        setAnimeList(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredAnime = animeList.filter(anime =>
    anime.animeName && anime.animeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="list-container">
      <h1 className="list-title">Anime List</h1>

      <input type="text" placeholder="Search anime..." value={search} onChange={e => setSearch(e.target.value)} className="search-bar"/>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul className="anime-list">
        {filteredAnime.map(anime => (
          <li key={anime._id} className="anime-item">
            <Link to={`/DetailAnime/${anime._id}`} className="anime-link">{anime.animeName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
