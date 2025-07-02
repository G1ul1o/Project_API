import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
        <Link to="/" className="title-link">
            <img src="/gojo.jpg" alt="Anime Box Logo" className="logo" />Anime Box
        </Link>
        <nav className="nav">
        <Link to="/Login" className="nav-link">Login</Link>
        <Link to="/UserList" className="nav-link">User List</Link>
        <Link to="/DetailAnime" className="nav-link">Detail Anime</Link>
        <Link to="/AddAnime" className="nav-link">Add Anime à enlever et mettre dans liste</Link>
        </nav>
    </header>
  );
}

export default Header;