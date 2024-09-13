import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import Project from './components/Project';
import Admin from './components/Admin';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/main' element={<Main />} />
        <Route path='/project' element={<Project />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </Router>


  );
}

export default App;
