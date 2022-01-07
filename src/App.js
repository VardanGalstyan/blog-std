import './App.css';
import { Container } from 'react-bootstrap';
import TopNavbar from './components/Navbar/TopNavbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import SingleBlog from './components/single-blog/SingleBlog';



function App() {
  return (
    <Container fluid className="App">
      <TopNavbar />
      <Routes>
        <Route path="/" element={<Home />} /> :
        <Route path="/blog/:id" element={<SingleBlog />} /> :
      </Routes>
    </Container>
  );
}

export default App;
