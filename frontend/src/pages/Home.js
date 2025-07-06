import './Home.css';
import {jwtDecode} from 'jwt-decode';

export default function Home() {
   let token = localStorage.getItem('jwtToken');
  let user = null;

  try {
    if (token) {
      user = jwtDecode(token);
    }
  } catch (error) {
    user = null;
  }
  
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Anime Box</h1>
        <p className="home-subtitle">
          Discover, rate, and keep track of your favorite anime – a little like Letterbox, but for anime fans!
        </p>
        <div className="home-description">
          <p>
            ✨ Create your account to start logging anime you’ve watched or want to watch.
          </p>
          <p>
            🧾 Add detailed entries, explore what others are watching, and build your own anime collection.
          </p>
          <p>
            🔍 Use our anime search and list tools to explore our dataset, don't hesitate to contact us to improve it.
          </p>
          <p>
            📊 Rate your favorite anime and share your thoughts with the community.
          </p>
        </div>

        <div className="home-calltoaction">
          {user ? (
            <div>
              <p>Bienvenue, <strong>{user.username || user.name || 'Utilisateur'}</strong>!</p>
              <p>Email : {user.email || 'non disponible'}</p>
            </div>
          ) : (
            <p>
              <a href="/Register" className="home-link">Join now</a> or <a href="/Login" className="home-link">log in</a> to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}