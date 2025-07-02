import { useState } from 'react';
import './Anime-list.css';

const dummyAnime = [
  { id: 1, title: 'Naruto' },
  { id: 2, title: 'Jujutsu Kaisen' },
  { id: 3, title: 'Attack on Titan' },
  { id: 4, title: 'One Piece' },
  { id: 5, title: 'Demon Slayer' },
];

export default function List() {
  const [search, setSearch] = useState('');

  const filteredAnime = dummyAnime.filter(anime =>
    anime.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="list-container">
      <h1 className="list-title">Anime List (les données sont fausses) pas connecter à la BDD</h1>

      <input
        type="text"
        placeholder="Search anime..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-bar"
      />

      <ul className="anime-list">
        {filteredAnime.map(anime => (
          <li key={anime.id} className="anime-item">
            {anime.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
