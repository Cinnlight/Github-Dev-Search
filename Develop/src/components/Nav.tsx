import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const Nav = () => {
  return (

    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
          <Link className="navbar-brand" to="/">Dev Search</Link>

          <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
          >
              <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                      <Link className="nav-link" to="/">Search</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/SavedCandidates">Saved Candidates</Link>
                  </li>
              </ul>
          </div>
      </div>
    </nav>
  )
};

export default Nav;
