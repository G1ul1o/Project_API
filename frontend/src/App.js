import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddAnime from './pages/Add-anime';
import UserList from './pages/User-list';
import DetailAnime from './pages/Detail-anime';
import Header from './components/Header';

function App() {
  return (
  <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AddAnime" element={<AddAnime />} />
        <Route path="/UserList" element={<UserList />} />
        <Route path="/DetailAnime" element={<DetailAnime />} />
      </Routes>
    </div>
  );  
}

export default App;
