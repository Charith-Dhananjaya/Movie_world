import { Link } from "react-router-dom";
import "../css/Navbar.css";
function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Moovie World</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favourites" className="nav-link">Favourites</Link> 
        <Link to="/contactUs" className="nav-link">Contact Us</Link> 
      </div>
    </nav>
  );
}

export default NavBar;
