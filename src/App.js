import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import ErrorPage from './Pages/ErrorPage';
import Login from './Pages/Login';
import Jobs from './Pages/Jobs';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <Router>
      <nav className="navbar navbar-dark bg-yellow">
        <div className="text-center mx-auto">
          <Link className="links" to='/home'>Home</Link> {"   "}
          <Link className="links" to="/aboutus">About Us</Link>{"   "}
          <Link className="links" to="/jobs">Jobs</Link>{"   "}
          <Link className="links" to="/contact">Contact</Link>{"   "}
        </div>

      </nav>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/aboutus" element={<About />} ></Route>
        <Route path="/jobs" element={<Jobs />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="*" element={<ErrorPage />} ></Route>

      </Routes>

    </Router>
  );
}

export default App;
