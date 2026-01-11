import "./Style/Nav.css";
import { NavLink } from "react-router-dom";
import { NavHashLink } from 'react-router-hash-link';

function Nav() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="row align-items-start">

          {/* LEFT: Nav*/}
          <div className="col-auto d-flex align-items-baseline">
            <h2 className="header-name m-0">MiniLingo</h2>
            <span className="header-designer ms-3">Mini Learners!</span>
          </div>

          {/* RIGHT: Nav */}
          <div className="col d-flex justify-content-end align-items-start">
             <NavHashLink
                smooth
                to="/#about-section"
                className="nav-link-custom me-4"
              >
                ABOUT
              </NavHashLink>
              <NavLink
                  to="/"
                  className="btn-homepage"
                >
                  HOMEPAGE
                </NavLink>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Nav;
