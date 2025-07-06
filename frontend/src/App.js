import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/User-list';
import DetailAnime from './pages/Detail-anime';
import Header from './components/Header';
import Footer from './components/Footer';
import List from './pages/Anime-list';

function App() {
  return (
  <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/UserList" element={<UserList />} />
        <Route path="/DetailAnime" element={<DetailAnime />} />
        <Route path="/DetailAnime/:id" element={<DetailAnime />} />
        <Route path="/List" element={<List />} />
      </Routes>
      <Footer />
    </div>
  );  
}

export default App;
