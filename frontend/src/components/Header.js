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
        <Link to="/UserList" className="nav-link">List anime</Link>
        <Link to="/List" className="nav-link">Search anime</Link>
        </nav>
    </header>
  );
}

export default Header;